import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { managedRoute } from "@/src/lib/site-pages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiresAdmin = /^\/admin(?:\/|$)/.test(pathname) || /^\/api\/(admin|cms|about)(?:\/|$)/.test(pathname);
  if (!requiresAdmin) {
    if (pathname.startsWith('/api/')) return NextResponse.next();
    if (request.headers.get('x-aionsite-page-source') === pathname) return NextResponse.next();
    const managed = managedRoute(pathname);
    if (!managed) return NextResponse.next();
    const destination = request.nextUrl.clone();
    destination.pathname = managed.path === '/' ? '/' : managed.path.replace(/\/$/, '');
    if (managed.action === 'redirect') return NextResponse.redirect(destination, 308);
    const headers = new Headers(request.headers);
    headers.set('x-aionsite-page-source', destination.pathname);
    return NextResponse.rewrite(destination, { request: { headers } });
  }

  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();

  const adminToken = process.env.ADMIN_TOKEN;
  // If not configured, block access entirely to avoid a false sense of security
  if (!adminToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Server misconfigured: ADMIN_TOKEN not set" }, { status: 503 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const cookieToken = request.cookies.get("admin_token")?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (cookieToken === adminToken || bearerToken === adminToken) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|icon.png).*)"],
};

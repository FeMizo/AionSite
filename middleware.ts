import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

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
  matcher: ["/admin/:path*", "/api/cms/:path*", "/api/about/:path*"],
};

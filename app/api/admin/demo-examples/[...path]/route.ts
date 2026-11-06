import { readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/src/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml",
};

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { path: segments } = await context.params;
  if (!segments.length || segments.some((part) => !/^[a-zA-Z0-9_.-]+$/.test(part) || part === "." || part === "..")) return new Response("Not found", { status: 404 });
  const type = mime[path.extname(segments.at(-1)!).toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const root = await realpath(path.join(process.cwd(), "examples", "aionsite"));
    const target = await realpath(path.join(root, ...segments));
    const relative = path.relative(root, target);
    if (relative.startsWith("..") || path.isAbsolute(relative)) return new Response("Not found", { status: 404 });
    const content = await readFile(target);
    // Adapt navigation for this private gallery without changing the saved source files.
    const body = type.startsWith("text/html") ? content.toString("utf8").replaceAll("http://localhost:2666/solicitar-sitio/", "/solicitar-sitio/") : new Uint8Array(content);
    return new Response(body, { headers: {
      "Content-Type": type, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
    } });
  } catch { return new Response("Not found", { status: 404 }); }
}

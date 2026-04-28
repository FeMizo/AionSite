import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_DIRECTORY = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
]);

// SVG sanitization: removes <script>, event handlers, javascript: URLs, and
// <foreignObject> (can embed arbitrary HTML). Covers the main XSS vectors
// without requiring an external dependency.
function sanitizeSvg(content: string): string {
  return content
    // Remove <script> blocks (including multiline)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    // Remove inline event handlers (on*)
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // Remove javascript: URLs in href / xlink:href / action / src
    .replace(/(href|xlink:href|action|src)\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, "")
    // Remove <foreignObject> (can embed HTML)
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
}

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getFileExtension(file: File) {
  const sourceExtension = path.extname(file.name).toLowerCase();
  if (sourceExtension) return sourceExtension;

  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/avif") return ".avif";
  if (file.type === "image/svg+xml") return ".svg";

  return "";
}

export async function POST(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("admin_token")?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!adminToken || (cookieToken !== adminToken && bearerToken !== adminToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const maybeFile = formData.get("file");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 },
      );
    }

    if (!ALLOWED_MIME_TYPES.has(maybeFile.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido." },
        { status: 400 },
      );
    }

    if (maybeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "El archivo supera el límite de 5 MB." },
        { status: 413 },
      );
    }

    await fs.mkdir(UPLOADS_DIRECTORY, { recursive: true });

    const extension = getFileExtension(maybeFile);
    const baseName =
      sanitizeFileName(path.basename(maybeFile.name, extension)) || "imagen";
    const fileName = `${Date.now()}-${randomUUID()}-${baseName}${extension}`;
    const filePath = path.join(UPLOADS_DIRECTORY, fileName);

    let fileBuffer: Buffer;
    if (maybeFile.type === "image/svg+xml") {
      const text = await maybeFile.text();
      fileBuffer = Buffer.from(sanitizeSvg(text), "utf-8");
    } else {
      fileBuffer = Buffer.from(await maybeFile.arrayBuffer());
    }

    await fs.writeFile(filePath, fileBuffer);

    return NextResponse.json(
      { src: `/uploads/${fileName}` },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo guardar la imagen localmente." },
      { status: 500 },
    );
  }
}

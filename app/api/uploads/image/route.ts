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
    // Do not allow embedded data or external resource URLs in uploaded SVGs.
    .replace(/(href|xlink:href|action|src)\s*=\s*["']?\s*data:[^"'\s>]*/gi, "")
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
  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/avif") return ".avif";
  if (file.type === "image/svg+xml") return ".svg";

  return "";
}

function hasValidSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg") return buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
  if (mimeType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mimeType === "image/gif") return buffer.subarray(0, 4).toString("ascii") === "GIF8";
  if (mimeType === "image/webp") return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  if (mimeType === "image/avif") return buffer.subarray(4, 8).toString("ascii") === "ftyp";
  return true;
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
    if (!extension) {
      return NextResponse.json({ error: "Extensión de imagen no permitida." }, { status: 400 });
    }
    const baseName =
      sanitizeFileName(path.basename(maybeFile.name, path.extname(maybeFile.name))) || "imagen";
    const fileName = `${Date.now()}-${randomUUID()}-${baseName}${extension}`;
    const filePath = path.join(UPLOADS_DIRECTORY, fileName);

    let fileBuffer: Buffer;
    if (maybeFile.type === "image/svg+xml") {
      const text = await maybeFile.text();
      const sanitized = sanitizeSvg(text);
      if (!/<svg\b/i.test(sanitized)) {
        return NextResponse.json({ error: "SVG inválido." }, { status: 400 });
      }
      fileBuffer = Buffer.from(sanitized, "utf-8");
    } else {
      fileBuffer = Buffer.from(await maybeFile.arrayBuffer());
      if (!hasValidSignature(fileBuffer, maybeFile.type)) {
        return NextResponse.json({ error: "El contenido no coincide con el tipo de imagen." }, { status: 400 });
      }
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

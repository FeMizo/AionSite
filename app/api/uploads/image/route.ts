import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_DIRECTORY = path.join(process.cwd(), "public", "uploads");

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getFileExtension(file: File) {
  const sourceExtension = path.extname(file.name).toLowerCase();
  if (sourceExtension) {
    return sourceExtension;
  }

  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/svg+xml") return ".svg";
  if (file.type === "image/avif") return ".avif";

  return "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const maybeFile = formData.get("file");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 },
      );
    }

    if (!maybeFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Solo se permiten archivos de imagen." },
        { status: 400 },
      );
    }

    await fs.mkdir(UPLOADS_DIRECTORY, { recursive: true });

    const extension = getFileExtension(maybeFile);
    const baseName =
      sanitizeFileName(path.basename(maybeFile.name, extension)) || "imagen";
    const fileName = `${Date.now()}-${randomUUID()}-${baseName}${extension}`;
    const filePath = path.join(UPLOADS_DIRECTORY, fileName);
    const fileBuffer = Buffer.from(await maybeFile.arrayBuffer());

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

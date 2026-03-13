import { NextResponse } from "next/server";
import { normalizeAboutContent } from "@/src/about/normalize";
import {
  readAboutContentFromFile,
  writeAboutContentToFile,
} from "@/src/about/file-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await readAboutContentFromFile();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer el contenido About local." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = normalizeAboutContent(payload);
    const persisted = await writeAboutContentToFile(normalized);
    return NextResponse.json(persisted, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo guardar el contenido About local." },
      { status: 500 },
    );
  }
}

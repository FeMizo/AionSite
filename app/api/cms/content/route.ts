import { NextResponse } from "next/server";
import { normalizeCmsContent } from "@/src/cms/normalize";
import {
  readCmsContentFromFile,
  writeCmsContentToFile,
} from "@/src/cms/file-storage";
import { requireAdmin } from "@/src/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const content = await readCmsContentFromFile();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer el contenido CMS local." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const payload = await request.json();
    const normalized = normalizeCmsContent(payload);
    const persisted = await writeCmsContentToFile(normalized);
    return NextResponse.json(persisted, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo guardar el contenido CMS local." },
      { status: 500 },
    );
  }
}

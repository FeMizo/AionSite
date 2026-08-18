import { NextResponse } from "next/server";
import { normalizeJobsContent } from "@/src/jobs/normalize";
import {
  readJobsContentFromFile,
  writeJobsContentToFile,
} from "@/src/jobs/file-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await readJobsContentFromFile();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer el contenido de jobs local." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = normalizeJobsContent(payload);
    const persisted = await writeJobsContentToFile(normalized);
    return NextResponse.json(persisted, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo guardar el contenido de jobs local." },
      { status: 500 },
    );
  }
}

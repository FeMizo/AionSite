import { NextResponse } from "next/server";
import { normalizeProspectsContent } from "@/src/prospects/normalize";
import { readProspectsFromFile, writeProspectsToFile } from "@/src/prospects/file-storage";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json(await readProspectsFromFile(), { headers: { "Cache-Control": "no-store" } }); }
export async function PUT(request: Request) {
  try { return NextResponse.json(await writeProspectsToFile(normalizeProspectsContent(await request.json())), { headers: { "Cache-Control": "no-store" } }); }
  catch { return NextResponse.json({ error: "No se pudieron guardar los prospectos." }, { status: 500 }); }
}

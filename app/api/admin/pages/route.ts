import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/admin-auth";
import { readSitePages, saveSitePages } from "@/src/lib/site-pages-storage";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  try { return NextResponse.json(await readSitePages(), {headers: {'Cache-Control': 'no-store'}}); }
  catch { return NextResponse.json({error: 'No se pudieron cargar las páginas.'}, {status: 500}); }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const input = await request.json();
    if (!input || typeof input.version !== 'string') return NextResponse.json({error: 'Falta la versión de la configuración.'}, {status: 400});
    return NextResponse.json(await saveSitePages(input.pages, input.version), {headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo guardar.';
    return NextResponse.json({error: message}, {status: message.startsWith('CONFLICT:') ? 409 : 400});
  }
}

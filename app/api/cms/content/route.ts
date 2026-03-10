import { NextResponse } from "next/server";
import {
  readCmsContentFromFile,
  writeCmsContentToFile,
} from "@/src/cms/file-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await readCmsContentFromFile();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { message: "No se pudo leer el contenido CMS." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "El cuerpo de la solicitud no es JSON valido." },
      { status: 400 },
    );
  }

  try {
    const nextContent = await writeCmsContentToFile(payload);
    return NextResponse.json(nextContent);
  } catch {
    return NextResponse.json(
      { message: "No se pudo guardar el contenido CMS." },
      { status: 500 },
    );
  }
}

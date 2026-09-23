import { NextResponse } from "next/server";
import { getWhatsAppConfig } from "@/src/lib/whatsapp/config";
import { processWebhook, verifyMetaSignature } from "@/src/lib/whatsapp/meta";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const config = getWhatsAppConfig();
  if (!config.verifyToken || url.searchParams.get("hub.verify_token") !== config.verifyToken) {
    return NextResponse.json({ error: { code: "webhook_verification_failed", message: "Token inválido." } }, { status: 403 });
  }
  return new Response(url.searchParams.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: { code: "invalid_signature", message: "Firma inválida." } }, { status: 401 });
  }
  try {
    return NextResponse.json(await processWebhook(JSON.parse(rawBody)));
  } catch {
    return NextResponse.json({ error: { code: "webhook_processing_failed", message: "No se pudo procesar el evento." } }, { status: 500 });
  }
}

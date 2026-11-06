import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/admin-auth";
import { getStylePrompts } from "@/src/lib/style-prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json({ prompts: getStylePrompts() }, { headers: { "Cache-Control": "private, no-store", Vary: "Cookie, Authorization" } });
}

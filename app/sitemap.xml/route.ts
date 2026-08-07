import { NextResponse } from "next/server";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect(new URL("/sitemap_index.xml", getSiteUrl()), 308);
}

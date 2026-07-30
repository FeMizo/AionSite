import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/sitemap_index.xml", request.url), 308);
}

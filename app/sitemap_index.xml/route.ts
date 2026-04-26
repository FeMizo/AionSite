import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastmod = new Date().toISOString();

  const sitemaps = [`${siteUrl}/sitemap_pages.xml`, `${siteUrl}/sitemap_blogs.xml`];

  const entries = sitemaps
    .map((loc) => `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

const pages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/proyectos", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
];

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastmod = new Date().toISOString();

  const urls = pages
    .map(
      ({ path, changefreq, priority }) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

import { blogPosts } from "@/src/data/blog-posts";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastmod = new Date().toISOString();
  const pages = [
    ["/", "weekly", "1.0"],
    ["/proyectos/", "weekly", "0.9"],
    ["/productos/", "weekly", "0.9"],
    ["/blog/", "weekly", "0.8"],
    ["/conoceme/", "monthly", "0.7"],
    ["/diseno-web-ciudad-del-carmen/", "monthly", "0.8"],
    ["/tiendas-online-ciudad-del-carmen/", "monthly", "0.8"],
    ["/seo-mexico/", "monthly", "0.8"],
    ["/terminos/", "yearly", "0.3"],
    ["/privacidad/", "yearly", "0.3"],
    ["/legales/", "yearly", "0.3"],
  ] as const;
  const urls = [
    ...pages.map(([path, changefreq, priority]) =>
      `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    ),
    ...blogPosts.map((post) =>
      `  <url>\n    <loc>${siteUrl}/blog/${post.id}</loc>\n    <lastmod>${new Date(post.dateISO).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    ),
  ].join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

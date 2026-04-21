import { blogPosts } from "@/src/data/blog-posts";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date().toISOString();

  const urls = blogPosts
    .map(
      (post) =>
        `  <url>\n    <loc>${siteUrl}/blog/${post.id}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

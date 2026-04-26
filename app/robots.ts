import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

function buildUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/proyectos"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [buildUrl("/sitemap.xml"), buildUrl("/sitemap_blogs.xml")],
  };
}

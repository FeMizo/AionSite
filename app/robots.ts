import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

function buildUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: buildUrl("/sitemap_index.xml"),
  };
}

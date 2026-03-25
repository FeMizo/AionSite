import type { MetadataRoute } from "next";
import { metadataBase } from "@/src/lib/metadata";

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/proyectos"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: buildUrl("/sitemap.xml"),
    host: metadataBase.origin,
  };
}

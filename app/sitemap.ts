import type { MetadataRoute } from "next";
import { metadataBase } from "@/src/lib/metadata";

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: buildUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildUrl("/proyectos"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

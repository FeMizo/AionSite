import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/src/lib/metadata";

export const dynamic = "force-static";

function buildUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
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
    {
      url: buildUrl("/blog"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}

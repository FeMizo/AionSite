import type { Metadata } from "next";
import { resolvePageHref, sitePages } from "@/src/lib/site-pages";

const PRODUCTION_SITE_URL = "https://aionsite.com.mx";
const LOCAL_SITE_URL = "http://localhost:2666";

function resolveSiteUrl() {
  const fallbackSiteUrl =
    process.env.NODE_ENV === "production" ? PRODUCTION_SITE_URL : LOCAL_SITE_URL;

  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.APP_URL ??
    fallbackSiteUrl;

  try {
    return new URL(rawSiteUrl);
  } catch {
    return new URL(fallbackSiteUrl);
  }
}

export function getSiteUrl() {
  return resolveSiteUrl().toString();
}

export const metadataBase = resolveSiteUrl();

export function withCanonical(
  canonicalPath: string,
  metadata: Omit<Metadata, "metadataBase"> = {},
): Metadata {
  const canonical = resolvePageHref(canonicalPath);
  const page = sitePages.find((entry) => entry.path === canonical);
  return {
    ...metadata,
    ...(page?.title ? { title: page.title } : {}),
    ...(metadata.openGraph ? { openGraph: { ...metadata.openGraph, url: canonical, ...(page?.title ? {title: page.title} : {}) } } : {}),
    alternates: {
      ...metadata.alternates,
      canonical,
    },
  };
}

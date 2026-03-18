import type { Metadata } from "next";

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

export const metadataBase = resolveSiteUrl();

export function withCanonical(
  canonicalPath: string,
  metadata: Omit<Metadata, "metadataBase"> = {},
): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: canonicalPath,
    },
  };
}

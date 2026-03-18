import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://aionsite.com.mx";

function resolveSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.APP_URL ??
    DEFAULT_SITE_URL;

  try {
    return new URL(rawSiteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
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

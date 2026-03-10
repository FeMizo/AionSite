import { normalizeCmsContent } from "@/src/cms/normalize";
import { initialCmsContent } from "@/src/cms/site-content";
import type { CmsContent } from "@/src/cms/types";

const CMS_STORAGE_KEY = "aionsite.cms.content";

export function loadCmsContentFromBrowser(): CmsContent {
  if (typeof window === "undefined") {
    return initialCmsContent;
  }

  const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
  if (!raw) {
    return initialCmsContent;
  }

  try {
    return normalizeCmsContent(JSON.parse(raw));
  } catch {
    return initialCmsContent;
  }
}

export function saveCmsContentToBrowser(content: CmsContent): CmsContent {
  const normalized = normalizeCmsContent(content);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export function resetCmsContentInBrowser() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CMS_STORAGE_KEY);
  }
}

export async function loadCmsContentFromServer(): Promise<CmsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch("/api/cms/content", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return normalizeCmsContent(payload);
  } catch {
    return null;
  }
}

export async function saveCmsContentToServer(
  content: CmsContent,
): Promise<CmsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch("/api/cms/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return normalizeCmsContent(payload);
  } catch {
    return null;
  }
}

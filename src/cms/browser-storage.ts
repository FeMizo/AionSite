import { normalizeCmsContent } from "@/src/cms/normalize";
import { initialCmsContent } from "@/src/cms/site-content";
import type { CmsContent } from "@/src/cms/types";

const CMS_STORAGE_KEY = "aionsite.cms.content";
const CMS_FILE_API_ENDPOINT = "/api/cms/content";

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

export async function loadCmsContentFromFile(): Promise<CmsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(CMS_FILE_API_ENDPOINT, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return normalizeCmsContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveCmsContentToFile(
  content: CmsContent,
): Promise<CmsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(CMS_FILE_API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return normalizeCmsContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveCmsContent(content: CmsContent): Promise<{
  content: CmsContent;
  persistedToFile: boolean;
}> {
  const normalized = saveCmsContentToBrowser(content);
  const fileContent = await saveCmsContentToFile(normalized);
  const finalContent = fileContent ?? normalized;

  // Keeps browser preview in sync with the server-saved file snapshot.
  saveCmsContentToBrowser(finalContent);

  return {
    content: finalContent,
    persistedToFile: Boolean(fileContent),
  };
}

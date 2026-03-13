import { normalizeAboutContent } from "@/src/about/normalize";
import { initialAboutContent } from "@/src/about/content";
import type { AboutContent } from "@/src/about/types";

const ABOUT_STORAGE_KEY = "aionsite.about.content";
const ABOUT_FILE_API_ENDPOINT = "/api/about/content";

export function loadAboutContentFromBrowser(): AboutContent {
  if (typeof window === "undefined") {
    return initialAboutContent;
  }

  const raw = window.localStorage.getItem(ABOUT_STORAGE_KEY);
  if (!raw) {
    return initialAboutContent;
  }

  try {
    return normalizeAboutContent(JSON.parse(raw));
  } catch {
    return initialAboutContent;
  }
}

export function saveAboutContentToBrowser(content: AboutContent): AboutContent {
  const normalized = normalizeAboutContent(content);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export async function loadAboutContentFromFile(): Promise<AboutContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(ABOUT_FILE_API_ENDPOINT, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return normalizeAboutContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveAboutContentToFile(
  content: AboutContent,
): Promise<AboutContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(ABOUT_FILE_API_ENDPOINT, {
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

    return normalizeAboutContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveAboutContent(content: AboutContent): Promise<{
  content: AboutContent;
  persistedToFile: boolean;
}> {
  const normalized = saveAboutContentToBrowser(content);
  const fileContent = await saveAboutContentToFile(normalized);
  const finalContent = fileContent ?? normalized;

  saveAboutContentToBrowser(finalContent);

  return {
    content: finalContent,
    persistedToFile: Boolean(fileContent),
  };
}

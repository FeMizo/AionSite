import { initialProspectsContent } from "./content";
import { normalizeProspectsContent } from "./normalize";
import type { ProspectsContent } from "./types";

const STORAGE_KEY = "aionsite.prospects.content";
const ENDPOINT = "/api/admin/prospects/content";

export function loadProspectsFromBrowser(): ProspectsContent {
  if (typeof window === "undefined") return initialProspectsContent;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialProspectsContent;
  try { return normalizeProspectsContent(JSON.parse(raw)); } catch { return initialProspectsContent; }
}

export function saveProspectsToBrowser(content: ProspectsContent) {
  const normalized = normalizeProspectsContent(content);
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export async function loadProspectsFromFile() {
  try {
    const response = await fetch(ENDPOINT, { cache: "no-store" });
    return response.ok ? normalizeProspectsContent(await response.json()) : null;
  } catch { return null; }
}

export async function saveProspects(content: ProspectsContent) {
  const normalized = saveProspectsToBrowser(content);
  try {
    const response = await fetch(ENDPOINT, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(normalized), cache: "no-store" });
    const persisted = response.ok ? normalizeProspectsContent(await response.json()) : normalized;
    saveProspectsToBrowser(persisted);
    return { content: persisted, persistedToFile: response.ok };
  } catch { return { content: normalized, persistedToFile: false }; }
}

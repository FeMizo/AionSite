import { defaultCmsContent } from "@/src/cms/default-content";
import type { CmsContent, SectionId } from "@/src/cms/types";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(source: T, override: unknown): T {
  if (Array.isArray(source)) {
    return (Array.isArray(override) ? override : source) as T;
  }

  if (!isObject(source) || !isObject(override)) {
    return (override ?? source) as T;
  }

  const result: Record<string, unknown> = { ...source };
  for (const key of Object.keys(source)) {
    result[key] = deepMerge(
      source[key as keyof typeof source],
      override[key],
    );
  }

  return result as T;
}

export function normalizeCmsContent(content: unknown): CmsContent {
  const merged = deepMerge(defaultCmsContent, content);
  const nextSections = { ...merged.sections } as CmsContent["sections"];

  (Object.keys(defaultCmsContent.sections) as SectionId[]).forEach((id) => {
    const fallback = defaultCmsContent.sections[id];
    const section = nextSections[id];

    (
      nextSections as Record<SectionId, CmsContent["sections"][SectionId]>
    )[id] = {
      ...fallback,
      ...section,
      id,
      data: deepMerge(fallback.data, section?.data) as typeof fallback.data,
    } as CmsContent["sections"][SectionId];
  });

  return {
    base: deepMerge(defaultCmsContent.base, merged.base),
    sections: nextSections,
  };
}

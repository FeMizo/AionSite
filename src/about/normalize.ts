import { defaultAboutContent } from "@/src/about/default-content";
import type { AboutContent } from "@/src/about/types";

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

export function normalizeAboutContent(content: unknown): AboutContent {
  return deepMerge(defaultAboutContent, content);
}

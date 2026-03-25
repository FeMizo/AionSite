import type {
  PortfolioItem,
  PortfolioSectionData,
  PortfolioType,
} from "@/src/cms/types";

export const portfolioTypeOptions: Array<{
  label: PortfolioType;
  value: PortfolioType;
}> = [
  { label: "CMS", value: "CMS" },
  { label: "Custom code", value: "Custom code" },
  { label: "Nuxt/Next", value: "Nuxt/Next" },
];

const portfolioTypeValues = new Set(
  portfolioTypeOptions.map((option) => option.value),
);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizePortfolioType(value: unknown): PortfolioType {
  return typeof value === "string" && portfolioTypeValues.has(value as PortfolioType)
    ? (value as PortfolioType)
    : "Custom code";
}

export function normalizePortfolioItem(item: unknown): PortfolioItem {
  const source = isObject(item) ? item : {};

  return {
    title: typeof source.title === "string" ? source.title : "",
    category: typeof source.category === "string" ? source.category : "",
    image: typeof source.image === "string" ? source.image : "",
    url: typeof source.url === "string" ? source.url : "",
    type: normalizePortfolioType(source.type),
  };
}

export function normalizePortfolioItems(items: unknown): PortfolioSectionData {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizePortfolioItem);
}

export function getRecentPortfolioItems(
  items: PortfolioSectionData,
): PortfolioSectionData {
  return [...items].reverse();
}

export function getPortfolioCategories(items: PortfolioSectionData) {
  return Array.from(
    new Set(items.map((item) => item.category.trim()).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right, "es"));
}

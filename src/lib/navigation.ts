import type { NavigationItem } from "@/src/cms/types";

export function mapNavigationForInnerPage(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    href: item.href.startsWith("#") ? `/${item.href}` : item.href,
  }));
}

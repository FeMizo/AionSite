import { resolvePageHref, sitePages } from "@/src/lib/site-pages";
const SITE_URL = "https://aionsite.com.mx";

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: sitePages.find((page) => page.path === resolvePageHref(item.path))?.displayName || item.name,
        item: `${SITE_URL}${resolvePageHref(item.path)}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

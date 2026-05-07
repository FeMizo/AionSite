import type { Metadata } from "next";
import { BlogListPage } from "@/src/components/blog/BlogListPage";
import { withCanonical } from "@/src/lib/metadata";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";

export const metadata: Metadata = withCanonical("/blog", {
  title: "Blog | AionSite — Diseño Web, SEO y Conversión",
  description:
    "Estrategias, consejos y tendencias de diseño web, SEO técnico y conversión para negocios digitales en México.",
  keywords: ["blog diseño web", "SEO técnico", "conversión web", "tendencias web", "negocios digitales México"],
  openGraph: {
    title: "Blog | AionSite — Diseño Web, SEO y Conversión",
    description: "Estrategias, consejos y tendencias de diseño web, SEO técnico y conversión para negocios digitales en México.",
    url: "/blog",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/logo-aionsite.png", width: 1200, height: 630, alt: "Blog AionSite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | AionSite — Diseño Web, SEO y Conversión",
    description: "Estrategias, consejos y tendencias de diseño web, SEO técnico y conversión para negocios digitales en México.",
    images: ["/logo-aionsite.png"],
  },
});

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog" }]} />
      <BlogListPage />
    </>
  );
}

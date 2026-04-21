import type { Metadata } from "next";
import { BlogListPage } from "@/src/components/blog/BlogListPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/blog", {
  title: "Blog | AionSite — Diseño Web, SEO y Conversión",
  description:
    "Estrategias, consejos y tendencias de diseño web, SEO técnico y conversión para negocios digitales en México.",
});

export default function BlogPage() {
  return <BlogListPage />;
}

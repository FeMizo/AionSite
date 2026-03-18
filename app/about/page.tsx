import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/about", {
  title: "About Me | Jose Miss",
  description:
    "Frontend & CMS Developer specialized in Vue, Nuxt, WordPress, Shopify, performance, and SEO-focused web delivery.",
});

export default function AboutPage() {
  return <PublicAboutPage initialContent={initialAboutContent} />;
}

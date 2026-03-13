import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";

export const metadata: Metadata = {
  title: "About Me | Jose Miss",
  description:
    "Frontend & CMS Developer specialized in Vue, Nuxt, WordPress, Shopify, performance, and SEO-focused web delivery.",
};

export default function AboutPage() {
  return <PublicAboutPage initialContent={initialAboutContent} />;
}

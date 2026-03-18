import type { Metadata } from "next";
import { PublicSite } from "@/src/components/cms/PublicSite";
import { initialCmsContent } from "@/src/cms/site-content";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/");

export default function Home() {
  return <PublicSite initialContent={initialCmsContent} />;
}

import type { Metadata } from "next";
import Home2Page from "../home2/page";
import { initialCmsContent } from "@/src/cms/site-content";

export const metadata: Metadata = {
  title: "AionSite | Home B",
  description: initialCmsContent.base.description,
};

export default function HomeBPage() {
  return <Home2Page />;
}

import type { Metadata } from "next";
import { initialCmsContent } from "@/src/cms/site-content";
import { FutureStyleHomeMotion } from "@/src/components/home-b/FutureStyleHomeMotion";

export const metadata: Metadata = {
  title: "AionSite | En movimiento",
  description: initialCmsContent.base.description,
};

export default function FuturePage() {
  return <FutureStyleHomeMotion content={initialCmsContent} />;
}

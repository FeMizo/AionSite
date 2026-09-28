import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { initialCmsContent } from "@/src/cms/site-content";

export const metadata: Metadata = {
  title: "AionSite | Home B",
  description: initialCmsContent.base.description,
};

export default function HomeBPage() {
  redirect("/future");
}

import { PublicSite } from "@/src/components/cms/PublicSite";
import { initialCmsContent } from "@/src/cms/site-content";

export default function Home() {
  return <PublicSite initialContent={initialCmsContent} />;
}

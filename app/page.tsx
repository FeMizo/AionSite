import { PublicSite } from "@/src/components/cms/PublicSite";
import { readCmsContentFromFile } from "@/src/cms/file-storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readCmsContentFromFile();
  return <PublicSite initialContent={content} />;
}

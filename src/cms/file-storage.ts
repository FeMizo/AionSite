import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeCmsContent } from "@/src/cms/normalize";
import { defaultCmsContent } from "@/src/cms/default-content";
import type { CmsContent } from "@/src/cms/types";

const CMS_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "cms",
  "site-content.json",
);

export function getCmsFilePath() {
  return CMS_FILE_PATH;
}

export async function readCmsContentFromFile(): Promise<CmsContent> {
  try {
    const raw = await fs.readFile(CMS_FILE_PATH, "utf8");
    return normalizeCmsContent(JSON.parse(raw));
  } catch {
    return normalizeCmsContent(defaultCmsContent);
  }
}

export async function writeCmsContentToFile(
  content: CmsContent,
): Promise<CmsContent> {
  const normalized = normalizeCmsContent(content);
  await fs.writeFile(CMS_FILE_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
  return normalized;
}

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeCmsContent } from "@/src/cms/normalize";
import { initialCmsContent } from "@/src/cms/site-content";
import type { CmsContent } from "@/src/cms/types";

const CMS_CONTENT_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "cms",
  "site-content.json",
);

function serialize(content: CmsContent) {
  return `${JSON.stringify(content, null, 2)}\n`;
}

export async function readCmsContentFromFile(): Promise<CmsContent> {
  try {
    const raw = await fs.readFile(CMS_CONTENT_FILE_PATH, "utf8");
    return normalizeCmsContent(JSON.parse(raw));
  } catch {
    return initialCmsContent;
  }
}

export async function writeCmsContentToFile(
  content: unknown,
): Promise<CmsContent> {
  const normalized = normalizeCmsContent(content);
  await fs.writeFile(CMS_CONTENT_FILE_PATH, serialize(normalized), "utf8");
  return normalized;
}

import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultAboutContent } from "@/src/about/default-content";
import { normalizeAboutContent } from "@/src/about/normalize";
import type { AboutContent } from "@/src/about/types";

const ABOUT_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "about-content.json",
);

export async function readAboutContentFromFile(): Promise<AboutContent> {
  try {
    const raw = await fs.readFile(ABOUT_FILE_PATH, "utf8");
    return normalizeAboutContent(JSON.parse(raw));
  } catch {
    return normalizeAboutContent(defaultAboutContent);
  }
}

export async function writeAboutContentToFile(
  content: AboutContent,
): Promise<AboutContent> {
  const normalized = normalizeAboutContent(content);
  await fs.writeFile(ABOUT_FILE_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
  return normalized;
}

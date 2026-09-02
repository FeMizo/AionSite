import { promises as fs } from "node:fs";
import path from "node:path";
import { initialProspectsContent } from "./content";
import { normalizeProspectsContent } from "./normalize";
import type { ProspectsContent } from "./types";

const FILE_PATH = path.join(process.cwd(), "src", "data", "prospects", "prospects.json");
export async function readProspectsFromFile(): Promise<ProspectsContent> {
  try { return normalizeProspectsContent(JSON.parse(await fs.readFile(FILE_PATH, "utf8"))); } catch { return initialProspectsContent; }
}
export async function writeProspectsToFile(content: ProspectsContent) {
  const normalized = normalizeProspectsContent(content);
  await fs.writeFile(FILE_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
  return normalized;
}

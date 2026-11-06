import { createHash, randomUUID } from "node:crypto";
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { validateSitePages, type SitePage } from "@/src/lib/site-pages";

export const sitePagesFile = path.join(process.cwd(), 'src/data/site-pages.json');
let pendingSave: Promise<unknown> = Promise.resolve();

export async function readSitePages(filename = sitePagesFile) {
  const raw = await readFile(filename, 'utf8');
  return { pages: JSON.parse(raw) as SitePage[], version: createHash('sha256').update(raw).digest('hex') };
}

export function saveSitePages(input: unknown, version: string, filename = sitePagesFile) {
  const operation = pendingSave.catch(() => {}).then(async () => {
    const current = await readSitePages(filename);
    if (current.version !== version) throw new Error('CONFLICT: La configuración cambió. Recarga antes de guardar.');
    const pages = validateSitePages(input, current.pages);
    const temporary = `${filename}.${randomUUID()}.tmp`;
    await writeFile(temporary, `${JSON.stringify(pages, null, 2)}\n`, { flag: 'wx' });
    await rename(temporary, filename);
    return readSitePages(filename);
  });
  pendingSave = operation;
  return operation;
}

import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeJobsContent } from "@/src/jobs/normalize";
import { initialJobsContent } from "@/src/jobs/content";
import type { JobsContent } from "@/src/jobs/types";

const JOBS_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "jobs",
  "jobs.json",
);

export function getJobsFilePath() {
  return JOBS_FILE_PATH;
}

export async function readJobsContentFromFile(): Promise<JobsContent> {
  try {
    const raw = await fs.readFile(JOBS_FILE_PATH, "utf8");
    return normalizeJobsContent(JSON.parse(raw));
  } catch {
    return normalizeJobsContent(initialJobsContent);
  }
}

export async function writeJobsContentToFile(
  content: JobsContent,
): Promise<JobsContent> {
  const normalized = normalizeJobsContent(content);
  await fs.writeFile(JOBS_FILE_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
  return normalized;
}

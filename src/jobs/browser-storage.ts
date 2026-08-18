import { initialJobsContent } from "@/src/jobs/content";
import { normalizeJobsContent } from "@/src/jobs/normalize";
import type { JobsContent } from "@/src/jobs/types";

const JOBS_STORAGE_KEY = "aionsite.jobs.content";
const JOBS_FILE_API_ENDPOINT = "/api/admin/jobs/content";

export function loadJobsContentFromBrowser(): JobsContent {
  if (typeof window === "undefined") {
    return initialJobsContent;
  }

  const raw = window.localStorage.getItem(JOBS_STORAGE_KEY);
  if (!raw) {
    return initialJobsContent;
  }

  try {
    return normalizeJobsContent(JSON.parse(raw));
  } catch {
    return initialJobsContent;
  }
}

export function saveJobsContentToBrowser(content: JobsContent): JobsContent {
  const normalized = normalizeJobsContent(content);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export async function loadJobsContentFromFile(): Promise<JobsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(JOBS_FILE_API_ENDPOINT, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return normalizeJobsContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveJobsContentToFile(
  content: JobsContent,
): Promise<JobsContent | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(JOBS_FILE_API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return normalizeJobsContent(await response.json());
  } catch {
    return null;
  }
}

export async function saveJobsContent(content: JobsContent): Promise<{
  content: JobsContent;
  persistedToFile: boolean;
}> {
  const normalized = saveJobsContentToBrowser(content);
  const fileContent = await saveJobsContentToFile(normalized);
  const finalContent = fileContent ?? normalized;

  saveJobsContentToBrowser(finalContent);

  return {
    content: finalContent,
    persistedToFile: Boolean(fileContent),
  };
}

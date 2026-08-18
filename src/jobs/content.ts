import jobsContent from "@/src/data/jobs/jobs.json";
import { normalizeJobsContent } from "@/src/jobs/normalize";
import type { JobsContent } from "@/src/jobs/types";

export const initialJobsContent: JobsContent = normalizeJobsContent(jobsContent);

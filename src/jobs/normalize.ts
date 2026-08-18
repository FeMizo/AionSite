import { jobStatuses, type JobsContent, type JobRecord, type JobStatus } from "@/src/jobs/types";

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function asNumberOrNull(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asStack(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeStatus(value: unknown): JobStatus {
  const status = asString(value);
  return (jobStatuses as readonly string[]).includes(status)
    ? (status as JobStatus)
    : "pendiente";
}

function normalizeJob(job: Partial<JobRecord> & Record<string, unknown>): JobRecord {
  return {
    id: asString(job.id, crypto.randomUUID()),
    company: asString(job.company, "Sin empresa"),
    title: asString(job.title, "Sin puesto"),
    salaryLabel: asString(job.salaryLabel, "No visible"),
    salaryUsdMin: asNumberOrNull(job.salaryUsdMin),
    salaryUsdMax: asNumberOrNull(job.salaryUsdMax),
    zone: asString(job.zone, "Remote"),
    region: asString(job.region, "Global"),
    source: asString(job.source, "Unknown"),
    link: asString(job.link, "#"),
    stack: asStack(job.stack),
    status: normalizeStatus(job.status),
    cover: asString(job.cover),
    notes: asString(job.notes),
    lastTouchedAt: asString(job.lastTouchedAt, new Date().toISOString()),
  };
}

export function normalizeJobsContent(input: unknown): JobsContent {
  const raw = (input ?? {}) as Record<string, unknown>;
  const profile = (raw.profile ?? {}) as Record<string, unknown>;
  const jobs = Array.isArray(raw.jobs) ? raw.jobs : [];

  return {
    profile: {
      name: asString(profile.name, "Felipe Miss"),
      email: asString(profile.email, "femiss0693@gmail.com"),
      phone: asString(profile.phone, "+52 938 123 85-31"),
      linkedin: asString(profile.linkedin, "https://www.linkedin.com/in/jose-miss/"),
      location: asString(profile.location, "Mexico City, Mexico"),
      country: asString(profile.country, "Mexico"),
      experience: asString(profile.experience, "8+ years"),
      visaSponsorship: asString(profile.visaSponsorship, "No"),
      salaryExpectation: asString(profile.salaryExpectation, "70000 USD"),
      stackSummary: asString(
        profile.stackSummary,
        "WordPress, WooCommerce, Shopify, Liquid, Vue.js, Nuxt.js, Next.js, React, TypeScript, JavaScript",
      ),
      about: asString(
        profile.about,
        "Web developer focused on remote delivery, ecommerce storefronts, CMS builds, and custom code.",
      ),
    },
    jobs: jobs.map((job) => normalizeJob(job as Partial<JobRecord> & Record<string, unknown>)),
  };
}

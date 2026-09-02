import { prospectStatuses, type ProspectRecord, type ProspectStatus, type ProspectsContent } from "./types";

const stringValue = (value: unknown, fallback = "") => typeof value === "string" ? value.trim() : fallback;

function statusValue(value: unknown): ProspectStatus {
  const status = stringValue(value);
  return (prospectStatuses as readonly string[]).includes(status) ? status as ProspectStatus : "por visitar";
}

function normalizeProspect(value: unknown): ProspectRecord {
  const raw = (value ?? {}) as Record<string, unknown>;
  const now = new Date().toISOString();
  const id = stringValue(raw.id, crypto.randomUUID());
  return {
    id,
    name: stringValue(raw.name, "Sin nombre"),
    location: stringValue(raw.location, "Ciudad del Carmen"),
    website: stringValue(raw.website),
    phone: stringValue(raw.phone),
    facebook: stringValue(raw.facebook),
    instagram: stringValue(raw.instagram),
    status: statusValue(raw.status),
    notes: stringValue(raw.notes),
    createdAt: stringValue(raw.createdAt, now),
    updatedAt: stringValue(raw.updatedAt, now),
  };
}

export function normalizeProspectsContent(input: unknown): ProspectsContent {
  const raw = (input ?? {}) as Record<string, unknown>;
  return { prospects: Array.isArray(raw.prospects) ? raw.prospects.map(normalizeProspect) : [] };
}

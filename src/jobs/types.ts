export const jobStatuses = [
  "pendiente",
  "para_aplicar",
  "aplicado",
  "skipeado",
  "no_entra_en_planes",
  "no_disponible",
  "follow_up",
  "en_espera",
  "rechazado",
  "bloqueado",
  "guardado_para_despues",
] as const;

export type JobStatus = (typeof jobStatuses)[number];

export type JobsProfile = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  country: string;
  experience: string;
  visaSponsorship: string;
  salaryExpectation: string;
  stackSummary: string;
  about: string;
};

export type JobRecord = {
  id: string;
  dbId: string;
  company: string;
  title: string;
  salaryLabel: string;
  salaryCurrency: string;
  salaryUsdMin: number | null;
  salaryUsdMax: number | null;
  fitReason: string;
  checkedAt: string;
  addedAt: string;
  zone: string;
  region: string;
  source: string;
  link: string;
  stack: string[];
  status: JobStatus;
  cover: string;
  notes: string;
  lastTouchedAt: string;
};

export type JobsContent = {
  profile: JobsProfile;
  jobs: JobRecord[];
  lastJobsSearchAt: string;
  searchCriteria?: {
    remoteOnly: boolean;
    eligibleFromCountry: string;
    eligibleFromLocation: string;
    excludedLocationRestrictions: string[];
  };
};

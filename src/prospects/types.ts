export const prospectStatuses = [
  "por visitar",
  "visitados",
  "contactados",
  "enviado propuesta",
  "seguimiento",
  "rechazado",
  "completado",
  "cliente",
] as const;

export type ProspectStatus = (typeof prospectStatuses)[number];

export type ProspectRecord = {
  id: string;
  name: string;
  location: string;
  website: string;
  phone: string;
  facebook: string;
  instagram: string;
  status: ProspectStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type ProspectsContent = {
  prospects: ProspectRecord[];
};

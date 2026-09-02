import prospects from "@/src/data/prospects/prospects.json";
import { normalizeProspectsContent } from "./normalize";
export const initialProspectsContent = normalizeProspectsContent(prospects);

import aboutContent from "@/src/data/about-content.json";
import { normalizeAboutContent } from "@/src/about/normalize";

export const initialAboutContent = normalizeAboutContent(aboutContent);

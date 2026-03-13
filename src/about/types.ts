import type { FieldDefinition } from "@/src/cms/types";

export type AboutHeroContent = {
  eyebrow: string;
  title: string;
  summary: string;
  location: string;
  availability: string;
  role: string;
  highlights: Array<{
    value: string;
    label: string;
  }>;
};

export type AboutIntroContent = {
  title: string;
  paragraphs: string[];
  principles: Array<{
    title: string;
    description: string;
  }>;
};

export type AboutValueBlock = {
  eyebrow: string;
  title: string;
  description: string;
};

export type AboutExperienceItem = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
};

export type AboutStackGroup = {
  title: string;
  description: string;
  items: string[];
};

export type AboutDifferentiator = {
  eyebrow: string;
  title: string;
  description: string;
};

export type AboutEducationContent = {
  title: string;
  summary: string;
  languages: string[];
};

export type AboutContactContent = {
  title: string;
  description: string;
  note: string;
  email: string;
  linkedIn: string;
};

export type AboutContent = {
  hero: AboutHeroContent;
  intro: AboutIntroContent;
  valueBlocks: AboutValueBlock[];
  experience: AboutExperienceItem[];
  stack: AboutStackGroup[];
  differentiators: AboutDifferentiator[];
  education: AboutEducationContent;
  contact: AboutContactContent;
};

export type AboutSectionId = keyof AboutContent;

export type AboutSectionRegistryEntry<K extends AboutSectionId = AboutSectionId> = {
  id: K;
  label: string;
  description: string;
  fields: FieldDefinition[];
};

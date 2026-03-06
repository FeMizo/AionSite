export type NavigationItem = {
  name: string;
  href: string;
};

export type SectionPlacement = "header" | "main" | "footer" | "floating";

export type CmsBase = {
  name: string;
  description: string;
  email: string;
  whatsappLink: string;
  navigation: NavigationItem[];
  logoLight: string;
};

export type HeaderSectionData = {
  name: string;
  navigation: NavigationItem[];
  whatsappLink: string;
};

export type HeroSectionData = {
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  trustBar: string[];
};

export type ServicesSectionData = Array<{
  title: string;
  description: string;
  icon: string;
}>;

export type StatsSectionData = Array<{
  value: string;
  label: string;
}>;

export type PortfolioSectionData = Array<{
  title: string;
  category: string;
  image: string;
  url: string;
}>;

export type ProcessSectionData = Array<{
  step: string;
  title: string;
  description: string;
}>;

export type PricingSectionData = Array<{
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}>;

export type TestimonialsSectionData = Array<{
  name: string;
  company: string;
  text: string;
}>;

export type FAQSectionData = Array<{
  question: string;
  answer: string;
}>;

export type FinalCTASectionData = {
  title: string;
  subtitle: string;
  buttonText: string;
  responseText: string;
  whatsappLink: string;
};

export type FooterSectionData = {
  name: string;
  description: string;
  email: string;
  navigation: NavigationItem[];
  whatsappLink: string;
};

export type WhatsAppFloatingButtonData = {
  whatsappLink: string;
  tooltip: string;
};

export type SectionDataMap = {
  header: HeaderSectionData;
  hero: HeroSectionData;
  services: ServicesSectionData;
  stats: StatsSectionData;
  portfolio: PortfolioSectionData;
  process: ProcessSectionData;
  pricing: PricingSectionData;
  testimonials: TestimonialsSectionData;
  faq: FAQSectionData;
  finalCTA: FinalCTASectionData;
  footer: FooterSectionData;
  whatsappFloatingButton: WhatsAppFloatingButtonData;
};

export type SectionId = keyof SectionDataMap;

export type CmsSectionState<T> = {
  id: SectionId;
  enabled: boolean;
  order: number;
  data: T;
};

export type CmsSections = {
  [K in SectionId]: CmsSectionState<SectionDataMap[K]>;
};

export type CmsContent = {
  base: CmsBase;
  sections: CmsSections;
};

export type PrimitiveFieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "boolean";

export type PrimitiveFieldDefinition = {
  key: string;
  label: string;
  type: PrimitiveFieldType;
  placeholder?: string;
  description?: string;
};

export type ArrayFieldDefinition = {
  key: string;
  label: string;
  type: "array";
  itemLabel: string;
  itemFields?: FieldDefinition[];
  itemType?: Exclude<PrimitiveFieldType, "boolean">;
  placeholder?: string;
  description?: string;
};

export type FieldDefinition = PrimitiveFieldDefinition | ArrayFieldDefinition;

export type SectionRegistryEntry<K extends SectionId = SectionId> = {
  id: K;
  label: string;
  description: string;
  placement: SectionPlacement;
  type: string;
  fields: FieldDefinition[];
};

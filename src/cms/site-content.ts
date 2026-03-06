import cmsContent from "@/src/data/cms/site-content.json";
import {
  getActiveSectionIds,
  getOrderedSectionIds,
  renderSection,
  sectionRegistry,
} from "@/src/cms/registry";
import { normalizeCmsContent } from "@/src/cms/normalize";
import type { CmsContent, SectionId, SectionPlacement } from "@/src/cms/types";

export const initialCmsContent = normalizeCmsContent(cmsContent);

export function getSectionRegistry() {
  return sectionRegistry;
}

export function getRenderableSectionIds(
  content: CmsContent,
  placement?: SectionPlacement,
) {
  return getActiveSectionIds(content, placement);
}

export function getSectionOrder(content: CmsContent) {
  return getOrderedSectionIds(content);
}

export function renderCmsSection(id: SectionId, content: CmsContent) {
  return renderSection(id, content);
}

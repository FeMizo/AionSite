"use client";

import { useEffect, useState } from "react";
import {
  loadCmsContentFromBrowser,
} from "@/src/cms/browser-storage";
import {
  getRenderableSectionIds,
  initialCmsContent,
  renderCmsSection,
} from "@/src/cms/site-content";
import type { CmsContent } from "@/src/cms/types";

export function PublicSite({
  initialContent = initialCmsContent,
}: {
  initialContent?: CmsContent;
}) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(loadCmsContentFromBrowser());
  }, []);

  const headerSections = getRenderableSectionIds(content, "header");
  const mainSections = getRenderableSectionIds(content, "main");
  const footerSections = getRenderableSectionIds(content, "footer");
  const floatingSections = getRenderableSectionIds(content, "floating");

  return (
    <>
      {headerSections.map((id, index) => (
        <div key={`header-${id}-${index}`}>{renderCmsSection(id, content)}</div>
      ))}
      <main className="min-h-screen">
        {mainSections.map((id, index) => (
          <div key={`main-${id}-${index}`}>{renderCmsSection(id, content)}</div>
        ))}
      </main>
      {footerSections.map((id, index) => (
        <div key={`footer-${id}-${index}`}>{renderCmsSection(id, content)}</div>
      ))}
      {floatingSections.map((id, index) => (
        <div key={`floating-${id}-${index}`}>{renderCmsSection(id, content)}</div>
      ))}
    </>
  );
}

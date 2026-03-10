"use client";

import { useEffect, useState } from "react";
import {
  loadCmsContentFromBrowser,
  loadCmsContentFromServer,
  saveCmsContentToBrowser,
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
    let isCancelled = false;

    const syncFromServer = async () => {
      const serverContent = await loadCmsContentFromServer();
      if (isCancelled) {
        return;
      }

      if (serverContent) {
        setContent(serverContent);
        saveCmsContentToBrowser(serverContent);
        return;
      }

      setContent(loadCmsContentFromBrowser());
    };

    void syncFromServer();

    return () => {
      isCancelled = true;
    };
  }, []);

  const headerSections = getRenderableSectionIds(content, "header");
  const mainSections = getRenderableSectionIds(content, "main");
  const footerSections = getRenderableSectionIds(content, "footer");
  const floatingSections = getRenderableSectionIds(content, "floating");

  return (
    <>
      {headerSections.map((id) => (
        <div key={id}>{renderCmsSection(id, content)}</div>
      ))}
      <main className="min-h-screen">
        {mainSections.map((id) => (
          <div key={id}>{renderCmsSection(id, content)}</div>
        ))}
      </main>
      {footerSections.map((id) => (
        <div key={id}>{renderCmsSection(id, content)}</div>
      ))}
      {floatingSections.map((id) => (
        <div key={id}>{renderCmsSection(id, content)}</div>
      ))}
    </>
  );
}

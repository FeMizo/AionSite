"use client";

import { useEffect, useState } from "react";
import {
  loadCmsContentFromFile,
  saveCmsContentToBrowser,
} from "@/src/cms/browser-storage";
import {
  getRenderableSectionIds,
  initialCmsContent,
  renderCmsSection,
} from "@/src/cms/site-content";
import { DashboardPopup } from "@/src/components/ui/DashboardPopup";
import type { CmsContent } from "@/src/cms/types";

export function PublicSite({
  initialContent = initialCmsContent,
}: {
  initialContent?: CmsContent;
}) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      const fileContent = await loadCmsContentFromFile();
      if (!fileContent || isCancelled) {
        return;
      }

      saveCmsContentToBrowser(fileContent);
      setContent(fileContent);
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Header and footer placements are skipped: the site-wide header and footer
  // come from the root layout (src/components/site).
  const mainSections = getRenderableSectionIds(content, "main");
  const floatingSections = getRenderableSectionIds(content, "floating").filter((id) => id !== "whatsappFloatingButton");

  return (
    <>
      <main className="min-h-screen">
        {mainSections.map((id, index) => (
          <div key={`main-${id}-${index}`}>{renderCmsSection(id, content)}</div>
        ))}
      </main>
      {floatingSections.map((id, index) => (
        <div key={`floating-${id}-${index}`}>{renderCmsSection(id, content)}</div>
      ))}
      <DashboardPopup />
    </>
  );
}

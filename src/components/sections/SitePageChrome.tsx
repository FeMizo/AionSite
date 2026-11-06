"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sitePages, resolvePageHref } from "@/src/lib/site-pages";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import type { WhatsAppFloatingButtonData } from "@/src/cms/types";

export function SitePageChrome({ data, enabled }: {data: WhatsAppFloatingButtonData; enabled: boolean}) {
  const pathname = usePathname() || '/';
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  useEffect(() => {
    if (isAdmin) return;
    const destination = resolvePageHref(pathname);
    const page = sitePages.find((entry) => entry.path.replace(/\/$/, '') === destination.replace(/\/$/, ''));
    if (page?.title) document.title = page.title;
  }, [pathname, isAdmin]);
  return enabled && !isAdmin ? <WhatsAppFloatingButton data={data} /> : null;
}

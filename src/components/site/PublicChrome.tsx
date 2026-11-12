"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { sitePages } from "@/src/lib/site-pages";

/**
 * Routes that keep their own chrome:
 * - /admin: the CMS has its own layout.
 * - The style lab (/estilos and everything under it) and the style demos,
 *   which are self-contained sample landings. Demos are built at their source
 *   path (e.g. /arkkhe/) and published under /estilos/…, so both are listed —
 *   otherwise the static HTML and the hydrated page would disagree.
 */
const ownChromePrefixes = [
  "/admin",
  "/estilos",
  ...sitePages
    .filter((page) => page.path.startsWith("/estilos/"))
    .flatMap((page) => [page.sourcePath, ...page.aliases]),
].map((route) => route.replace(/\/$/, ""));

export function hasSiteChrome(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  return !ownChromePrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/** Renders the site header or footer only on public pages that use the shared chrome. */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  return hasSiteChrome(pathname) ? <>{children}</> : null;
}

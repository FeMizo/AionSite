import NextLink from "next/link";
import type { ComponentProps } from "react";
import { resolvePageHref } from "@/src/lib/site-pages";

export default function SiteLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const destination = typeof href === 'string' ? resolvePageHref(href) : { ...href, pathname: href.pathname ? resolvePageHref(href.pathname) : href.pathname };
  return <NextLink href={destination} {...props} />;
}

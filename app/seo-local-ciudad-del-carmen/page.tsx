import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { LocalLandingPage } from "@/src/components/local/LocalLandingPage";
import { localSeoConfig } from "@/src/components/local/configs";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/seo-local-ciudad-del-carmen/", {
  title: "SEO Local en Ciudad del Carmen | AionSite",
  description: "SEO local para negocios de Ciudad del Carmen: más visibilidad en Google, páginas útiles y seguimiento de contactos.",
  keywords: ["SEO local Ciudad del Carmen", "posicionamiento local Campeche", "SEO para negocios Ciudad del Carmen"],
});

export default function LocalSeoPage() {
  return <><BreadcrumbSchema items={[{ name: "SEO local en Ciudad del Carmen", path: "/seo-local-ciudad-del-carmen/" }]} /><LocalLandingPage config={localSeoConfig} /></>;
}

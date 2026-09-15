import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { LocalLandingPage } from "@/src/components/local/LocalLandingPage";
import { seoMexicoConfig } from "@/src/components/local/configs";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/seo-mexico/", {
  title: "SEO en México para Negocios | AionSite",
  description: "SEO para negocios en México: mejora tu visibilidad en Google, atrae visitas relevantes y convierte búsquedas en contactos.",
  keywords: ["SEO México", "posicionamiento web México", "SEO para negocios México"],
});

export default function SeoMexicoPage() {
  return <><BreadcrumbSchema items={[{ name: "SEO para negocios en México", path: "/seo-mexico/" }]} /><LocalLandingPage config={seoMexicoConfig} /></>;
}

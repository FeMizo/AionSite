import type { Metadata } from "next";
import { initialCmsContent } from "@/src/cms/site-content";
import { PublicProjectsPage } from "@/src/components/portfolio/PublicProjectsPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/proyectos", {
  title: "Proyectos | AionSite — Portafolio de Diseño Web",
  description:
    "Portafolio completo de proyectos web ordenados por reciente, con filtros por categoría, tipo y buscador integrado.",
  openGraph: {
    title: "Proyectos | AionSite — Portafolio de Diseño Web",
    description: "Portafolio completo de proyectos web ordenados por reciente, con filtros por categoría, tipo y buscador integrado.",
    url: "/proyectos",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/logo-aionsite.png", width: 1200, height: 630, alt: "Proyectos — AionSite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos | AionSite — Portafolio de Diseño Web",
    description: "Portafolio completo de proyectos web ordenados por reciente, con filtros por categoría, tipo y buscador integrado.",
    images: ["/logo-aionsite.png"],
  },
});

export default function ProjectsPage() {
  return <PublicProjectsPage initialContent={initialCmsContent} />;
}

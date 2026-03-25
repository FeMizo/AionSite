import type { Metadata } from "next";
import { initialCmsContent } from "@/src/cms/site-content";
import { PublicProjectsPage } from "@/src/components/portfolio/PublicProjectsPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/proyectos", {
  title: "Proyectos | AionSite",
  description:
    "Portafolio completo de proyectos web ordenados por reciente, con filtros por categorÃ­a, tipo y buscador integrado.",
});

export default function ProjectsPage() {
  return <PublicProjectsPage initialContent={initialCmsContent} />;
}

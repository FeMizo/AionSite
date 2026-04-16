import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/about", {
  title: "Nosotros | AionSite — Diseño Web Premium en México",
  description: "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
});

export default function AboutPage() {
  return <PublicAboutPage initialContent={initialAboutContent} />;
}

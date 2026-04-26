import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";
import { withCanonical } from "@/src/lib/metadata";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";

export const metadata: Metadata = withCanonical("/about", {
  title: "Nosotros | AionSite — Diseño Web Premium en México",
  description: "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
  openGraph: {
    title: "Nosotros | AionSite — Diseño Web Premium en México",
    description: "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
    url: "/about",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/logo-aionsite.png", width: 1200, height: 630, alt: "Nosotros — AionSite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | AionSite — Diseño Web Premium en México",
    description: "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
    images: ["/logo-aionsite.png"],
  },
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Nosotros", path: "/about" }]} />
      <PublicAboutPage initialContent={initialAboutContent} />
    </>
  );
}

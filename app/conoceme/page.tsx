import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";
import { withCanonical } from "@/src/lib/metadata";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";

export const metadata: Metadata = withCanonical("/conoceme", {
  title: "Conóceme | AionSite - Diseño Web Premium en México",
  description:
    "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
  keywords: [
    "conóceme AionSite",
    "equipo diseño web",
    "agencia web México",
    "quienes somos",
    "proyectos web entregados",
  ],
  openGraph: {
    title: "Conóceme | AionSite - Diseño Web Premium en México",
    description:
      "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
    url: "/conoceme",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/placeholder.webp",
        width: 1200,
        height: 630,
        alt: "Conóceme - AionSite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conóceme | AionSite - Diseño Web Premium en México",
    description:
      "Conoce al equipo detrás de AionSite. Más de 35 proyectos web entregados, especializados en velocidad, conversión y SEO técnico.",
    images: ["/placeholder.webp"],
  },
});

export default function ConocemePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Conóceme", path: "/conoceme" }]} />
      <PublicAboutPage initialContent={initialAboutContent} />
    </>
  );
}

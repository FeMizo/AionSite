import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { PublicAboutPage } from "@/src/components/about/PublicAboutPage";
import { withCanonical } from "@/src/lib/metadata";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";

export const metadata: Metadata = withCanonical("/about", {
  title: "Conoceme | AionSite - Diseno Web Premium en Mexico",
  description:
    "Conoce al equipo detras de AionSite. Mas de 35 proyectos web entregados, especializados en velocidad, conversion y SEO tecnico.",
  keywords: [
    "conoceme AionSite",
    "equipo diseno web",
    "agencia web Mexico",
    "quienes somos",
    "proyectos web entregados",
  ],
  openGraph: {
    title: "Conoceme | AionSite - Diseno Web Premium en Mexico",
    description:
      "Conoce al equipo detras de AionSite. Mas de 35 proyectos web entregados, especializados en velocidad, conversion y SEO tecnico.",
    url: "/about",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Conoceme - AionSite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conoceme | AionSite - Diseno Web Premium en Mexico",
    description:
      "Conoce al equipo detras de AionSite. Mas de 35 proyectos web entregados, especializados en velocidad, conversion y SEO tecnico.",
    images: ["/placeholder.png"],
  },
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Conoceme", path: "/about" }]} />
      <PublicAboutPage initialContent={initialAboutContent} />
    </>
  );
}

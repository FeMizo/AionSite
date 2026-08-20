import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { PublicProductsPage } from "@/src/components/productos/PublicProductsPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/productos/", {
  title: "Productos | AionSite - Web, velocidad y custom code",
  description:
    "Tres productos premium de AionSite: creación de webs, mejora de velocidad y custom code. Experiencia visual en scroll con CTA a WhatsApp.",
  keywords: [
    "AionSite productos",
    "creacion de webs",
    "mejora de velocidad",
    "custom code",
    "diseño web premium",
  ],
  openGraph: {
    title: "Productos | AionSite - Web, velocidad y custom code",
    description:
      "Tres productos premium de AionSite: creación de webs, mejora de velocidad y custom code.",
    url: "/productos/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Productos de AionSite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos | AionSite - Web, velocidad y custom code",
    description:
      "Tres productos premium de AionSite: creación de webs, mejora de velocidad y custom code.",
    images: ["/placeholder.png"],
  },
});

export default function ProductosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Productos", path: "/productos/" }]} />
      <PublicProductsPage />
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { initialCmsContent } from "@/src/cms/site-content";
import { metadataBase } from "@/src/lib/metadata";
import { SchemaMarkup } from "@/src/components/ui/SchemaMarkup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase,
  title: "Diseño y Desarrollo Web Premium | AionSite",
  description: "Creamos sitios web rápidos, modernos y orientados a conversión. Más clientes, mejor imagen, resultados reales. Cotiza hoy sin compromiso.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: initialCmsContent.sections.header.data.name,
    description: initialCmsContent.sections.footer.data.description,
    url: "/",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}
      >
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}

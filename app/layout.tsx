import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import { initialCmsContent } from "@/src/cms/site-content";
import { metadataBase } from "@/src/lib/metadata";
import { SchemaMarkup } from "@/src/components/ui/SchemaMarkup";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

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
    <html lang="es" className={`scroll-smooth ${epilogue.variable} ${bricolage.variable}`}>
      <body className="font-sans bg-slate-950 text-slate-200 antialiased">
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}

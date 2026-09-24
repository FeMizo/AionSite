import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import { metadataBase } from "@/src/lib/metadata";
import { SchemaMarkup } from "@/src/components/ui/SchemaMarkup";
import { GdprConsent } from "@/src/components/ui/GdprConsent";
import { MetaPixel } from "@/src/components/analytics/MetaPixel";
import { GoogleTagManager } from "@/src/components/analytics/GoogleTagManager";
import "./globals.css";
import "./claymorphism/claymorphism.css";
import "./specialui/specialui.css";
import "./skeuomorphism/skeuomorphism.css";
import "./spatial-ui/spatial-ui.css";
import "./style-page-chrome.css";

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
  title: "AionSite | Sitios Web Premium, Mantenimiento y SEO para Negocios",
  description: "Diseño web premium, mantenimiento web, tiendas online y SEO técnico para que más clientes encuentren tu negocio en México.",
  keywords: ["diseño web México", "sitios web premium", "mantenimiento web", "SEO técnico para negocios", "ecommerce", "agencia web", "AionSite"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "AionSite | Sitios Web Premium, Mantenimiento y SEO para Negocios",
    description: "Diseño web premium, mantenimiento web, tiendas online y SEO técnico para que más clientes encuentren tu negocio en México.",
    url: "/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/aionsite-share.png",
        width: 1200,
        height: 630,
        alt: "AionSite — Sitios Web Premium, Mantenimiento y SEO para Negocios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AionSite | Sitios Web Premium, Mantenimiento y SEO para Negocios",
    description: "Diseño web premium, mantenimiento web, tiendas online y SEO técnico para que más clientes encuentren tu negocio en México.",
    images: ["/aionsite-share.png"],
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
        <GoogleTagManager />
        <MetaPixel />
        {children}
        <GdprConsent />
      </body>
    </html>
  );
}

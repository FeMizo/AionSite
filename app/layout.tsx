import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import Script from "next/script";
import { metadataBase } from "@/src/lib/metadata";
import { SchemaMarkup } from "@/src/components/ui/SchemaMarkup";
import "./globals.css";

const GTM_ID = "GTM-PBTGRC8R";

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
  keywords: ["diseño web", "desarrollo web", "páginas web profesionales", "diseño web México", "AionSite", "agencia web", "sitios web modernos"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Diseño y Desarrollo Web Premium | AionSite",
    description: "Creamos sitios web rápidos, modernos y orientados a conversión. Más clientes, mejor imagen, resultados reales. Cotiza hoy sin compromiso.",
    url: "/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/logo-aionsite.png",
        width: 1200,
        height: 630,
        alt: "AionSite — Diseño y Desarrollo Web Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño y Desarrollo Web Premium | AionSite",
    description: "Creamos sitios web rápidos, modernos y orientados a conversión. Más clientes, mejor imagen, resultados reales.",
    images: ["/logo-aionsite.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${epilogue.variable} ${bricolage.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="font-sans bg-slate-950 text-slate-200 antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}

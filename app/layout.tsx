import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import Script from "next/script";
import { initialCmsContent } from "@/src/cms/site-content";
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

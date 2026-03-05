import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteData } from "@/src/data/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteData.name} | ${siteData.tagline}`,
  description: siteData.description,
  openGraph: {
    title: siteData.name,
    description: siteData.description,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { initialCmsContent } from "@/src/cms/site-content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${initialCmsContent.sections.header.data.name} | ${initialCmsContent.sections.hero.data.title}`,
  description: initialCmsContent.sections.footer.data.description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: initialCmsContent.sections.header.data.name,
    description: initialCmsContent.sections.footer.data.description,
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
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = {
  title: "Luma",
  description: "Showcase editorial de maquillaje y belleza.",
};

export default function LumaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <><StylePlayground rootSelector=".luma-page" accent="#c97854" secondary="#9d4e35" background="#fffaf5" surface="#f7ece2" text="#191716" muted="#6f625b" />{children}</>;
}

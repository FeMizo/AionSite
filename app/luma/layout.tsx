import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = {
  title: "Luma",
  description: "Showcase editorial de maquillaje y belleza.",
};

export default function LumaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <><StylePlayground rootSelector=".luma-page" accent="#c97854" background="#fffaf5" text="#191716" />{children}</>;
}

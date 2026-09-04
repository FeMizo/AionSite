import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luma",
  description: "Showcase editorial de maquillaje y belleza.",
};

export default function DesignReferenceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

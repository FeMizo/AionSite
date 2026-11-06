import type { Metadata } from "next";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { DemoExamplesGallery } from "@/src/components/admin/DemoExamplesGallery";

export const metadata: Metadata = {
  title: "Ejemplos de diseño | Admin | AionSite",
  robots: { index: false, follow: false },
};

export default function DemoExamplesPage() {
  return <AdminShell pathname="/admin/ejemplos" title="Ejemplos de diseño" description="Explora las propuestas de AionSite. Usa una como base o combina secciones para tu siguiente proyecto."><DemoExamplesGallery /></AdminShell>;
}

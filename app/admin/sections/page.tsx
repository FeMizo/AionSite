import type { Metadata } from "next";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { SectionsDashboard } from "@/src/components/admin/SectionsDashboard";
import { initialCmsContent } from "@/src/cms/site-content";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/admin/sections", {
  title: "Secciones | Admin | AionSite",
  description: "Gestion local del catalogo, orden y visibilidad de secciones del CMS.",
});

export default function AdminSectionsPage() {
  return (
    <AdminShell
      pathname="/admin/sections"
      title="Secciones"
      description="Gestiona qué secciones existen, cuáles se muestran y en qué orden salen. En local, los cambios se persisten en archivo y navegador."
    >
      <SectionsDashboard initialContent={initialCmsContent} />
    </AdminShell>
  );
}

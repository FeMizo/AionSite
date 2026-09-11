import type { Metadata } from "next";
import { initialAboutContent } from "@/src/about/content";
import { ContentDashboard } from "@/src/components/admin/ContentDashboard";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { initialCmsContent } from "@/src/cms/site-content";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/admin/content", {
  title: "Contenido | Admin | AionSite",
  description: "Editor local de contenido para las páginas y secciones del sitio.",
});

export default function AdminContentPage() {
  return (
    <AdminShell
      pathname="/admin/content"
      title="Contenido"
      description="Edita contenido por página. Primero eliges la página y después la sección específica que quieres ajustar."
    >
      <ContentDashboard
        initialCmsContent={initialCmsContent}
        initialAboutContent={initialAboutContent}
      />
    </AdminShell>
  );
}

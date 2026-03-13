import { initialAboutContent } from "@/src/about/content";
import { ContentDashboard } from "@/src/components/admin/ContentDashboard";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { initialCmsContent } from "@/src/cms/site-content";

export default function AdminContentPage() {
  return (
    <AdminShell
      pathname="/admin/content"
      title="Contenido"
      description="Edita contenido por pagina. Primero eliges la pagina y despues la seccion especifica que quieres ajustar."
    >
      <ContentDashboard
        initialCmsContent={initialCmsContent}
        initialAboutContent={initialAboutContent}
      />
    </AdminShell>
  );
}

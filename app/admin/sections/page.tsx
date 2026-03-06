import { AdminShell } from "@/src/components/admin/AdminShell";
import { SectionsDashboard } from "@/src/components/admin/SectionsDashboard";
import { initialCmsContent } from "@/src/cms/site-content";

export default function AdminSectionsPage() {
  return (
    <AdminShell
      pathname="/admin/sections"
      title="Secciones"
      description="Gestiona que secciones existen, cuales se muestran, en que orden salen y que contenido base renderiza cada una. Los cambios se guardan localmente en este navegador."
    >
      <SectionsDashboard initialContent={initialCmsContent} />
    </AdminShell>
  );
}

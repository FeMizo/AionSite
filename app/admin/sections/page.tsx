import { AdminShell } from "@/src/components/admin/AdminShell";
import { SectionsDashboard } from "@/src/components/admin/SectionsDashboard";
import { initialCmsContent } from "@/src/cms/site-content";

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

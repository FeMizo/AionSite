import { AdminShell } from "@/src/components/admin/AdminShell";
import { SectionsDashboard } from "@/src/components/admin/SectionsDashboard";
import { readCmsContentFromFile } from "@/src/cms/file-storage";

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const content = await readCmsContentFromFile();

  return (
    <AdminShell
      pathname="/admin/sections"
      title="Secciones"
      description="Gestiona que secciones existen, cuales se muestran, en que orden salen y que contenido base renderiza cada una. Los cambios se guardan en el CMS del proyecto y aplican al sitio general."
    >
      <SectionsDashboard initialContent={content} />
    </AdminShell>
  );
}

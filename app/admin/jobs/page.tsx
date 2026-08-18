import type { Metadata } from "next";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { JobsDashboard } from "@/src/components/admin/JobsDashboard";
import { initialJobsContent } from "@/src/jobs/content";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/admin/jobs", {
  title: "Jobs | AionSite",
  description: "Panel local para filtrar, priorizar y preparar postulaciones remotas.",
});

export default function AdminJobsPage() {
  return (
    <AdminShell
      pathname="/admin/jobs"
      title="Jobs"
      description="Tablero local para guardar vacantes, filtrar por encaje, cambiar estados y preparar autofill asistido sin mentir."
    >
      <JobsDashboard initialContent={initialJobsContent} />
    </AdminShell>
  );
}

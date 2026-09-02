import type { Metadata } from "next";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { ProspectsDashboard } from "@/src/components/admin/ProspectsDashboard";
import { initialProspectsContent } from "@/src/prospects/content";
import { withCanonical } from "@/src/lib/metadata";
export const metadata: Metadata = withCanonical("/admin/prospectos", { title: "Prospectos | AionSite", description: "CRM local de prospectos para AionSite." });
export default function AdminProspectsPage() {
  return <AdminShell pathname="/admin/prospectos" title="Prospectos" description="Tabla interactiva para registrar negocios, contactos, propuestas y clientes."><ProspectsDashboard initialContent={initialProspectsContent} /></AdminShell>;
}

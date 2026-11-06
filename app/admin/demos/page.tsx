import type { Metadata } from "next";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { DemoRequestDashboard } from "@/src/components/admin/DemoRequestDashboard";

export const metadata: Metadata = { title: "Demos | Admin | AionSite", robots: { index: false, follow: false } };

export default function DemoRequestsPage() {
  return <AdminShell pathname="/admin/demos" title="Demos comerciales" description="Convierte la solicitud de WhatsApp en un brief para generar propuestas con Codex."><DemoRequestDashboard /></AdminShell>;
}

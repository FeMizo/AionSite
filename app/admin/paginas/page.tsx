import { AdminShell } from "@/src/components/admin/AdminShell";
import { PagesDashboard } from "@/src/components/admin/PagesDashboard";

export const metadata={title:'Páginas | Admin | AionSite',robots:{index:false,follow:false}};
export default function AdminPages(){return <AdminShell pathname="/admin/paginas" title="Páginas y URLs" description="Edita los nombres, etiquetas, títulos y direcciones de tus páginas."><PagesDashboard/></AdminShell>;}

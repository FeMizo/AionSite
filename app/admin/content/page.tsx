import { AdminShell } from "@/src/components/admin/AdminShell";

export default function AdminContentPage() {
  return (
    <AdminShell
      pathname="/admin/content"
      title="Contenido"
      description="Vista reservada para futuras colecciones, bloques reutilizables o integraciones de contenido externas."
    >
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 text-sm leading-6 text-slate-300 backdrop-blur">
        Hoy el contenido editable vive por seccion. Cuando agregues bloques compartidos o fuentes remotas,
        este modulo puede crecer sin tocar la estructura base de secciones. Si luego migras a API o DB,
        este es el punto natural para separar contenido compartido de configuracion local.
      </section>
    </AdminShell>
  );
}

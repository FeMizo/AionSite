import { AdminShell } from "@/src/components/admin/AdminShell";

export default function AdminContentPage() {
  return (
    <AdminShell
      pathname="/admin/content"
      title="Contenido"
      description="Vista reservada para futuras colecciones, bloques reutilizables o integraciones externas de contenido."
    >
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 text-sm leading-6 text-slate-300 backdrop-blur">
        Hoy el contenido editable vive por sección. Cuando agregues bloques compartidos o fuentes remotas,
        este módulo puede crecer sin tocar la estructura base de secciones. Si luego migras a API o base de datos,
        este es el punto natural para separar contenido compartido de configuración local.
      </section>
    </AdminShell>
  );
}

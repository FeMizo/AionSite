import { AdminShell } from "@/src/components/admin/AdminShell";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      pathname="/admin/settings"
      title="Configuracion"
      description="Notas operativas y de arquitectura para escalar el CMS sin reescribir el proyecto, manteniendo compatibilidad con export estatico."
    >
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
        <h3 className="text-lg font-semibold text-white">Como agregar una nueva seccion</h3>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <p>1. Define el tipo de datos en `src/cms/types.ts`.</p>
          <p>2. Agrega el contenido inicial en `src/cms/default-content.ts`.</p>
          <p>3. Registra metadata, placement y fields en `src/cms/registry.tsx`.</p>
          <p>4. Crea el componente visual en `src/components/sections` y conectalo en el renderer del registry.</p>
          <p>5. El dashboard lo detectara automaticamente en la lista y el home lo respetara por `enabled` y `order`.</p>
          <p>6. Mientras sigas con `output: "export"`, los cambios del panel viven en `localStorage` y no en un backend.</p>
        </div>
      </section>
    </AdminShell>
  );
}

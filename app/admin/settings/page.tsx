import { AdminShell } from "@/src/components/admin/AdminShell";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      pathname="/admin/settings"
      title="Configuración"
      description="Notas operativas y de arquitectura para escalar el CMS sin reescribir el proyecto."
    >
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
        <h3 className="text-lg font-semibold text-white">Cómo agregar una nueva sección</h3>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <p>1. Define el tipo de datos en `src/cms/types.ts`.</p>
          <p>2. Agrega el contenido inicial en `src/cms/default-content.ts`.</p>
          <p>3. Registra metadatos, ubicación y campos en `src/cms/registry.tsx`.</p>
          <p>4. Crea el componente visual en `src/components/sections` y conéctalo en el renderizador del registro.</p>
          <p>5. El panel lo detecta automáticamente en la lista y el sitio lo respeta por `enabled` y `sectionSequence`.</p>
          <p>6. En local, el guardado intenta persistir en archivo JSON y también guarda respaldo en localStorage.</p>
          <p>7. En deploy estático, el dashboard opera con fallback local por navegador.</p>
        </div>
      </section>
    </AdminShell>
  );
}

import { Eye, EyeOff, Layers3, ArrowUpDown } from "lucide-react";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { initialCmsContent } from "@/src/cms/site-content";

export default function AdminOverviewPage() {
  const content = initialCmsContent;
  const sections = Object.values(content.sections);
  const visibleCount = sections.filter((section) => section.enabled).length;
  const hiddenCount = sections.length - visibleCount;

  return (
    <AdminShell
      pathname="/admin"
      title="Resumen"
      description="Resumen del CMS local. Los cambios del panel se guardan en este navegador y no se publican automáticamente."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Secciones registradas", value: sections.length, icon: Layers3 },
          { label: "Secciones visibles", value: visibleCount, icon: Eye },
          { label: "Secciones ocultas", value: hiddenCount, icon: EyeOff },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{item.label}</p>
                <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-200">
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-6 text-4xl font-semibold text-white">{item.value}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-200">
              <ArrowUpDown size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Flujo operativo</h3>
              <p className="mt-1 text-sm text-slate-400">
                El panel funciona con almacenamiento local del navegador.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
            <p>1. La fuente base sigue en src/data/cms/site-content.json.</p>
            <p>2. El panel guarda cambios en localStorage.</p>
            <p>3. El sitio público los refleja en el mismo navegador.</p>
            <p>4. En producción estática, cada usuario ve sus propios cambios locales.</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Límite actual</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            El guardado no modifica archivos del repositorio ni sincroniza entre dispositivos.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}

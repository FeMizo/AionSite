import { Eye, EyeOff, Layers3, ArrowUpDown } from "lucide-react";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { initialCmsContent } from "@/src/cms/site-content";

export default function AdminOverviewPage() {
  const sections = Object.values(initialCmsContent.sections);
  const visibleCount = sections.filter((section) => section.enabled).length;
  const hiddenCount = sections.length - visibleCount;

  return (
    <AdminShell
      pathname="/admin"
      title="Overview"
      description="Resumen de la arquitectura CMS estatica. Los cambios del panel se guardan en este navegador para mantener compatibilidad con output export."
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
                El dashboard ahora es 100% compatible con export estatico.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
            <p>1. La fuente base sigue en src/data/cms/site-content.json.</p>
            <p>2. El panel guarda cambios en localStorage del navegador.</p>
            <p>3. El sitio publico los aplica al hidratarse en cliente.</p>
            <p>4. Cuando quieras persistencia real multiusuario, cambia esta capa por API o DB y quita output export.</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Limite actual</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            En modo export estatico no existe runtime servidor, asi que el panel no puede escribir archivos ni exponer API routes durante el deploy.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}

import { Eye, EyeOff, Layers3, ArrowUpDown } from "lucide-react";
import { AdminShell } from "@/src/components/admin/AdminShell";
import { readCmsContentFromFile } from "@/src/cms/file-storage";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const content = await readCmsContentFromFile();
  const sections = Object.values(content.sections);
  const visibleCount = sections.filter((section) => section.enabled).length;
  const hiddenCount = sections.length - visibleCount;

  return (
    <AdminShell
      pathname="/admin"
      title="Overview"
      description="Resumen de la arquitectura CMS del proyecto. Los cambios del panel se guardan en un archivo JSON central para todo el sitio."
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
                El dashboard ahora persiste contenido directamente en el CMS del proyecto.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
            <p>1. La fuente base sigue en src/data/cms/site-content.json.</p>
            <p>2. El panel guarda cambios por API hacia ese archivo.</p>
            <p>3. El sitio publico sincroniza el contenido mas reciente.</p>
            <p>4. Si luego necesitas multiusuario, puedes mover esta capa a DB sin cambiar el esquema CMS.</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Limite actual</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Esta persistencia requiere runtime de servidor Node.js para leer y escribir el archivo CMS.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}

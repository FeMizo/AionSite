import Link from "next/link";
import {
  ExternalLink,
  FileText,
  Layers3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Secciones", icon: Layers3 },
  { href: "/admin/content", label: "Contenido", icon: FileText },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
];

export function AdminShell({
  title,
  description,
  children,
  pathname,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  pathname: string;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_42%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#020617_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1820px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-white/8 bg-slate-950/60 p-6 shadow-[0_30px_60px_-40px_rgba(2,6,23,0.95)] backdrop-blur xl:block">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">
              AionSite CMS
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">
              Panel interno
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Administra visibilidad, orden y contenido desde una sola fuente de verdad.
            </p>
          </div>

          <nav className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-blue-500/15 text-white shadow-lg shadow-blue-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 xl:max-w-[1480px]">
          <header className="rounded-[2rem] border border-white/8 bg-slate-950/45 px-6 py-5 shadow-[0_28px_56px_-40px_rgba(2,6,23,0.95)] backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">
                  Panel
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400/40 hover:bg-white/5 hover:text-white"
              >
                Ver sitio público
                <ExternalLink size={14} />
              </a>
            </div>

            <nav className="mt-5 flex flex-wrap gap-2 xl:hidden">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-500/15 text-white"
                        : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

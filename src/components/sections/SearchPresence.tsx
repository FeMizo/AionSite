import { ArrowUpRight, CheckCircle2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const signals = [
  "Diseño web profesional",
  "Mantenimiento web mensual",
  "SEO local y técnico",
  "Tiendas en línea",
];

export function SearchPresence() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_90%_85%,rgba(30,64,175,0.28),transparent_28%)]" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-300">Visibilidad que se nota</p>
            <Heading as="h2" className="mt-5 max-w-3xl text-white">
              Un sitio premium no solo se ve bien. <span className="text-sky-300">Se encuentra.</span>
            </Heading>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Diseñamos cada presencia digital para responder a búsquedas reales: sitios web, mantenimiento, SEO, ecommerce y soluciones para negocios que necesitan crecer.
            </p>
            <a href="#contacto" className="mt-8 inline-flex items-center gap-2 border-b border-sky-300 pb-2 text-sm font-semibold text-sky-200 transition hover:border-white hover:text-white">
              Hablar de mi presencia digital <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_100px_-45px_rgba(56,189,248,0.7)] backdrop-blur-xl sm:p-8">
            <div className="absolute right-7 top-7 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300 text-slate-950"><Search size={19} /></span><div><p className="text-sm font-semibold">Señales de búsqueda</p><p className="text-xs text-slate-500">Arquitectura pensada para crecer</p></div></div>
              <Sparkles size={18} className="text-sky-300" />
            </div>
            <div className="mt-5 space-y-3">
              {signals.map((signal, index) => <div key={signal} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"><span className="font-mono text-xs text-sky-300">0{index + 1}</span><span className="flex-1 text-sm text-slate-200">{signal}</span><CheckCircle2 size={16} className="text-emerald-300" /></div>)}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-sky-300/15 bg-sky-300/[0.07] p-4 text-xs leading-5 text-sky-100"><ShieldCheck size={18} className="shrink-0 text-sky-300" />Base técnica, contenido útil y mejora continua para construir visibilidad orgánica sostenible.</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

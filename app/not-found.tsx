import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { getButtonClassName } from "@/src/components/ui/button-styles";

export const metadata: Metadata = {
  title: "Página no encontrada | AionSite",
  description: "La página que buscas no existe o fue movida. Regresa al inicio.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(124,58,237,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <Container className="relative flex w-full flex-col justify-center py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-xl">
            <p className="mb-6 font-mono text-xs tracking-[0.22em] text-blue-300">AIONSITE / RUTA NO ENCONTRADA</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              Esta página tomó otra ruta.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              El enlace no existe o fue movido. Regresa al inicio y continúa explorando el sitio.
            </p>
            <Link
              href="/"
              className={`${getButtonClassName({ variant: "primary", size: "lg" })} mt-9 min-h-12 gap-2`}
            >
              Regresar al inicio
            </Link>
          </div>

          <div className="relative flex min-h-[18rem] items-center justify-center sm:min-h-[25rem]">
            <div className="absolute h-56 w-56 rounded-full border border-blue-300/20 sm:h-80 sm:w-80" />
            <div className="absolute h-40 w-40 rounded-full border border-white/10 sm:h-56 sm:w-56" />
            <div className="absolute h-24 w-24 rounded-full bg-blue-400/10 blur-2xl sm:h-40 sm:w-40" />
            <p className="relative font-display text-[clamp(7rem,22vw,15rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.08]">
              404
            </p>
            <span className="absolute bottom-4 right-[12%] rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-slate-500 backdrop-blur">
              SIGNAL LOST
            </span>
          </div>
        </div>
      </Container>
    </main>
  );
}

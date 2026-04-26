import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { getButtonClassName } from "@/src/components/ui/button-styles";

export const metadata: Metadata = {
  title: "Página no encontrada | AionSite",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-150 w-150 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* 404 number */}
        <p className="font-display text-[10rem] font-bold leading-none tracking-tight text-white/5 select-none sm:text-[14rem]">
          404
        </p>

        <div className="-mt-8 space-y-4">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Página no encontrada
          </h1>
          <p className="mx-auto max-w-md text-base text-slate-400">
            La página que buscas no existe o fue movida. Vuelve al inicio para
            continuar.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/" className={getButtonClassName({ variant: "primary", size: "lg" })}>
            Volver al inicio
          </Link>
          <Link href="/#contacto" className={getButtonClassName({ variant: "outline", size: "lg" })}>
            Contactar soporte
          </Link>
        </div>
      </Container>
    </main>
  );
}

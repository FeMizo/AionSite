import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/src/components/ui/Container";
import { SiteFooter } from "@/src/components/sections/SiteFooter";

type LegalSection = {
  title: string;
  content: ReactNode;
};

export function LegalPage({
  title,
  subtitle,
  sections,
  updatedAt,
}: {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  updatedAt: string;
}) {
  return (
    <>
      <main className="min-h-screen bg-slate-950 py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">Aviso legal</p>
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{subtitle}</p>
            <p className="mt-3 text-sm text-slate-500">Ultima actualizacion: {updatedAt}</p>

            <div className="mt-12 space-y-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.2)] md:p-8"
                >
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <div className="mt-4 text-base leading-7 text-slate-300 [&_a]:text-cyan-400 [&_a]:underline [&_a]:underline-offset-4">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
                Volver al inicio
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

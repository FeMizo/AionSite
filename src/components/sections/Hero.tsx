"use client";

import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";

export function Hero({
  data,
  headerData,
}: {
  data: HeroSectionData;
  headerData: HeaderSectionData;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute right-0 top-40 -z-10 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />

      <Container className="text-center">
        <div className="animate-fade-in mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-blue-400">
          Diseno web de alto impacto
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-7xl">
          {data.title}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
          {data.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={() => window.open(headerData.whatsappLink, "_blank")}>
            {data.primaryCTA}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              document.getElementById("portafolio")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {data.secondaryCTA}
          </Button>
        </div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-slate-500">
            Nuestro compromiso
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-slate-300">
            {data.trustBar.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
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
        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)]">
          <Sparkles size={14} />
          {data.badgeText}
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-7xl">
          {data.title}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
          {data.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => window.open(headerData.whatsappLink, "_blank")}
          >
            <MessageCircleMore size={18} />
            {data.primaryCTA}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() =>
              document
                .getElementById("portafolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {data.secondaryCTA}
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <p className="mb-6 text-xl font-medium uppercase tracking-widest text-slate-500">
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
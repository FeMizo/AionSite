"use client";

import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-40 right-0 -z-10 h-[400px] w-[400px] bg-violet-600/10 blur-[100px] rounded-full" />

      <Container className="text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-blue-400 mb-8 animate-fade-in">
          ✨ Diseño web de alto impacto
        </div>
        
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.1]">
          {siteData.hero.data.title}
        </h1>
        
        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
          {siteData.hero.data.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={() => window.open(siteData.header.data.whatsappLink, "_blank")}>
            {siteData.hero.data.primaryCTA}
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth' })}>
            {siteData.hero.data.secondaryCTA}
          </Button>
        </div>

        {/* Trust Bar */}
        <div className="mt-20 border-t border-white/5 pt-10">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-6">
            Nuestro compromiso
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-300 font-medium">
            {siteData.hero.data.trustBar.map((item) => (
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
};

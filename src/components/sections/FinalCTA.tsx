"use client";

import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";

export const FinalCTA = () => {
  return (
    <section id="contacto" className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[3rem] bg-blue-600 px-8 py-20 text-center md:px-16">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <h2 className="text-4xl font-bold text-white md:text-6xl mb-8">
            {siteData.finalCTA.data.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
            {siteData.finalCTA.data.subtitle}
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.open(siteData.finalCTA.data.whatsappLink, "_blank")}
            >
              {siteData.finalCTA.data.buttonText}
            </Button>
            <div className="flex items-center gap-2 text-blue-100 font-medium">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              {siteData.finalCTA.data.responseText}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
"use client";

import type { FinalCTASectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";

export function FinalCTA({ data }: { data: FinalCTASectionData }) {
  return (
    <section id="contacto" className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[3rem] bg-blue-600 px-8 py-20 text-center md:px-16">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <h2 className="mb-8 text-4xl font-bold text-white md:text-6xl">
            {data.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
            {data.subtitle}
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.open(data.whatsappLink, "_blank")}
            >
              {data.buttonText}
            </Button>
            <div className="flex items-center gap-2 font-medium text-blue-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              {data.responseText}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

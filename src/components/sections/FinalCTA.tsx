"use client";

import { MessageCircleMore } from "lucide-react";
import type { FinalCTASectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";

export function FinalCTA({ data }: { data: FinalCTASectionData }) {
  return (
    <section id="contacto" className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[3rem] border border-blue-300/30 bg-blue-600 px-8 py-20 text-center shadow-[0_34px_68px_-36px_rgba(30,64,175,0.76)] md:px-16">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <h2 className="mb-8 text-cta-fluid font-display font-bold text-white">
            {data.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
            {data.subtitle}
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className="gap-2 border border-white/45 bg-white text-blue-600 shadow-[0_20px_36px_-20px_rgba(15,23,42,0.68)] hover:bg-blue-50"
              onClick={() => window.open(data.whatsappLink, "_blank")}
            >
              <MessageCircleMore size={18} />
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

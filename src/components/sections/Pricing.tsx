"use client";

import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Button } from "@/src/components/ui/Button";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section id="paquetes" className="py-24 bg-slate-950">
      <Container>
        <SectionHeading
          title="Paquetes a tu medida"
          subtitle="Inversiones inteligentes para negocios que buscan crecer."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {siteData.pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.recommended
                  ? "bg-slate-900 border-blue-600 shadow-2xl shadow-blue-600/10"
                  : "bg-slate-900/50 border-white/5"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-widest">
                  Recomendado
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>
              
              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-400">
                    <Check size={18} className="text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                className="w-full"
                onClick={() => window.open(siteData.whatsappLink, "_blank")}
              >
                Consultar
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

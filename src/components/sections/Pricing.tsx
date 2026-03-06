"use client";

import { Check } from "lucide-react";
import type { HeaderSectionData, PricingSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Pricing({
  data,
  headerData,
}: {
  data: PricingSectionData;
  headerData: HeaderSectionData;
}) {
  const plans = data;
  const plansCount = plans.length;
  const gridColsClass =
    plansCount <= 1
      ? "grid-cols-1"
      : plansCount === 2
        ? "sm:grid-cols-2"
        : plansCount === 3
          ? "md:grid-cols-3"
          : plansCount === 4
            ? "sm:grid-cols-2 xl:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <section id="paquetes" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Paquetes a tu medida"
          subtitle="Inversiones inteligentes para negocios que buscan crecer."
        />

        <div className={`grid gap-8 ${gridColsClass}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.recommended
                  ? "border-blue-600 bg-slate-900 shadow-2xl shadow-blue-600/10 hover:shadow-blue-500/25"
                  : "border-white/5 bg-slate-900/50 hover:border-white/15 hover:shadow-slate-950/40"
              }`}
            >
              {plan.recommended ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Recomendado
                </div>
              ) : null}
              <h3 className="mb-2 text-lg font-bold text-white">{plan.name}</h3>
              <div className="mb-6 text-2xl font-bold text-white">{plan.price}</div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <Check size={18} className="text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                className="w-full"
                onClick={() => window.open(headerData.whatsappLink, "_blank")}
              >
                Consultar
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Check, MessageCircleMore } from "lucide-react";
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
              className={`relative flex flex-col rounded-3xl border p-8 shadow-[0_26px_52px_-36px_rgba(2,6,23,0.95)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_58px_-34px_rgba(30,64,175,0.42)] ${
                plan.recommended
                  ? "border-blue-500/60 bg-slate-900 shadow-[0_26px_54px_-34px_rgba(37,99,235,0.44)] hover:border-blue-400/70 hover:shadow-[0_34px_60px_-32px_rgba(59,130,246,0.52)]"
                  : "border-white/10 bg-slate-900/50 hover:border-white/20"
              }`}
            >
              {plan.recommended ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-blue-300/30 bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-[0_16px_28px_-18px_rgba(59,130,246,0.85)]">
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
                className="w-full gap-2"
                onClick={() => window.open(headerData.whatsappLink, "_blank")}
              >
                <MessageCircleMore size={16} />
                Consultar
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

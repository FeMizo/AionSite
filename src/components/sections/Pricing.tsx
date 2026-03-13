"use client";

import { Check, MessageCircleMore, Rocket, Star } from "lucide-react";
import type { HeaderSectionData, PricingSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

function getPriceParts(rawPrice: string) {
  const cleaned = rawPrice.trim();
  let working = cleaned;
  let prefix = "";
  let suffix = "/ proyecto";

  if (/^desde\s+/i.test(working)) {
    prefix = "Desde";
    working = working.replace(/^desde\s+/i, "").trim();
  }

  if (/\/\s*mes/i.test(working)) {
    suffix = "/ mes";
    working = working.replace(/\/\s*mes/i, "").trim();
  } else if (/\/\s*proyecto/i.test(working)) {
    suffix = "/ proyecto";
    working = working.replace(/\/\s*proyecto/i, "").trim();
  }

  return {
    prefix,
    amount: working,
    suffix,
  };
}

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
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <section id="paquetes" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Paquetes a tu medida"
          subtitle="Inversiones inteligentes para negocios que buscan crecer."
        />

        <div className={`grid gap-8 ${gridColsClass}`}>
          {plans.map((plan) => {
            const priceParts = getPriceParts(plan.price);
            const isBasic = /esencial/i.test(plan.name);
            const isAdvanced =
              /comercio|electr[oó]nico|e-?commerce|tienda/i.test(plan.name);
            const tierLabel = plan.recommended
              ? "Más elegido"
              : isBasic
                ? "Plan base"
                : isAdvanced
                  ? "Plan avanzado"
                  : "Plan escalable";
            const buttonLabel = plan.recommended
              ? "Cotizar ahora"
              : /mantenimiento/i.test(plan.name)
                ? "Hablar por WhatsApp"
                : "Consultar proyecto";
            const ActionIcon = plan.recommended ? Rocket : MessageCircleMore;
            const shownFeatures = plan.features.slice(0, 5);

            return (
              <article
                key={plan.name}
                className={`group relative flex h-full flex-col rounded-3xl border p-7 shadow-[0_24px_50px_-34px_rgba(2,6,23,0.95)] transition-all duration-300 lg:p-8 ${
                  plan.recommended
                    ? "border-blue-500/60 bg-slate-900 shadow-[0_28px_56px_-34px_rgba(37,99,235,0.46)] hover:-translate-y-1 hover:border-blue-400/80 hover:shadow-[0_38px_64px_-32px_rgba(59,130,246,0.52)]"
                    : isAdvanced
                      ? "border-cyan-300/25 bg-slate-900/65 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_32px_58px_-34px_rgba(14,116,144,0.4)]"
                      : "border-white/10 bg-slate-900/50 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_30px_56px_-34px_rgba(15,23,42,0.9)]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/3 via-transparent to-transparent" />

                {plan.recommended ? (
                  <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-blue-200/40 bg-linear-to-r from-blue-500 to-blue-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_28px_-18px_rgba(59,130,246,0.85)]">
                    <Star size={12} />
                    Recomendado
                  </div>
                ) : null}

                <header className="relative mb-7 space-y-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      plan.recommended
                        ? "border-blue-300/35 bg-blue-500/15 text-blue-200"
                        : "border-white/12 bg-white/5 text-slate-400"
                    }`}
                  >
                    {tierLabel}
                  </span>

                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>

                  <div className="space-y-2">
                    {priceParts.prefix ? (
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {priceParts.prefix}
                      </p>
                    ) : null}
                    <p className="text-4xl font-semibold leading-none tracking-tight text-white">
                      {priceParts.amount}
                    </p>
                    <p className="text-sm text-slate-400">
                      {priceParts.suffix}
                    </p>
                  </div>
                </header>

                <ul className="mb-8 flex-1 space-y-3.5">
                  {shownFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/35 bg-blue-500/12 text-blue-300">
                        <Check size={13} />
                      </span>
                      <span className="leading-6">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.recommended ? "primary" : "outline"}
                  className={`w-full gap-2 ${
                    plan.recommended
                      ? "shadow-[0_20px_34px_-20px_rgba(37,99,235,0.75)]"
                      : ""
                  }`}
                  onClick={() => window.open(headerData.whatsappLink, "_blank")}
                >
                  <ActionIcon size={16} />
                  {buttonLabel}
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

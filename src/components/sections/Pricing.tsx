"use client";

import { motion } from "motion/react";
import type { HeaderSectionData, PricingSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { PricingCard } from "@/src/components/ui/PricingCard";
import { CONTAINER_ANIMATION_VARIANTS, FADE_UP_ANIMATION_VARIANTS } from "@/src/lib/animations";

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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={CONTAINER_ANIMATION_VARIANTS}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <SectionHeading
              title="Paquetes a tu medida"
              subtitle="Inversiones inteligentes para negocios que buscan crecer."
            />
          </motion.div>

          <motion.div 
            variants={CONTAINER_ANIMATION_VARIANTS}
            className={`grid gap-8 ${gridColsClass}`}
          >
            {plans.map((plan) => (
              <PricingCard 
                key={plan.name} 
                plan={plan} 
                whatsappLink={headerData.whatsappLink} 
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { CONTAINER_ANIMATION_VARIANTS, FADE_UP_ANIMATION_VARIANTS } from "@/src/lib/animations";

export function Hero({
  data,
  headerData,
}: {
  data: HeroSectionData;
  headerData: HeaderSectionData;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="absolute left-1/2 top-0 -z-10 h-150 w-200 -translate-x-1/2 rounded-full bg-blue-600/18 blur-[130px]" />

      <Container className="text-center">
        <motion.div
          variants={CONTAINER_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)]"
          >
            <Sparkles size={14} />
            {data.badgeText}
          </motion.div>

          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mx-auto max-w-4xl text-display font-display font-bold text-white"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full"
          >
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
          </motion.div>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-20 border-t border-white/5 pt-10 w-full"
          >
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-400">
              {data.trustBar.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-blue-500/70" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

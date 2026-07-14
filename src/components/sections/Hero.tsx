"use client";

import { MouseEvent, useEffect, useState } from "react";
import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import {
  CONTAINER_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/src/lib/animations";

const signalWords = ["SEO", "IA", "CMS", "Leads", "Speed", "Ventas"];

export function Hero({
  data,
  headerData,
}: {
  data: HeroSectionData;
  headerData: HeaderSectionData;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [city, setCity] = useState("Cancun");

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setCity(data.city))
      .catch(() => setCity("Cancun"));
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(820px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.16), transparent 78%)`;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="absolute inset-x-0 top-0 -z-20 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.24),transparent_42%),linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)]" />
      <div className="absolute left-1/2 top-20 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-blue-300/10" />
      <div className="absolute left-1/2 top-32 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-violet-300/10" />

      <Container className="relative z-10">
        <motion.div
          variants={CONTAINER_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-12 xl:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] xl:items-center"
        >
          <div className="flex flex-col items-start">
            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)] backdrop-blur-sm"
            >
              <Sparkles size={14} />
              Agencia de diseño web en {city}
            </motion.div>

            <motion.h1
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="max-w-5xl text-display font-display font-bold text-white"
            >
              {data.title}
            </motion.h1>

            <motion.p
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <Button
                size="lg"
                className="gap-2 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-shadow hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)]"
                onClick={() => window.open(headerData.whatsappLink, "_blank")}
              >
                <MessageCircleMore size={18} />
                {data.primaryCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 backdrop-blur-sm"
                onClick={() =>
                  window.open(
                    "https://wa.me/5219381573988?text=Hola%20AionSite%2C%20me%20gustaria%20solicitar%20una%20auditoria%20gratuita%20de%20mi%20sitio.",
                    "_blank",
                  )
                }
              >
                <ArrowRight size={16} />
                {data.secondaryCTA}
              </Button>
            </motion.div>

            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="mt-14 border-t border-white/8 pt-8"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-400">
                {data.trustBar.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_40px_90px_-54px_rgba(59,130,246,0.9)] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.16),transparent_35%,rgba(124,58,237,0.16)),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.22),transparent_28%)]" />
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs uppercase tracking-[0.22em] text-slate-400">
              <span>AionSite engine</span>
              <span className="text-blue-300">Live</span>
            </div>

            <div className="relative z-10 mt-8 grid gap-4">
              {signalWords.map((word, index) => (
                <motion.div
                  key={word}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-5 py-4"
                  animate={{ x: index % 2 === 0 ? [0, 8, 0] : [0, -8, 0] }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {word}
                  </span>
                  <span className="mx-4 h-px flex-1 bg-linear-to-r from-blue-400/70 to-transparent" />
                  <span className="text-sm text-slate-400">
                    {index % 2 === 0 ? "atrae" : "convierte"}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute bottom-5 right-5 z-10 flex h-24 w-24 items-center justify-center rounded-full border border-blue-300/25 bg-blue-500/10 text-center font-display text-sm font-semibold text-blue-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              24/7
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { MouseEvent, useEffect, useState } from "react";
import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [city, setCity] = useState("Cancún");

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setCity(data.city))
      .catch(() => setCity("Cancún"));
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.15), transparent 80%)`;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-48"
    >
      {/* Dynamic spotlight that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      <Container className="text-center relative z-10">
        <motion.div
          variants={CONTAINER_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)] backdrop-blur-sm"
          >
            <Sparkles size={14} />
            Agencia de diseño web en {city}
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
                window.open("https://wa.me/5219381573988?text=Hola%20AionSite%2C%20me%20gustaria%20solicitar%20una%20auditoria%20gratuita%20de%20mi%20sitio.", "_blank")
              }
            >
              <MessageCircleMore size={16} />
              {data.secondaryCTA}
            </Button>
          </motion.div>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-20 border-t border-white/5 pt-10 w-full"
          >
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-400">
              {data.trustBar.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
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

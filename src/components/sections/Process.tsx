"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-40px" } as const;

export function Process({ data }: { data: ProcessSectionData }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 68%", "end 42%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const orbTop = useTransform(lineScale, [0, 1], ["0%", "100%"]);
  const processWordX = useTransform(lineScale, [0, 1], [120, -120]);
  const beamX = useTransform(lineScale, [0, 1], ["-18%", "18%"]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900/30 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(124,58,237,0.14),transparent_32%)]" />
      <motion.div
        className="pointer-events-none absolute -right-28 top-28 z-0 hidden font-display text-[13rem] font-bold uppercase leading-none text-white/[0.035] md:block"
        style={{ x: processWordX }}
      >
        Proceso
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[-20%] top-24 z-0 h-28 w-[140%] -rotate-6 bg-linear-to-r from-transparent via-cyan-300/10 to-transparent blur-sm"
        style={{ x: beamX }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <SectionHeading
            title="Nuestro proceso"
            subtitle="Metodología ágil diseñada para garantizar el éxito de tu proyecto."
            centered={false}
          />
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div
            className="absolute left-8 top-0 h-full w-[3px] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_28px_rgba(59,130,246,0.75)] md:left-1/2"
            style={{ scaleY: reduce ? 1 : lineScale }}
          />
          {!reduce ? (
            <motion.div
              className="absolute left-8 z-20 h-10 w-10 -translate-x-1/2 rounded-full border border-cyan-200/50 bg-blue-500/20 shadow-[0_0_34px_10px_rgba(59,130,246,0.35)] backdrop-blur-md md:left-1/2"
              style={{ top: orbTop }}
            >
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
            </motion.div>
          ) : null}

          <div className="space-y-12">
            {data.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  className="absolute left-8 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200/50 bg-slate-950 ring-4 ring-blue-500/20 shadow-[0_0_22px_3px_rgba(59,130,246,0.55)] md:left-1/2"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
                </motion.div>

                <div className="w-full pl-16 md:w-1/2 md:pl-0">
                  <motion.div
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_28px_70px_-48px_rgba(59,130,246,0.85)] backdrop-blur-sm ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                    initial={{
                      opacity: 0,
                      x: reduce ? 0 : index % 2 === 0 ? 40 : -40,
                      rotate: reduce ? 0 : index % 2 === 0 ? 1.5 : -1.5,
                    }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    whileHover={reduce ? undefined : { y: -6, scale: 1.015 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(37,99,235,0.18),transparent_42%,rgba(124,58,237,0.12))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-blue-300/15 transition-transform duration-500 group-hover:scale-125" />
                    <span className="relative mb-4 block font-display text-5xl font-bold text-blue-300/50">
                      {item.step}
                    </span>
                    <h3 className="relative mb-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="relative text-slate-400">{item.description}</p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

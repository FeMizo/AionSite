"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-40px" } as const;

export function Process({ data }: { data: ProcessSectionData }) {
  const reduce = useReducedMotion();

  return (
    <section id="proceso" className="bg-slate-900/30 py-24">
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
          <div className="absolute left-8 top-0 h-full w-px bg-blue-900/70 md:left-1/2" />

          <div className="space-y-12">
            {data.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-blue-500 ring-4 ring-blue-500/25 shadow-[0_0_14px_2px_rgba(59,130,246,0.45)] md:left-1/2"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
                />

                <div className="w-full pl-16 md:w-1/2 md:pl-0">
                  <motion.div
                    className={`rounded-2xl border border-white/5 bg-slate-900 p-8 ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                    initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <span className="mb-4 block font-display text-4xl font-bold text-blue-400/45">
                      {item.step}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
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

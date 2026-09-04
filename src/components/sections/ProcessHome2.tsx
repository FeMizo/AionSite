"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Compass, Lightbulb, Palette, Rocket, Wrench } from "lucide-react";
import { useState } from "react";
import type { ComponentType } from "react";
import type { ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const ease = [0.22, 1, 0.36, 1] as const;
const icons: ComponentType<{ size?: number }>[] = [Compass, Lightbulb, Palette, Wrench, Rocket];

export function ProcessHome2({ data }: { data: ProcessSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeItem = data[activeIndex] ?? data[0];
  const ActiveIcon = icons[activeIndex % icons.length] ?? Compass;

  if (!activeItem) return null;

  function selectStep(index: number) {
    setDirection(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function moveStep(nextDirection: number) {
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + data.length) % data.length);
  }

  return (
    <section id="proceso" className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.12),transparent_32%)]" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 max-w-2xl md:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">Como trabajamos</p>
          <Heading as="h2" className="mt-4 text-white">Nuestro proceso</Heading>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">Metodologia agil disenada para garantizar el exito de tu proyecto.</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <span className="font-mono text-sm text-blue-300">Paso {activeItem.step}</span>
              <span className="font-mono text-xs tracking-[0.2em] text-slate-500">0{activeIndex + 1} / 0{data.length}</span>
            </div>

            <div className="relative min-h-[270px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 p-7 shadow-[0_30px_90px_-58px_rgba(59,130,246,0.9)] backdrop-blur-sm sm:p-10">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-blue-300/15" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={activeItem.step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 42 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -42 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/30 bg-blue-500/15 text-blue-200">
                    <ActiveIcon size={25} />
                  </div>
                  <Heading as="h3" className="mt-8 text-white">{activeItem.title}</Heading>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">{activeItem.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" onClick={() => moveStep(-1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-blue-300/50 hover:bg-blue-500/10 hover:text-white" aria-label="Paso anterior">
                <ArrowLeft size={18} />
              </button>
              <div className="flex flex-1 items-center justify-center gap-2" role="tablist" aria-label="Pasos del proceso">
                {data.map((item, index) => (
                  <button key={item.step} type="button" onClick={() => selectStep(index)} role="tab" aria-selected={index === activeIndex} aria-label={`Ir al paso ${item.step}`} className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-blue-300" : "w-2 bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button type="button" onClick={() => moveStep(1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-blue-300/50 hover:bg-blue-500/10 hover:text-white" aria-label="Siguiente paso">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.map((item, index) => {
                const Icon = icons[index % icons.length] ?? Compass;
                const active = index === activeIndex;
                return (
                  <motion.button
                    key={item.step}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectStep(index)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative z-10 flex min-h-36 flex-col items-start justify-between rounded-2xl border p-5 text-left transition-colors sm:min-h-40 ${active ? "border-blue-300/55 bg-blue-500/15 text-white shadow-[0_20px_50px_-34px_rgba(59,130,246,0.95)]" : "border-white/10 bg-slate-900/80 text-slate-400 hover:border-blue-300/35 hover:text-white"} ${index === data.length - 1 && data.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${active ? "border-blue-200/40 bg-blue-300/15 text-blue-200" : "border-white/10 bg-white/[0.03] text-slate-500"}`}><Icon size={18} /></span>
                    <span><span className="block font-mono text-xs text-blue-300">{item.step}</span><span className="mt-2 block text-sm font-medium leading-snug">{item.title}</span></span>
                    {active ? <Check size={15} className="absolute right-4 top-4 text-blue-200" /> : null}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

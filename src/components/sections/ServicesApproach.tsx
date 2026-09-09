"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Globe, ShoppingBag, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import type { ServicesSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const ease = [0.22, 1, 0.36, 1] as const;
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const iconMap: Record<string, ComponentType<IconProps>> = { Globe, Target, ShoppingBag, TrendingUp, Bot, Zap };
const positions = [
  { left: "50%", top: "4%" },
  { left: "90%", top: "28%" },
  { left: "82%", top: "78%" },
  { left: "50%", top: "96%" },
  { left: "18%", top: "78%" },
  { left: "10%", top: "28%" },
];

export function ServicesApproach({ data }: { data: ServicesSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const activeService = data[activeIndex] ?? data[0];
  if (!activeService) return null;

  const ActiveIcon = iconMap[activeService.icon] ?? Globe;
  const rotation = reduce ? 0 : -activeIndex * 60;

  return (
    <section id="servicios" className="overflow-hidden bg-slate-950 text-white">
      <Container className="py-24 lg:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }} className="mb-12 md:mb-16">
          <Heading as="h2" className="max-w-4xl text-white"><span className="block">Diseno web, IA y automatizacion</span><span className="block text-blue-300">para negocios</span></Heading>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,1.22fr)] lg:gap-16">
          <motion.div key={activeService.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} className="order-2 min-w-0 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">Explora nuestros servicios</p>
            <p className="mt-5 text-sm leading-6 text-slate-400">Selecciona un nodo para llevarlo al centro y conocer cómo puede ayudarte.</p>
            <div className="mt-8 grid gap-3 grid-cols-2">
              {data.map((service, index) => {
                const Icon = iconMap[service.icon] ?? Globe;
                const isActive = index === activeIndex;
                return <motion.button key={service.title} type="button" onClick={() => setActiveIndex(index)} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3, ease }} className={`flex min-h-16 min-w-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-[border-color,background-color,color,opacity] duration-500 ${isActive ? "border-blue-300/50 bg-blue-500/15 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 opacity-60 hover:border-blue-300/30 hover:text-white"}`} aria-pressed={isActive}><Icon size={18} className={isActive ? "shrink-0 text-blue-200" : "shrink-0 text-slate-500"} /><span className="min-w-0 break-words text-sm font-medium">{service.title}</span></motion.button>;
              })}
            </div>
          </motion.div>

          <div className="order-1 relative mx-auto aspect-square w-full max-w-[620px] lg:order-2">
            <div className="absolute inset-[7%] rounded-full border border-white/10" />
            <div className="absolute inset-[19%] rounded-full border border-white/10" />
            <motion.div className="absolute inset-0" animate={{ rotate: rotation }} transition={{ duration: reduce ? 0 : 0.85, ease }}>
              <div className="absolute left-1/2 top-1/2 h-px w-[38%] origin-left bg-gradient-to-r from-blue-300/50 to-transparent" />
              {data.map((service, index) => {
                const Icon = iconMap[service.icon] ?? Globe;
                const isActive = index === activeIndex;
                const point = positions[index % positions.length];
                return <div key={service.title} className="absolute -translate-x-1/2 -translate-y-1/2" style={point}><motion.button type="button" onClick={() => setActiveIndex(index)} animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.08 : 0.9, rotate: -rotation }} transition={{ duration: reduce ? 0 : 0.7, ease }} className="group flex min-w-20 flex-col items-center gap-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950" aria-label={`Ver servicio: ${service.title}`} aria-pressed={isActive}><span className={`flex h-14 w-14 items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-500 sm:h-16 sm:w-16 ${isActive ? "border-blue-200 bg-blue-200 text-slate-950 shadow-[0_0_38px_-10px_rgba(147,197,253,0.95)]" : "border-white/20 bg-slate-900/90 text-slate-400 group-hover:border-blue-300/50 group-hover:text-blue-200"}`}><Icon size={isActive ? 24 : 21} /></span><span className={`max-w-28 break-words text-xs leading-tight transition-colors duration-500 sm:text-sm ${isActive ? "font-semibold text-blue-100" : "font-medium text-slate-400"}`}>{service.title}</span></motion.button></div>;
              })}
            </motion.div>

            <motion.div key={activeService.title} initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.55, ease }} className="absolute left-1/2 top-1/2 w-[min(64%,360px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/15 bg-slate-950/90 p-3 md:p-5 text-left shadow-[0_24px_80px_-35px_rgba(59,130,246,0.8)] backdrop-blur-md sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-2 md:pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-300/40 bg-blue-500/15 text-blue-200">
                    <ActiveIcon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">Servicio {String(activeIndex + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 break-words font-display text-base font-semibold leading-tight text-white sm:text-lg">{activeService.title}</h3>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-blue-300/30 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-blue-200 hidden md:block">Activo</span>
              </div>
              <p className="mt-3 md:mt-5 break-words text-sm leading-6 text-slate-300 sm:text-base">{activeService.description}</p>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-blue-300" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.7, ease }} /></div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

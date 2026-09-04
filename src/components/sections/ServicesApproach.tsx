"use client";

import { motion } from "framer-motion";
import { Bot, Globe, ShoppingBag, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import type { ServicesSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const ease = [0.22, 1, 0.36, 1] as const;

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const iconMap: Record<string, ComponentType<IconProps>> = {
  Globe,
  Target,
  ShoppingBag,
  TrendingUp,
  Bot,
  Zap,
};

const positions = [
  { label: { left: "50%", top: "6%" }, line: { x2: "50", y2: "33" } },
  { label: { left: "91%", top: "36%" }, line: { x2: "70", y2: "43" } },
  { label: { left: "75%", top: "87%" }, line: { x2: "65", y2: "68" } },
  { label: { left: "13%", top: "72%" }, line: { x2: "35", y2: "63" } },
  { label: { left: "9%", top: "32%" }, line: { x2: "30", y2: "42" } },
  { label: { left: "50%", top: "94%" }, line: { x2: "50", y2: "67" } },
];

export function ServicesApproach({ data }: { data: ServicesSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = data[activeIndex] ?? data[0];
  const ActiveIcon = iconMap[activeService?.icon] ?? Globe;

  if (!activeService) return null;

  return (
    <section id="servicios" className="overflow-hidden bg-slate-950 text-white">
      <Container className="py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 flex items-start gap-4 md:mb-20"
        >
          <Heading as="h2" className="text-white">
            <span className="block">Diseno web, IA y automatizacion</span>
            <span className="block text-blue-300">para negocios</span>
          </Heading>
        </motion.div>

        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1">
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="max-w-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/30 bg-blue-500/15 text-blue-200">
                <ActiveIcon size={24} />
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-blue-300">
                Servicio 0{activeIndex + 1}
              </p>
              <Heading as="h3" className="mt-4 text-white">
                {activeService.title}
              </Heading>
              <p className="mt-6 max-w-lg text-lg leading-[1.58] text-white/90">
                {activeService.description}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {data.map((service, index) => {
                const Icon = iconMap[service.icon] ?? Globe;
                const isActive = index === activeIndex;
                return (
                  <motion.button
                    key={service.title}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveIndex(index)}
                    className={`flex min-h-16 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${isActive ? "border-blue-300/50 bg-blue-500/15 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-300/30 hover:text-white"}`}
                    aria-pressed={isActive}
                  >
                    <Icon size={18} className={isActive ? "text-blue-200" : "text-slate-500"} />
                    <span className="text-sm font-medium">{service.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative mx-auto aspect-square w-full max-w-[360px] shrink-0 sm:max-w-[430px] lg:max-w-[480px]"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.18" opacity="0.45" />
              {data.map((service, index) => {
                const point = positions[index % positions.length];
                const isActive = index === activeIndex;
                return (
                  <motion.line
                    key={service.title}
                    x1="50"
                    y1="50"
                    x2={point.line.x2}
                    y2={point.line.y2}
                    stroke={isActive ? "#93c5fd" : "white"}
                    strokeWidth={isActive ? 0.6 : 0.18}
                    opacity={isActive ? 1 : 0.45}
                    animate={{ opacity: isActive ? 1 : 0.45, strokeWidth: isActive ? 0.6 : 0.18 }}
                    transition={{ duration: 0.55, ease }}
                  />
                );
              })}
              <circle cx="50" cy="50" r="1.3" fill="#93c5fd" />
            </svg>

            {data.map((service, index) => {
              const point = positions[index % positions.length];
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={service.title}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.45 + index * 0.12, ease }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute max-w-[42%] -translate-x-1/2 -translate-y-1/2 text-center text-xs leading-tight tracking-[-0.01em] transition-colors sm:text-sm lg:text-base ${isActive ? "font-bold text-blue-200" : "font-light text-white hover:text-blue-200"}`}
                  style={point.label}
                  aria-label={`Ver servicio: ${service.title}`}
                >
                  {service.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

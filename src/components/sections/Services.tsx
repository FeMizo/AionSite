import type { ComponentType } from "react";
import { Bot, Globe, ShoppingBag, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { ServicesSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { CONTAINER_ANIMATION_VARIANTS, FADE_UP_ANIMATION_VARIANTS } from "@/src/lib/animations";

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  Globe,
  Target,
  ShoppingBag,
  TrendingUp,
  Bot,
  Zap,
};

const iconColors: Record<string, { container: string; hover: string }> = {
  Globe: {
    container: "border-blue-400/25 bg-blue-600/10 text-blue-300 shadow-[0_10px_24px_-18px_rgba(59,130,246,0.85)]",
    hover: "group-hover:bg-blue-600",
  },
  Target: {
    container: "border-sky-400/25 bg-sky-600/10 text-sky-300 shadow-[0_10px_24px_-18px_rgba(14,165,233,0.8)]",
    hover: "group-hover:bg-sky-600",
  },
  ShoppingBag: {
    container: "border-indigo-400/25 bg-indigo-600/10 text-indigo-300 shadow-[0_10px_24px_-18px_rgba(99,102,241,0.8)]",
    hover: "group-hover:bg-indigo-600",
  },
  TrendingUp: {
    container: "border-cyan-400/25 bg-cyan-600/10 text-cyan-300 shadow-[0_10px_24px_-18px_rgba(6,182,212,0.8)]",
    hover: "group-hover:bg-cyan-600",
  },
  Bot: {
    container: "border-violet-400/25 bg-violet-600/10 text-violet-300 shadow-[0_10px_24px_-18px_rgba(139,92,246,0.8)]",
    hover: "group-hover:bg-violet-600",
  },
  Zap: {
    container: "border-amber-400/25 bg-amber-600/10 text-amber-300 shadow-[0_10px_24px_-18px_rgba(245,158,11,0.8)]",
    hover: "group-hover:bg-amber-600",
  },
};

export function Services({ data }: { data: ServicesSectionData }) {
  return (
    <section id="servicios" className="bg-slate-950 py-24">
      <Container>
        <motion.div 
          variants={CONTAINER_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-12 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-start xl:gap-20"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <h2 className="text-heading-fluid font-display font-bold text-white">
              Diseño web, IA y automatización para negocios
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate-400">
              Desde SEO técnico y ecommerce modular hasta IA y automatización, construimos la infraestructura digital que tu negocio necesita para crecer.
            </p>
          </motion.div>

          <motion.div 
            variants={CONTAINER_ANIMATION_VARIANTS}
            className="grid gap-x-12 gap-y-10 sm:grid-cols-2"
          >
          {data.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe;
            const colors = iconColors[service.icon] ?? iconColors.Globe;
            return (
              <motion.div key={service.title} variants={FADE_UP_ANIMATION_VARIANTS}>
                <div className="group flex gap-5">
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 group-hover:scale-110 group-hover:text-white ${colors.container} ${colors.hover}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

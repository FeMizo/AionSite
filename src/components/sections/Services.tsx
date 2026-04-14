import type { ComponentType } from "react";
import { Globe, ShoppingBag, Target, TrendingUp } from "lucide-react";
import type { ServicesSectionData } from "@/src/cms/types";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  Globe,
  Target,
  ShoppingBag,
  TrendingUp,
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
};

export function Services({ data }: { data: ServicesSectionData }) {
  return (
    <section id="servicios" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Servicios que impulsan tu negocio"
          subtitle="Soluciones digitales diseñadas para convertir visitantes en clientes leales."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.map((service) => {
            const Icon = iconMap[service.icon] ?? Globe;
            const colors = iconColors[service.icon] ?? iconColors.Globe;
            return (
              <Card key={service.title} className="group">
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-colors group-hover:text-white ${colors.container} ${colors.hover}`}>
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                <p className="leading-relaxed text-slate-400">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

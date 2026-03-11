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
            return (
              <Card key={service.title} className="group">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
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

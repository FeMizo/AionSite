import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Card } from "@/src/components/ui/Card";
import { Globe, Target, ShoppingBag, TrendingUp } from "lucide-react";

const iconMap: any = {
  Globe: Globe,
  Target: Target,
  ShoppingBag: ShoppingBag,
  TrendingUp: TrendingUp,
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-slate-950">
      <Container>
        <SectionHeading
          title="Servicios que impulsan tu negocio"
          subtitle="Soluciones digitales diseñadas para convertir visitantes en clientes leales."
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {siteData.services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card key={service.title} className="group">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

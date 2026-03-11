import { ExternalLink } from "lucide-react";
import type { PortfolioSectionData } from "@/src/cms/types";
import { Badge } from "@/src/components/ui/Badge";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Portfolio({ data }: { data: PortfolioSectionData }) {
  return (
    <section id="portafolio" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Proyectos destacados"
          subtitle="Una muestra de nuestro trabajo enfocado en diseño premium y resultados."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white">
                <ExternalLink size={12} />
                Abrir
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6">
                <Badge className="mb-3">{item.category}</Badge>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

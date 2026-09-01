import { getRecentPortfolioItems } from "@/src/cms/portfolio";
import type { PortfolioSectionData } from "@/src/cms/types";
import { PortfolioGrid } from "@/src/components/portfolio/PortfolioGrid";
import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Portfolio({ data }: { data: PortfolioSectionData }) {
  const featuredProjects = getRecentPortfolioItems(data).slice(0, 9);

  return (
    <section id="portafolio" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Proyectos destacados"
          subtitle={`Una selección de ${data.length} proyectos reales: sitios, ecommerce y experiencias digitales construidas para negocios y equipos de producto.`}
        />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y border-white/8 py-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>Trabajo seleccionado</span>
          <span>{data.length} proyectos disponibles · Ver sitio en cada tarjeta</span>
        </div>

        <PortfolioGrid items={featuredProjects} />

        <div className="mt-12 flex justify-center">
          <LinkButton href="/proyectos/" variant="outline" className="gap-2">
            Ver todos los proyectos
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

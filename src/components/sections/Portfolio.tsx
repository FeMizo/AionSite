import { getRecentPortfolioItems } from "@/src/cms/portfolio";
import type { PortfolioSectionData } from "@/src/cms/types";
import { PortfolioGrid } from "@/src/components/portfolio/PortfolioGrid";
import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Portfolio({ data }: { data: PortfolioSectionData }) {
  const featuredProjects = getRecentPortfolioItems(data).slice(0, 6);

  return (
    <section id="portafolio" className="bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Proyectos destacados"
          subtitle="Una muestra de nuestro trabajo enfocado en diseÃ±o premium y resultados."
        />

        <PortfolioGrid items={featuredProjects} />

        <div className="mt-12 flex justify-center">
          <LinkButton href="/proyectos" variant="outline" className="gap-2">
            Ver todos los proyectos
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

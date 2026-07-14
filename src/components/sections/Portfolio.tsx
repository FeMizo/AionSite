import { getRecentPortfolioItems } from "@/src/cms/portfolio";
import type { PortfolioSectionData } from "@/src/cms/types";
import { PortfolioGrid } from "@/src/components/portfolio/PortfolioGrid";
import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Portfolio({ data }: { data: PortfolioSectionData }) {
  const featuredProjects = getRecentPortfolioItems(data).slice(0, 6);
  const marqueeProjects = [...featuredProjects, ...featuredProjects];

  return (
    <section id="portafolio" className="overflow-hidden bg-slate-950 py-24">
      <Container>
        <SectionHeading
          title="Proyectos destacados"
          subtitle="Una muestra de nuestro trabajo enfocado en diseño premium y resultados."
        />
      </Container>

      <div className="mb-12 border-y border-white/8 bg-white/[0.025] py-4">
        <div className="aion-marquee flex w-max gap-4">
          {marqueeProjects.map((item, index) => (
            <a
              key={`${item.title}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[260px] items-center justify-between gap-5 rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-slate-300 transition-colors hover:border-blue-300/35 hover:text-white"
            >
              <span className="font-display text-lg font-semibold">
                {item.title}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-blue-300">
                {item.type}
              </span>
            </a>
          ))}
        </div>
      </div>

      <Container>
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

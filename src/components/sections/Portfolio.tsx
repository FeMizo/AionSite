import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Badge } from "@/src/components/ui/Badge";

export const Portfolio = () => {
  return (
    <section id="portafolio" className="py-24 bg-slate-950">
      <Container>
        <SectionHeading
          title="Proyectos destacados"
          subtitle="Una muestra de nuestro trabajo enfocado en diseÃ±o premium y resultados."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteData.portfolio.data.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6">
                <Badge className="mb-3">{item.category}</Badge>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

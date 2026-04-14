import type { StatsSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";

export function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="relative overflow-hidden bg-blue-600 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(30,64,175,0.5))]" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {data.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-6xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-widest text-blue-100/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

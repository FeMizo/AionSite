import type { StatsSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";

export function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="bg-blue-600 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {data.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1.5 font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-blue-100/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

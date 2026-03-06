import type { StatsSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";

export function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="bg-blue-600 py-20">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {data.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-6xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-widest text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";

export const Stats = () => {
  return (
    <section className="py-20 bg-blue-600">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {siteData.stats.data.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white md:text-6xl mb-2">
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
};

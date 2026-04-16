import type { ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Process({ data }: { data: ProcessSectionData }) {
  return (
    <section id="proceso" className="bg-slate-900/30 py-24">
      <Container>
        <SectionHeading
          title="Nuestro proceso"
          subtitle="Metodología ágil diseñada para garantizar el éxito de tu proyecto."
        />

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-blue-900/70 md:left-1/2" />

          <div className="space-y-12">
            {data.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-blue-500 ring-4 ring-blue-500/25 shadow-[0_0_14px_2px_rgba(59,130,246,0.45)] md:left-1/2" />

                <div className="w-full pl-16 md:w-1/2 md:pl-0">
                  <div
                    className={`rounded-2xl border border-white/5 bg-slate-900 p-8 ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <span className="mb-4 block font-display text-4xl font-bold text-blue-400/45">
                      {item.step}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

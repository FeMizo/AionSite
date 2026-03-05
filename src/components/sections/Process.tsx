import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export const Process = () => {
  return (
    <section id="proceso" className="py-24 bg-slate-900/30">
      <Container>
        <SectionHeading
          title="Nuestro proceso"
          subtitle="MetodologÃ­a Ã¡gil diseÃ±ada para garantizar el Ã©xito de tu proyecto."
        />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-1/2" />

          <div className="space-y-12">
            {siteData.process.data.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 ring-4 ring-blue-600/20 z-10" />

                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`p-8 rounded-2xl bg-slate-900 border border-white/5 ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}>
                    <span className="text-4xl font-bold text-blue-600/20 mb-4 block">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
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
};

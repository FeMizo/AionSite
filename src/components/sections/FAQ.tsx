import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-slate-950">
      <Container>
        <SectionHeading
          title="Preguntas frecuentes"
          subtitle="Resolvemos tus dudas antes de empezar."
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {siteData.faq.data.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/5 bg-slate-900/50 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
              <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

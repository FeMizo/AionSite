import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Card } from "@/src/components/ui/Card";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-900/20">
      <Container>
        <SectionHeading
          title="Lo que dicen nuestros clientes"
          subtitle="La confianza de nuestros socios es nuestro mayor activo."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {siteData.testimonials.data.map((t) => (
            <Card key={t.name} className="relative">
              <Quote className="absolute top-6 right-6 text-blue-600/20" size={48} />
              <p className="mb-8 text-lg text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-sm text-blue-500">{t.company}</div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

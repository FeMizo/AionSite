import { Quote } from "lucide-react";
import type { TestimonialsSectionData } from "@/src/cms/types";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Testimonials({ data }: { data: TestimonialsSectionData }) {
  return (
    <section className="bg-slate-900/20 py-24">
      <Container>
        <SectionHeading
          title="Lo que dicen nuestros clientes"
          subtitle="La confianza de nuestros socios es nuestro mayor activo."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {data.map((testimonial) => (
            <Card key={testimonial.name} className="relative">
              <Quote className="absolute right-6 top-6 text-blue-600/20" size={48} />
              <p className="mb-8 text-lg leading-relaxed text-slate-300 italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-sm text-blue-500">{testimonial.company}</div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

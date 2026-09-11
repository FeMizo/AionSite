import { ArrowRight, Check, MessageCircleMore, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { getWhatsAppLink } from "@/src/config/whatsapp";

export type LocalLandingConfig = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  benefits: string[];
  process: string[];
  faq: { question: string; answer: string }[];
  whatsappMessage: string;
};

export function LocalLandingPage({ config }: { config: LocalLandingConfig }) {
  const whatsappLink = getWhatsAppLink(config.whatsappMessage);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="border-b border-white/10 bg-slate-950/95">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-white">AionSite</Link>
          <LinkButton href={whatsappLink} target="_blank" rel="noopener noreferrer" size="sm">
            Hablar por WhatsApp
          </LinkButton>
        </Container>
      </header>

      <main className="min-h-screen bg-slate-950">
        <section className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
          <div className="absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-[130px]" />
          <Container className="relative z-10 max-w-5xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              <MapPin size={16} /> {config.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{config.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={whatsappLink} target="_blank" rel="noopener noreferrer" size="lg">
                Solicitar propuesta <ArrowRight size={18} />
              </LinkButton>
              <LinkButton href="/#contacto" variant="secondary" size="lg">Cuéntame mi proyecto</LinkButton>
            </div>
            <p className="mt-5 text-sm text-slate-500">Atención para negocios de Ciudad del Carmen y proyectos en todo México.</p>
          </Container>
        </section>

        <section className="py-20 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Una solución que trabaja contigo</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Más claridad para vender y dar seguimiento.</h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-slate-300">{config.intro}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {config.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-slate-200">
                    <Check className="mt-0.5 shrink-0 text-blue-300" size={19} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/10 bg-slate-900/40 py-20 md:py-24">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Cómo empezamos</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {config.process.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                  <span className="text-sm font-semibold text-blue-300">0{index + 1}</span>
                  <p className="mt-4 text-lg font-medium text-white">{step}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-24">
          <Container className="max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Preguntas frecuentes</h2>
            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-6">
              {config.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-white marker:hidden">{item.question}</summary>
                  <p className="mt-3 leading-relaxed text-slate-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-white/10 py-20">
          <Container className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-8 md:flex-row md:items-center md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Ciudad del Carmen · México</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white">Cuéntame qué quieres mejorar y te respondo con el siguiente paso.</h2>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500">
              <MessageCircleMore size={19} /> Escribir por WhatsApp
            </a>
          </Container>
        </section>
      </main>
    </>
  );
}

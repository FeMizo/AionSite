"use client";

import { useEffect, useRef, useState } from "react";
import type { FAQSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { gsap, useGsapStagger } from "@/src/lib/animations";

export function FAQ({ data }: { data: FAQSectionData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useGsapStagger<HTMLDivElement>();
  const answerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    answerRefs.current.forEach((answer, index) => {
      if (!answer) return;
      const isOpen = openIndex === index;
      gsap.to(answer, {
        height: isOpen ? "auto" : 0,
        autoAlpha: isOpen ? 1 : 0,
        marginTop: isOpen ? 12 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });

    iconRefs.current.forEach((icon, index) => {
      if (!icon) return;
      gsap.to(icon, {
        rotate: openIndex === index ? 45 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  }, [openIndex]);

  return (
    <section
      id="faq"
      className="bg-slate-950 py-24"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <Container>
        <div ref={sectionRef}>
          <div data-gsap-reveal>
            <SectionHeading
              title="Preguntas frecuentes"
              subtitle="Resolvemos tus dudas antes de empezar."
              centered={true}
              className="mb-12"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {data.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  data-gsap-reveal
                  key={faq.question}
                  className={`rounded-2xl border bg-slate-900/55 p-6 shadow-[0_22px_44px_-34px_rgba(2,6,23,0.95)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "border-blue-400/35 shadow-[0_26px_48px_-30px_rgba(37,99,235,0.42)]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-lg font-bold text-white" itemProp="name">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span
                        ref={(node) => {
                          iconRefs.current[index] = node;
                        }}
                        aria-hidden="true"
                        className="rounded-full border border-blue-300/30 bg-blue-500/10 px-2 py-0.5 text-blue-300 flex items-center justify-center shrink-0"
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    ref={(node) => {
                      answerRefs.current[index] = node;
                    }}
                    id={answerId}
                    aria-hidden={!isOpen}
                    className="overflow-hidden"
                    style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? 12 : 0 }}
                  >
                    <p
                      className="leading-relaxed text-slate-400"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <span itemProp="text">{faq.answer}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

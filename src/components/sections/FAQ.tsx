"use client";

import { useState } from "react";
import type { FAQSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function FAQ({ data }: { data: FAQSectionData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-slate-950 py-24"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <Container>
        <SectionHeading
          title="Preguntas frecuentes"
          subtitle="Resolvemos tus dudas antes de empezar."
          centered={true}
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {data.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-slate-900/55 p-6 shadow-[0_22px_44px_-34px_rgba(2,6,23,0.95)] transition-all duration-300 ${
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
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`rounded-full border border-blue-300/30 bg-blue-500/10 px-2 py-0.5 text-blue-300 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p
                    className="overflow-hidden leading-relaxed text-slate-400"
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
      </Container>
    </section>
  );
}

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
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {data.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/5 bg-slate-900/50 p-6"
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
                      className={`text-blue-400 transition-transform duration-200 ${
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

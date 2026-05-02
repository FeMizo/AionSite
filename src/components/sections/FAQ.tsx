"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { FAQSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { CONTAINER_ANIMATION_VARIANTS, FADE_UP_ANIMATION_VARIANTS } from "@/src/lib/animations";

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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={CONTAINER_ANIMATION_VARIANTS}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <SectionHeading
              title="Preguntas frecuentes"
              subtitle="Resolvemos tus dudas antes de empezar."
              centered={true}
              className="mb-12"
            />
          </motion.div>

          <motion.div variants={CONTAINER_ANIMATION_VARIANTS} className="max-w-3xl mx-auto space-y-6">
            {data.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <motion.div
                  variants={FADE_UP_ANIMATION_VARIANTS}
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
                      <motion.span
                        aria-hidden="true"
                        className="rounded-full border border-blue-300/30 bg-blue-500/10 px-2 py-0.5 text-blue-300 flex items-center justify-center shrink-0"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        aria-hidden={!isOpen}
                        className="overflow-hidden"
                      >
                        <p
                          className="leading-relaxed text-slate-400"
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <span itemProp="text">{faq.answer}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

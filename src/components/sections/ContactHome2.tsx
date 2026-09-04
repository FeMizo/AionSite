"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const services = ["Website", "Marketing Digital", "SEO", "Publicidad", "Consultoría"];

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const start = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => window.clearTimeout(start);
  }, [speed, startDelay, text]);

  return { displayed, done };
}

export function ContactHome2() {
  const { displayed, done } = useTypewriter("Nos encantaria\nhablar contigo!");
  const [selected, setSelected] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelected((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-36">
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
      <Container className="relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Heading as="h2" className="max-w-3xl whitespace-pre-wrap font-normal text-white">{displayed}<span className={`ml-1 inline-block h-[1.1em] w-[2px] align-middle bg-white ${done ? "opacity-0" : "animate-pulse"}`} /></Heading>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">Si tienes preguntas, comentarios,<br />envianos un mensaje y te responderemos lo antes posible.</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_24px_80px_-42px_rgba(37,99,235,0.7)] backdrop-blur-md sm:p-8">
          <p className="text-2xl font-medium tracking-tight text-white">Que servicio necesitas?</p>
          <p className="mb-8 mt-2 text-sm text-slate-400">Selecciona todas las opciones que correspondan</p>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => {
              const active = selected.includes(service);
              return <motion.button key={service} type="button" whileTap={{ scale: 0.96 }} onClick={() => toggleService(service)} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${active ? "bg-blue-600 text-white shadow-[0_12px_28px_-14px_rgba(59,130,246,0.95)]" : "border border-white/15 bg-white/[0.03] text-slate-200 hover:bg-white/10"}`}><AnimatePresence initial={false}>{active && <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}><Check size={15} /></motion.span>}</AnimatePresence>{service}</motion.button>;
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {selected.length === 0 ? <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="mt-7 text-xs italic text-slate-400">Selecciona servicios para continuar.</motion.p> : <motion.div key="active" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-7 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4"><p className="text-sm text-slate-300">Quieres consultar sobre: {selected.join(", ")}</p><button type="button" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-300">Vamos <ArrowUpRight size={14} /></button></motion.div>}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

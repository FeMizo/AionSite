"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";
import MotionButton from "@/src/components/ui/motion-button";
import { getWhatsAppLink } from "@/src/config/whatsapp";

const services = ["Website", "Marketing Digital", "SEO", "Publicidad", "Consultoría"];

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(timer);
          timer = undefined;
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [speed, startDelay, text]);

  return { displayed, done };
}

export function ContactHome2() {
  const { displayed, done } = useTypewriter("Nos encantaria\nhablar contigo!");
  const [selected, setSelected] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelected((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  }

  const whatsappLink = getWhatsAppLink(
    `Hola AionSite, me gustaría recibir información sobre: ${selected.join(", ")}.`,
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-14 text-white lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col justify-between lg:min-h-[32rem]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Heading as="h2" className="max-w-3xl whitespace-pre-wrap font-normal leading-[0.98] text-white">{displayed}<span className={`ml-1 inline-block h-[1.1em] w-[2px] align-middle bg-white ${done ? "opacity-0" : "animate-pulse"}`} /></Heading>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">Si tienes preguntas, comentarios,<br />envianos un mensaje y te responderemos lo antes posible.</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-42px_rgba(37,99,235,0.7)] backdrop-blur-md sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-blue-300/15 bg-blue-400/10 blur-2xl" />
          <div className="relative">
            <p className="text-2xl font-medium tracking-tight text-white">Que servicio necesitas?</p>
            <p className="mb-8 mt-2 max-w-md text-sm leading-relaxed text-slate-400">Selecciona todas las opciones que correspondan</p>
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const active = selected.includes(service);
              return <motion.button key={service} type="button" whileTap={{ scale: 0.98 }} aria-pressed={active} onClick={() => toggleService(service)} className={`group flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-[border-color,background-color,box-shadow,transform] ${active ? "border-blue-400/70 bg-blue-500/15 text-white shadow-[0_16px_32px_-20px_rgba(59,130,246,0.95)]" : "border-white/10 bg-slate-950/30 text-slate-200 hover:border-white/25 hover:bg-white/[0.07]"}`}><span>{service}</span><span className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${active ? "border-blue-300 bg-blue-400 text-slate-950" : "border-white/20 text-transparent group-hover:border-white/40"}`}><AnimatePresence initial={false}>{active && <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}><Check size={14} /></motion.span>}</AnimatePresence></span></motion.button>;
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {selected.length === 0 ? <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="mt-7 text-xs italic text-slate-400">Selecciona servicios para continuar.</motion.p> : <motion.div key="active" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-7 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm leading-relaxed text-slate-300">Quieres consultar sobre: {selected.join(", ")}</p><MotionButton as="a" href={whatsappLink} target="_blank" rel="noreferrer" label="Vamos" icon={<ArrowUpRight size={17} />} classes="min-h-12 min-w-0 w-full sm:w-auto" /></motion.div>}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Atom, Instagram, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CmsBase, FinalCTASectionData, FooterSectionData, ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";
import MotionButton from "@/src/components/ui/motion-button";

const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

const platforms = [
  { name: "Shopify", mark: "S", tone: "text-emerald-300" },
  { name: "WordPress", mark: "W", tone: "text-sky-300" },
  { name: "Vue", mark: "V", tone: "text-emerald-200" },
  { name: "Next.js", mark: "N", tone: "text-white" },
  { name: "React", mark: "react", tone: "text-cyan-300" },
  { name: "Webflow", mark: "W", tone: "text-blue-300" },
  { name: "Google", mark: "G", tone: "text-yellow-300" },
  { name: "Facebook", mark: "f", tone: "text-blue-400" },
  { name: "Instagram", mark: "instagram", tone: "text-pink-300" },
];

const platformPositions = [
  "left-1/2 top-[7%]",
  "left-[25%] top-[18%]",
  "left-[75%] top-[18%]",
  "left-[91%] top-1/2",
  "left-[76%] top-[82%]",
  "left-1/2 top-[93%]",
  "left-[24%] top-[82%]",
  "left-[9%] top-1/2",
  "left-[9%] top-[70%]",
];

type FormState = { name: string; email: string; message: string };

function PlatformMark({ mark, tone }: { mark: string; tone: string }) {
  if (mark === "react") return <Atom size={24} strokeWidth={1.8} className={tone} />;
  if (mark === "instagram") return <Instagram size={23} strokeWidth={1.8} className={tone} />;
  return <span className={`font-display text-2xl font-semibold ${tone}`}>{mark}</span>;
}

export function CtaFooterHome2({ base, cta, footer, process }: { base: CmsBase; cta: FinalCTASectionData; footer: FooterSectionData; process: ProcessSectionData }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const reduce = useReducedMotion();

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-36">
      <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover opacity-35" src={video} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
      <Container className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }} className="mb-14 mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">Hablemos de tu proyecto</p>
          <Heading as="h2" className="mt-5 max-w-4xl text-white">{cta.title}</Heading>
          <p className="mt-6 text-base leading-relaxed text-slate-300 md:text-lg">{cta.subtitle}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }} className="relative mx-auto aspect-square w-full max-w-[540px]">
            <div className="absolute inset-[9%] rounded-full border border-white/10" />
            <div className="absolute inset-[23%] rounded-full border border-white/10" />
            <div className="absolute inset-[37%] rounded-full border border-blue-300/15" />
            <div className="absolute left-1/2 top-1/2 h-px w-[42%] origin-left bg-gradient-to-r from-blue-300/45 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[42%] w-px origin-top bg-gradient-to-b from-blue-300/25 to-transparent" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-300">AionSite / stack</span>
              <span className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Creamos<br /><span className="text-blue-200">para crecer.</span></span>
            </div>
            {platforms.map((platform, index) => (
              <motion.div key={platform.name} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} className={`absolute -translate-x-1/2 -translate-y-1/2 ${platformPositions[index]}`}>
                <motion.div animate={reduce ? undefined : { x: [0, 5, 8, 5, 0, -5, -8, -5, 0], y: [0, 4, 0, -4, 0, 4, 0, -4, 0], rotate: [0, 1, 1.5, 1, 0, -1, -1.5, -1, 0] }} transition={reduce ? undefined : { duration: 12 + (index % 3) * 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.55 }}>
                  <div className="group flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/75 shadow-[0_12px_30px_-20px_rgba(59,130,246,0.95)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:h-16 sm:w-16" title={platform.name} aria-label={platform.name}>
                    <PlatformMark mark={platform.mark} tone={platform.tone} />
                    <span className="mt-1 max-w-14 truncate text-[8px] font-medium text-slate-500">{platform.name}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.1 }} onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_24px_80px_-42px_rgba(37,99,235,0.75)] backdrop-blur-md sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-300">Cuéntanos qué necesitas</p><h3 className="mt-3 font-display text-2xl font-semibold text-white">Envíanos un mensaje</h3></div><Send className="mt-1 shrink-0 text-blue-300" size={20} /></div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">Nombre<input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-blue-300/60 focus:bg-white/[0.06]" placeholder="Tu nombre" /></label>
              <label className="grid gap-2 text-sm text-slate-300">Correo<input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-blue-300/60 focus:bg-white/[0.06]" placeholder="tu@correo.com" /></label>
            </div>
            <label className="mt-5 grid gap-2 text-sm text-slate-300">¿Qué necesitas construir?<textarea required rows={5} value={form.message} onChange={(event) => updateField("message", event.target.value)} className="resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-blue-300/60 focus:bg-white/[0.06]" placeholder="Cuéntanos sobre tu idea, objetivos o problema..." /></label>
            <MotionButton type="submit" label={status === "sending" ? "Enviando..." : "Enviar mensaje"} classes="mt-6 w-full" icon={<Send size={17} />} disabled={status === "sending"} />
            {status === "success" && <p className="mt-4 text-sm text-emerald-300">Mensaje enviado. Te responderemos pronto.</p>}
            {status === "error" && <p className="mt-4 text-sm text-rose-300">No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.</p>}
            <p className="mt-4 text-xs text-slate-500">{cta.responseText}</p>
          </motion.form>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
          {process.slice(0, 3).map((item) => <div key={item.step} className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 backdrop-blur-sm"><p className="font-mono text-xs text-blue-300">{item.step}</p><p className="mt-3 text-sm font-semibold text-white">{item.title}</p><p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p></div>)}
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-xs text-slate-500 md:flex-row"><p>(c) 2026 {base.name}. Todos los derechos reservados.</p><nav className="flex flex-wrap justify-center gap-5">{footer.navigation.slice(0, 5).map((item) => <a key={item.name} href={item.href} className="transition-colors hover:text-white">{item.name}</a>)}</nav><a href={footer.whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-blue-300">WhatsApp directo <ArrowUpRight size={13} /></a></footer>
      </Container>
    </section>
  );
}

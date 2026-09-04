"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { CmsBase, FinalCTASectionData, FooterSectionData, ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export function CtaFooterHome2({ base, cta, footer, process }: { base: CmsBase; cta: FinalCTASectionData; footer: FooterSectionData; process: ProcessSectionData }) {
  return (
    <section id="contacto" className="relative overflow-hidden bg-slate-950 py-24 text-center text-white md:py-36">
      <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover opacity-25" src={video} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/75 to-slate-950" />
      <Container className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">Hablemos de tu proyecto</p>
          <Heading as="h2" className="mx-auto mt-5 max-w-4xl text-white">{cta.title}</Heading>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{cta.subtitle}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={cta.whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500">Iniciar conversacion por WhatsApp <ArrowUpRight size={17} /></a>
            <a href="#paquetes" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">Ver paquetes <ArrowUpRight size={17} /></a>
          </div>
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
          {process.slice(0, 3).map((item, index) => <div key={item.step} className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 backdrop-blur-sm"><p className="font-mono text-xs text-blue-300">{item.step}</p><p className="mt-3 text-sm font-semibold text-white">{item.title}</p><p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p></div>)}
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-xs text-slate-500 md:flex-row"><p>(c) 2026 {base.name}. Todos los derechos reservados.</p><nav className="flex flex-wrap justify-center gap-5">{footer.navigation.slice(0, 5).map((item) => <a key={item.name} href={item.href} className="transition-colors hover:text-white">{item.name}</a>)}</nav><a href={footer.whatsappLink} target="_blank" rel="noreferrer" className="transition-colors hover:text-blue-300">WhatsApp directo</a></footer>
      </Container>
    </section>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProcessSectionData, SideImageContentSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

export function InnovationVisionHome2({ content, process }: { content: SideImageContentSectionData; process: ProcessSectionData }) {
  return (
    <section id="innovation-vision" className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(37,99,235,0.16),transparent_28%)]" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <Heading as="h2" className="max-w-5xl text-white">
          Innovation <span className="font-normal italic text-slate-500">x</span> Vision
          </Heading>
        </motion.div>
        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-14">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <Image src={content.image} alt={content.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.22em] text-blue-200">AionSite / 02</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col justify-center">
            <div className="pb-8"><p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-300">Estrategia y vision</p><Heading as="h3" className="mt-4 text-white">{content.title}</Heading><p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">{content.description}</p></div>
            <div className="border-t border-white/10 pt-8"><p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-300">De la idea al resultado</p><p className="mt-4 text-base leading-relaxed text-slate-400">Convertimos objetivos de negocio en experiencias digitales claras, medibles y listas para crecer contigo.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{process.slice(0, 3).map((item) => <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><span className="font-mono text-xs text-blue-300">{item.step}</span><p className="mt-2 text-sm font-medium text-white">{item.title}</p></div>)}</div></div>
            <a href={content.buttonLink} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500">{content.buttonText} <ArrowUpRight size={17} /></a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

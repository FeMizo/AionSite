"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

export function ProjectsHome2({ data }: { data: PortfolioSectionData }) {
  const projects = data.slice(0, 3);

  return (
    <section id="portafolio" className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(124,58,237,0.12),transparent_32%)]" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }} className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div><p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">Proyectos</p><Heading as="h2" className="mt-4 text-white">Proyectos destacados</Heading></div>
          <Link href="/proyectos" className="hidden items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline-flex">Ver todos los proyectos <ArrowUpRight size={17} /></Link>
        </motion.div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: index * 0.12 }} className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-slate-900/75 to-blue-950/35 shadow-[0_28px_70px_-48px_rgba(59,130,246,0.9)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:border-white/25">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.12)_45%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Link href={project.url} target="_blank" rel="noreferrer" className="relative z-20 block">
                <div className="relative aspect-[1.2] overflow-hidden bg-slate-900/80"><Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-white/10" /><div className="absolute inset-x-0 top-0 h-px bg-white/40" /><span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/45 text-white shadow-[0_8px_24px_-12px_rgba(255,255,255,0.8)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"><ArrowUpRight size={17} /></span></div>
                <div className="p-6 md:p-7"><p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-blue-300">{project.category}</p><Heading as="h3" className="mt-3 text-white">{project.title}</Heading><p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description ?? project.type}</p></div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

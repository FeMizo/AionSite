"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProcessSectionData, SideImageContentSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";
import MotionButton from "@/src/components/ui/motion-button";

function RotatingGlobe() {
  const reduce = useReducedMotion();

  return (
    <div className="relative aspect-square w-full max-w-[560px]" aria-label="Globo digital en rotación" role="img">
      <div className="absolute inset-[4%] rounded-full bg-blue-500/10 blur-3xl" />
      <svg viewBox="0 0 480 480" className="relative h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="globeSurface" cx="35%" cy="28%" r="72%">
            <stop offset="0" stopColor="#334155" stopOpacity="0.95" />
            <stop offset="0.72" stopColor="#0f172a" stopOpacity="0.96" />
            <stop offset="1" stopColor="#020617" stopOpacity="1" />
          </radialGradient>
          <clipPath id="globeClip"><circle cx="240" cy="240" r="188" /></clipPath>
          <pattern id="globeDots" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.35" fill="#93c5fd" fillOpacity="0.34" />
          </pattern>
          <filter id="globeGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="240" cy="240" r="188" fill="url(#globeSurface)" stroke="#93c5fd" strokeOpacity="0.28" strokeWidth="1.2" />
        <motion.g clipPath="url(#globeClip)" style={{ transformOrigin: "240px 240px" }} animate={reduce ? undefined : { rotate: 360 }} transition={reduce ? undefined : { duration: 32, repeat: Infinity, ease: "linear" }}>
          <circle cx="240" cy="240" r="188" fill="url(#globeDots)" opacity="0.9" />
          <path d="M78 151l19-20 28-8 19 10 18-3 21 15 20 3 12 21-12 13-26 1-12 17-18-2-12 20-24-8-6-18-21-10zM180 214l17 5 12 19-8 27-13 20-10 32-16 22-13-28 5-28-11-20 12-20-8-19zM207 133l14-13 23 3 10 13-12 12-17-4-14 8-13-8zM248 141l28-11 35 4 24 15 30-2 33 20-5 19-29 4-14 16-27-5-16 17-26-8-10-21-28-8-7-20zM278 199l20 2 14 15-6 19-17 7-10 26-17 3-12-23 8-19zM284 249l25 7 15 22-6 27-21 11-13 27-20-7-7-25 12-24zM345 288l29 5 22 17-10 18-27-1-18-15zM363 355l24 8 16 17-15 14-29-5-12-16z" fill="url(#globeDots)" stroke="#bfdbfe" strokeOpacity="0.3" strokeWidth="1.2" />
          <ellipse cx="240" cy="240" rx="188" ry="72" fill="none" stroke="#bfdbfe" strokeOpacity="0.14" strokeWidth="1" />
          <ellipse cx="240" cy="240" rx="188" ry="128" fill="none" stroke="#bfdbfe" strokeOpacity="0.1" strokeWidth="1" />
          <path d="M52 240h376M77 168h326M77 312h326" fill="none" stroke="#bfdbfe" strokeOpacity="0.1" strokeWidth="1" />
        </motion.g>
        <circle cx="240" cy="240" r="193" fill="none" stroke="#93c5fd" strokeOpacity="0.16" strokeDasharray="2 12" strokeWidth="2" />
        <motion.g filter="url(#globeGlow)" style={{ transformOrigin: "240px 240px" }} animate={reduce ? undefined : { rotate: -360 }} transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}>
          <circle cx="426" cy="238" r="4" fill="#bfdbfe" />
          <circle cx="54" cy="244" r="3" fill="#93c5fd" />
        </motion.g>
      </svg>
      <span className="absolute bottom-[9%] left-[15%] font-mono text-xs uppercase tracking-[0.22em] text-blue-200">AionSite / 02</span>
    </div>
  );
}

export function InnovationVisionHome2({ content, process }: { content: SideImageContentSectionData; process: ProcessSectionData }) {
  return (
    <section id="innovation-vision" className="relative overflow-hidden bg-slate-950 text-white py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(37,99,235,0.16),transparent_28%)]" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <Heading as="h2" className="max-w-5xl text-white">
            Innovation <span className="font-normal italic text-slate-500">x</span> Vision
          </Heading>
        </motion.div>
        <div className="relative mt-14 md:mt-24">
          <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] z-10 origin-bottom-left scale-[1.3] w-[620px] opacity-100 sm:bottom-[-13rem] sm:left-[-12rem] sm:w-[720px] lg:bottom-[-18rem] lg:left-[-20rem] lg:w-[900px]">
            <RotatingGlobe />
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.1 }} className="relative z-20 ml-auto flex max-w-xl flex-col justify-center pt-10 lg:pt-18">
            <div className="pb-8"><p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-300">Estrategia y vision</p><Heading as="h3" className="mt-4 text-white">{content.title}</Heading><p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">{content.description}</p><MotionButton as="a" href={content.buttonLink} target="_blank" rel="noreferrer" label="Cotiza por WhatsApp" classes="mt-8 w-full sm:w-fit" icon={<ArrowUpRight size={17} />} /></div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

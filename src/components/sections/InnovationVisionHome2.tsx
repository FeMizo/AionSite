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
      <div className="absolute inset-[8%] rounded-full bg-blue-500/15 blur-3xl" />
      <svg viewBox="0 0 480 480" className="relative h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="globeSurface" cx="32%" cy="25%" r="76%">
            <stop offset="0" stopColor="#172554" stopOpacity="0.98" />
            <stop offset="0.58" stopColor="#0f172a" stopOpacity="0.98" />
            <stop offset="1" stopColor="#020617" stopOpacity="1" />
          </radialGradient>
          <clipPath id="globeClip"><circle cx="240" cy="240" r="188" /></clipPath>
          <pattern id="globeDots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.05" fill="#bfdbfe" fillOpacity="0.42" />
          </pattern>
          <pattern id="globeLandDots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.35" fill="#60a5fa" fillOpacity="0.88" />
          </pattern>
          <filter id="globeGlow" filterUnits="userSpaceOnUse" x="-24" y="-24" width="528" height="528">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="240" cy="240" r="188" fill="url(#globeSurface)" stroke="#93c5fd" strokeOpacity="0.32" strokeWidth="1.2" />
        <motion.g clipPath="url(#globeClip)" style={{ transformOrigin: "50% 50%", transformBox: "view-box" }} animate={reduce ? undefined : { rotate: 360 }} transition={reduce ? undefined : { duration: 32, repeat: Infinity, ease: "linear" }}>
          <circle cx="240" cy="240" r="188" fill="url(#globeDots)" opacity="0.72" />
          <path d="M82 153l18-19 29-8 22 11 17-4 19 14 21 4 14 20-13 15-25-2-15 18-18-4-13 22-25-9-6-19-20-9zM177 214l20 4 15 21-7 27-15 19-9 31-16 23-14-29 6-30-12-18 12-22-9-18zM205 133l17-14 23 4 10 13-13 13-17-4-15 8-13-8zM247 142l29-13 36 5 25 15 28-2 34 20-5 19-30 5-13 16-28-6-16 18-27-9-10-20-28-9-7-19zM277 199l22 2 13 16-6 20-18 7-9 25-18 4-12-24 8-19zM283 249l26 8 15 22-6 28-21 10-13 28-20-8-8-25 13-24zM344 288l30 6 21 17-10 18-28-1-18-15zM362 355l25 8 16 17-15 14-30-5-11-16z" fill="url(#globeLandDots)" stroke="#93c5fd" strokeOpacity="0.24" strokeWidth="1" />
          <ellipse cx="240" cy="240" rx="188" ry="76" fill="none" stroke="#bfdbfe" strokeOpacity="0.16" strokeWidth="1" />
          <ellipse cx="240" cy="240" rx="188" ry="132" fill="none" stroke="#bfdbfe" strokeOpacity="0.1" strokeWidth="1" />
          <path d="M52 240h376M73 178h334M73 302h334" fill="none" stroke="#bfdbfe" strokeOpacity="0.09" strokeWidth="1" />
        </motion.g>
        <circle cx="240" cy="240" r="193" fill="none" stroke="#93c5fd" strokeOpacity="0.18" strokeDasharray="2 12" strokeWidth="2" />
        <motion.g filter="url(#globeGlow)" style={{ transformOrigin: "50% 50%", transformBox: "view-box" }} animate={reduce ? undefined : { rotate: -360 }} transition={reduce ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}>
          <path d="M72 168C145 80 306 69 410 159" fill="none" stroke="#60a5fa" strokeOpacity="0.38" strokeWidth="1.5" strokeDasharray="3 8" />
          <circle cx="105" cy="135" r="3.5" fill="#bfdbfe" />
          <circle cx="355" cy="118" r="3" fill="#60a5fa" />
          <circle cx="404" cy="160" r="4" fill="#bfdbfe" />
        </motion.g>
      </svg>
      <span className="absolute bottom-[9%] left-[15%] font-mono text-xs uppercase tracking-[0.22em] text-blue-200">AionSite / 02</span>
    </div>
  );
}

export function InnovationVisionHome2({ content, process }: { content: SideImageContentSectionData; process: ProcessSectionData }) {
  return (
    <section id="innovation-vision" className="relative overflow-hidden bg-slate-950 text-white py-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(37,99,235,0.16),transparent_28%)]" />
      <Container className="relative">
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <Heading as="h2" className="max-w-5xl text-white">
            Innovation <span className="font-normal italic text-slate-500">x</span> Vision
          </Heading>
        </motion.div>
        <div className="relative mt-10 md:mt-16">
          <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] z-10 origin-bottom-left scale-[1.3] w-[620px] opacity-100 sm:bottom-[-13rem] sm:left-[-12rem] sm:w-[720px] lg:bottom-[-18rem] lg:left-[-20rem] lg:w-[900px]">
            <RotatingGlobe />
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.1 }} className="relative z-20 ml-auto flex max-w-xl flex-col justify-center pt-8 lg:pt-12">
            <div className="pb-8"><p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-300">Estrategia y vision</p><Heading as="h3" className="mt-4 text-white">{content.title}</Heading><p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">{content.description}</p><MotionButton as="a" href={content.buttonLink} target="_blank" rel="noreferrer" label="Cotiza por WhatsApp" classes="mt-8 w-full sm:w-fit" icon={<ArrowUpRight size={17} />} /></div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

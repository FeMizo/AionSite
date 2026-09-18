import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Atom, Check, ChevronRight, Rocket, Sparkles } from "lucide-react";
import "./botones.css";

export const metadata: Metadata = {
  title: "Botones animados | AionSite Style Lab",
  description: "Galería interactiva de diez estilos de botones animados con CSS.",
};

const examples = [
  { name: "Typewriter", detail: "El texto aparece al pasar el cursor", style: "typewriter", content: <><span className="type-prefix">&gt; </span><span className="type-word">Quantum</span><span className="type-cursor" /></> },
  { name: "Rocket", detail: "Gradiente y lanzamiento", style: "rocket", content: <><Rocket size={17} /><span>Launch</span></> },
  { name: "Icon Swap", detail: "Cambia el ícono al interactuar", style: "icon-swap", content: <><span className="swap-first"><ArrowUpRight size={16} /></span><span className="swap-last"><Check size={16} /></span><span>Deploy</span></> },
  { name: "Spark", detail: "Destello que cruza el botón", style: "spark", content: <><span>Ignite</span><Sparkles size={16} /></> },
  { name: "Circle Expand", detail: "Un círculo revela el color", style: "circle-expand", content: <><span className="circle-bloom" /><span> Nebula</span></> },
  { name: "Shine", detail: "Brillo en movimiento", style: "shine", content: <><span>Supernova</span><span className="shine-sweep" /></> },
  { name: "Flip", detail: "Voltea para revelar el mensaje", style: "flip", content: <><span className="flip-inner"><span>Receive</span><span>Success <Check size={15} /></span></span></> },
  { name: "Expand", detail: "El ícono se transforma", style: "expand", content: <><span className="atom-ring"><Atom size={19} /></span></> },
  { name: "Badge Arrow", detail: "La flecha se desliza", style: "badge-arrow", content: <><span>Cosmos</span><span className="arrow-badge"><ArrowUpRight size={16} /></span></> },
  { name: "Warp", detail: "El texto se estira al activar", style: "warp", content: <><span>Activate</span><ArrowDownRight size={16} /></> },
];

export default function AnimatedButtonsPage() {
  return <main className="button-lab">
    <header className="button-lab-header"><Link href="/estilos" className="button-back"><ArrowRight size={15} /> Style Lab</Link><span className="button-lab-mark"><i /> CSS INTERACTION STUDY / 001</span><span className="button-lab-date">AIONSITE · 2026</span></header>
    <section className="button-intro"><div><p className="button-eyebrow"><span>01 — 10</span> MICROINTERACCIONES</p><h1>Un buen botón<br />también <em>se siente.</em></h1></div><p className="button-intro-copy">Diez ideas de movimiento para darle intención a cada clic. Pasa el cursor sobre cada botón y explora.</p><div className="button-scroll-mark">SCROLL TO EXPLORE <ChevronRight size={14} /></div></section>
    <section className="button-gallery" aria-label="Galería de botones animados">
      {examples.map((example, index) => <article className="button-card" key={example.name}>
        <div className="button-card-head"><span className="button-number">{String(index + 1).padStart(2, "0")}</span><span className="button-kind">CSS / HOVER</span></div>
        <div className="button-stage"><button type="button" className={`demo-button ${example.style}`} aria-label={`${example.name}: ${example.detail}`}>{example.content}</button></div>
        <div className="button-card-foot"><h2>{example.name}</h2><p>{example.detail}</p></div>
      </article>)}
    </section>
    <footer className="button-lab-footer"><span>PEQUEÑOS DETALLES, MEJORES EXPERIENCIAS.</span><Link href="/estilos">Volver a estilos <ArrowUpRight size={14} /></Link></footer>
  </main>;
}

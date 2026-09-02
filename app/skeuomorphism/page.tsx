"use client";

import { ArrowRight, Check, Coffee, MousePointer2, PenLine, ShieldCheck } from "lucide-react";
import { StylePageFooter, StylePageHeader } from "@/src/components/StylePageChrome";

const details = [
  { icon: PenLine, title: "Interfaces con memoria", text: "Cada control se siente familiar desde el primer clic." },
  { icon: MousePointer2, title: "Feedback tangible", text: "Estados, sombras y respuestas que hacen visible cada acción." },
  { icon: ShieldCheck, title: "Confianza en cada detalle", text: "Una experiencia cálida, clara y hecha para durar." },
];

export default function SkeuomorphismPage() {
  return (
    <main className="skeu-page skeu-landing"><StylePageHeader /><section className="skeu-front-hero"><div className="skeu-front-copy"><span className="skeu-kicker">Diseño digital con tacto</span><h1>Lo familiar<br /><em>se siente mejor.</em></h1><p>Diseñamos interfaces que toman lo mejor del mundo físico: claridad, textura y una respuesta que puedes sentir.</p><a className="skeu-front-button" href="#detalle">Explorar el enfoque <ArrowRight size={16} /></a><div className="skeu-front-proof"><Check size={15} /> Diseñado para personas, no para métricas</div></div><div className="skeu-front-object"><div className="skeu-front-plate"><div className="skeu-front-screen"><div className="skeu-screen-bar"><span /> <span /> <span /></div><span className="skeu-kicker">TODAY'S NOTE</span><strong>Make room<br />for good work.</strong><div className="skeu-screen-line" /><small>09:41 · ready to begin</small></div><div className="skeu-front-knob" /><div className="skeu-front-label"><Coffee size={14} /> SIMPLE TOOLS<br /><b>BEAUTIFUL DAYS</b></div></div></div></section><section className="skeu-detail" id="detalle"><div className="skeu-detail-heading"><span className="skeu-kicker">El detalle importa</span><h2>Digital,<br /><em>pero humano.</em></h2></div><div className="skeu-detail-grid">{details.map(({ icon: Icon, title, text }, index) => <article className="skeu-detail-card" key={title}><span className="skeu-detail-number">0{index + 1}</span><div className="skeu-detail-icon"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="skeu-quote"><div className="skeu-quote-mark">“</div><p>Una interfaz bien hecha no te pide atención.<br /><em>Te devuelve la tuya.</em></p></section><section className="skeu-front-cta"><span className="skeu-kicker">Tu próxima interfaz</span><h2>Hagámosla<br /><em>inolvidable.</em></h2><a className="skeu-front-button" href="mailto:hola@aionsite.com">Comenzar conversación <ArrowRight size={16} /></a></section><StylePageFooter /></main>
  );
}

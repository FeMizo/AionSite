"use client";

import { StylePageFooter, StylePageHeader } from "@/src/components/StylePageChrome";
import { ArrowRight, Leaf, Menu, Sparkles, Sun, Waves } from "lucide-react";

const rituals = [
  { icon: Sun, title: "Pausa solar", text: "15 min para volver a tu centro." },
  { icon: Waves, title: "Respira lento", text: "Prácticas guiadas para soltar el ruido." },
  { icon: Leaf, title: "Vuelve a ti", text: "Pequeños hábitos, cambios duraderos." },
];

export default function ClaymorphismPage() {
  return (
    <main className="clay-page">
      <StylePageHeader />
      <section className="clay-hero"><div className="clay-hero-copy"><p className="clay-eyebrow"><Sparkles size={15} /> Bienestar para días reales</p><h1>Haz espacio<br /><em>para estar.</em></h1><p className="clay-lede">Una biblioteca suave de rituales para bajar el ritmo, escuchar tu cuerpo y encontrar tu propia forma de calma.</p><a className="clay-button" href="#comenzar">Explorar rituales <ArrowRight size={17} /></a><div className="clay-proof"><div className="clay-avatars"><span>LM</span><span>AR</span><span>+2k</span></div><span>Personas creando<br />mejores pausas</span></div></div><div className="clay-orbit" aria-label="Ilustración decorativa de una flor"><div className="clay-blob clay-blob-a" /><div className="clay-blob clay-blob-b" /><div className="clay-flower"><span /><span /><span /><span /><b>calma</b></div><div className="clay-note clay-note-top">tu momento<br /><strong>01:24</strong></div><div className="clay-note clay-note-bottom">sin prisa<br /><strong>☼</strong></div></div></section>
      <section className="clay-rituals" id="rituales"><div className="clay-section-heading"><p className="clay-eyebrow">Tres caminos de entrada</p><h2>Empieza<br /><em>despacio.</em></h2></div><div className="clay-ritual-grid">{rituals.map(({ icon: Icon, title, text }, index) => <article className={`clay-card clay-card-${index + 1}`} key={title}><div className="clay-card-icon"><Icon size={25} /></div><span className="clay-card-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#comenzar">Ver práctica <ArrowRight size={15} /></a></article>)}</div></section>
      <section className="clay-manifesto" id="manifiesto"><div className="clay-manifesto-mark">“</div><p>No necesitas<br /><em>arreglarte.</em><br />Solo escucharte.</p><div className="clay-manifesto-line" /></section>
      <section className="clay-cta" id="comenzar"><div><p className="clay-eyebrow">Tu primera pausa</p><h2>Hoy puede<br />sentirse <em>distinto.</em></h2></div><div className="clay-cta-panel"><span>01 / 03</span><h3>Respiración<br />de llegada</h3><p>Un audio de tres minutos para aterrizar donde ya estás.</p><button>Comenzar ahora <ArrowRight size={17} /></button></div></section>
      <StylePageFooter />
    </main>
  );
}

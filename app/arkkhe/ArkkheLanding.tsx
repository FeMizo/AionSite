"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const vectors = [
  ["01", "Sitios web", "Páginas web rápidas, claras y preparadas para convertir visitas en oportunidades.", "01.84"],
  ["02", "Tiendas online", "Catálogos, pagos y pedidos en una experiencia digital que sí vende.", "02.27"],
  ["03", "Mantenimiento", "Actualizaciones, mejoras y soporte continuo para que tu sitio siga funcionando.", "03.11"],
  ["04", "Redes sociales", "Contenido estratégico para que tu marca se vea, conecte y genere conversación.", "04.06"],
  ["05", "SEO local", "Una presencia optimizada para que tus clientes te encuentren cuando te necesitan.", "05.40"],
  ["06", "Contenido", "Mensajes, imágenes y estructura pensados para comunicar el valor de tu negocio.", "06.28"],
  ["07", "Integraciones", "Conectamos formularios, WhatsApp, analítica y herramientas sin complicar tu operación.", "07.09"],
  ["08", "Optimización", "Medimos, corregimos y evolucionamos cada parte de tu presencia digital.", "08.72"],
] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function DigitalBackdrop() {
  return <div className="arkkhe-digital-backdrop" aria-hidden="true" />;
}

export default function ArkkheLanding() {
  const [active, setActive] = useState(0);
  const current = vectors[active];
  const reduce = useReducedMotion();

  useEffect(() => { document.body.classList.add("arkkhe-body"); return () => document.body.classList.remove("arkkhe-body"); }, []);

  return (
    <div className="arkkhe-shell">
      <DigitalBackdrop />
      <main className="arkkhe-main">
        <section id="home" className="arkkhe-hero">
          <div className="arkkhe-kicker"><span>AIONSITE / DIGITAL STUDIO</span><span>SISTEMA EN LÍNEA / 2026</span></div>
          <div className="arkkhe-hero-copy">
            <Reveal><p className="arkkhe-overline">Presencia digital / hecha para crecer</p></Reveal>
            <Reveal delay={0.12}><h1>Tu negocio<br /><em>merece</em><br /><span>más.</span></h1></Reveal>
            <Reveal delay={0.25}><p className="arkkhe-hero-lede">Creamos sitios web que presentan tu valor, venden tus servicios y trabajan por tu negocio todos los días.</p></Reveal>
          </div>
          <div className="arkkhe-hero-bottom"><span className="arkkhe-scroll">↘ DESPLAZA PARA EXPLORAR</span><span className="arkkhe-coordinate">DISEÑO / DESARROLLO / CRECIMIENTO</span></div>
          <div className="arkkhe-hero-index"><strong>001</strong><span>/ 08</span></div>
        </section>

        <section id="system" className="arkkhe-section arkkhe-system">
          <Reveal><div className="arkkhe-section-head"><span className="arkkhe-number">01</span><div><p className="arkkhe-overline">La base</p><h2>Una web<br /><em>que trabaja.</em></h2></div><p className="arkkhe-section-intro">Tu sitio debe explicar lo que haces, generar confianza y facilitar el siguiente paso.</p></div></Reveal>
          <div className="arkkhe-split">
            <Reveal delay={0.1}><div className="arkkhe-plate arkkhe-site-preview"><div className="arkkhe-preview-top">TU MARCA <span>Servicios&nbsp;&nbsp; Nosotros&nbsp;&nbsp; Contacto</span></div><div className="arkkhe-preview-body"><small>ESTRATEGIA DIGITAL / 001</small><strong>Haz que te<br /><em>encuentren.</em></strong><span className="arkkhe-preview-button">CONOCE MÁS ↗</span></div></div></Reveal>
            <Reveal delay={0.18}><div className="arkkhe-spec-list"><p className="arkkhe-overline">Diseño / desarrollo / soporte</p><h3>Todo lo que<br />tu marca necesita.</h3><p>Desde una landing de venta hasta una plataforma completa: construimos soluciones digitales claras, rápidas y fáciles de mantener.</p><div className="arkkhe-specs"><span>01 / VELOCIDAD<br /><b>RÁPIDA Y RESPONSIVA</b></span><span>02 / CONVERSIÓN<br /><b>CTA QUE GUÍA</b></span><span>03 / SOPORTE<br /><b>SIEMPRE CONTIGO</b></span></div></div></Reveal>
          </div>
        </section>

        <section id="modules" className="arkkhe-section arkkhe-modules">
          <Reveal><div className="arkkhe-section-head"><span className="arkkhe-number">02</span><div><p className="arkkhe-overline">Lo que hacemos</p><h2>Elige tu<br /><em>solución.</em></h2></div><p className="arkkhe-section-intro">Servicios digitales pensados para el momento real de tu negocio.</p></div></Reveal>
          <div className="arkkhe-vector-grid">{vectors.map((vector, index) => <button key={vector[0]} className={`arkkhe-vector ${active === index ? "is-active" : ""}`} onClick={() => setActive(index)} aria-pressed={active === index}><span className="arkkhe-vector-no">{vector[0]}</span><span className="arkkhe-vector-name">{vector[1]}</span><span className="arkkhe-vector-value">{vector[3]}</span><span className="arkkhe-arrow">↗</span></button>)}</div>
          <AnimatePresence mode="wait" initial={false}><motion.div className="arkkhe-live-copy" key={current[0]} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}><span>ACTIVE VECTOR / {current[0]}</span><p>{current[2]}</p></motion.div></AnimatePresence>
        </section>

        <section id="process" className="arkkhe-section arkkhe-process">
          <Reveal><div className="arkkhe-section-head"><span className="arkkhe-number">03</span><div><p className="arkkhe-overline">Cómo trabajamos</p><h2>Del plan<br /><em>a publicar.</em></h2></div></div></Reveal>
          <div className="arkkhe-process-list">{[["01", "Descubrimos", "Entendemos tu negocio, tus clientes y la oportunidad que quieres aprovechar."], ["02", "Diseñamos", "Convertimos la estrategia en una experiencia visual clara y memorable."], ["03", "Publicamos", "Desarrollamos, probamos y lanzamos una web lista para recibir clientes."], ["04", "Mantenemos", "Seguimos mejorando tu sitio, contenido y presencia en redes sociales."]].map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.08}><div className="arkkhe-process-row"><span className="arkkhe-process-no">{number}</span><h3>{title}</h3><p>{copy}</p><span className="arkkhe-process-arrow">↗</span></div></Reveal>)}</div>
        </section>

        <section className="arkkhe-section arkkhe-closing"><Reveal><p className="arkkhe-overline">Tu siguiente proyecto / 2026</p><h2>Tu web<br /><em>empieza</em><br />hoy<span>.</span></h2><div className="arkkhe-stats"><span><b>01</b> estrategia</span><span><b>02</b> diseño + código</span><span><b>∞</b> posibilidades</span></div></Reveal></section>
      </main>

    </div>
  );
}

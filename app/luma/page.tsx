import { ArrowUpRight, Check, Code2, Gauge, Layers3, Menu, Sparkles } from "lucide-react";
import design from "@/src/data/luma.json";
import "./luma.css";

const images = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=900&q=85",
];

export default function LumaPage() {
  return (
    <main className="luma-page" style={{
      "--ref-ink": design.designTokens.colors.ink,
      "--ref-paper": design.designTokens.colors.paper,
      "--ref-cream": design.designTokens.colors.cream,
      "--ref-terracotta": design.designTokens.colors.terracotta,
      "--ref-terracottaDark": design.designTokens.colors.terracottaDark,
      "--ref-line": design.designTokens.colors.line,
      "--ref-muted": design.designTokens.colors.muted,
    } as React.CSSProperties}>
      <div className="luma-noise" aria-hidden="true" />
      <header className="luma-header">
        <a className="luma-logo" href="#top" aria-label="AionSite inicio"><span>A</span><strong>{design.content.brand}</strong></a>
        <nav>{design.content.nav.map((item) => <a key={item} href={`#${item === "Maquillaje" ? "top" : item === "Consejos" ? "consejos" : item === "Colección" ? "coleccion" : "contacto"}`}>{item}</a>)}</nav>
        <a className="luma-search" href="#contacto">Contactar <ArrowUpRight size={15} /></a>
        <button className="luma-menu" aria-label="Abrir menú"><Menu size={19} /></button>
      </header>

      <section className="luma-hero" id="top">
        <div className="hero-copy">
          <p className="luma-kicker">{design.content.eyebrow}</p>
          <h1>{design.content.headline.map((line, index) => <span key={line} className={index === 1 || index === 3 ? "accent" : ""}>{line}</span>)}</h1>
          <div className="hero-rule" />
          <p className="hero-description">{design.content.description}</p>
          <a className="luma-button" href="#contacto">{design.content.cta} <ArrowUpRight size={17} /></a>
        </div>
        <div className="browser-stage" aria-label="Vista previa de proyecto">
          <div className="browser-window">
            <div className="browser-bar"><span>AIONSITE.COM</span><div><i /><i /><i /></div></div>
            <div className="browser-hero">
              <div className="browser-copy"><small>EVERYDAY BEAUTY ESSENTIALS</small><h2>Tu belleza, tus reglas.</h2><p>Color, textura y confianza para crear tu propio look.</p><a href="#coleccion">Explorar <ArrowUpRight size={14} /></a></div>
              <div className="browser-image" style={{ backgroundImage: `url(${images[0]})` }} />
            </div>
            <div className="browser-footer"><span>Scroll to discover</span><span>01 / 04</span></div>
          </div>
          <div className="floating-note"><Sparkles size={16} /> Dirección visual con propósito</div>
        </div>
      </section>

      <section className="luma-promise" id="consejos">
        <div className="promise-intro"><p className="luma-kicker">{design.content.promise.eyebrow}</p><h2>{design.content.promise.title}</h2><p>{design.content.promise.description}</p></div>
        <div className="promise-image" style={{ backgroundImage: `url(${images[1]})` }}><span>Made to be seen</span></div>
        <div className="promise-pillars">{design.content.promise.pillars.map((pillar, index) => <article key={pillar.title}><div className="pillar-icon">{index === 0 ? <Layers3 size={20} /> : index === 1 ? <Gauge size={20} /> : <Code2 size={20} />}</div><h3>{pillar.title}</h3><p>{pillar.description}</p></article>)}</div>
      </section>

      <section className="luma-collection" id="coleccion"><div className="collection-heading"><p className="luma-kicker">{design.content.collection.eyebrow}</p><h2>{design.content.collection.title}</h2></div><div className="collection-grid">{design.content.collection.items.map((item, index) => <article key={item} className="collection-card"><div className="collection-image" style={{ backgroundImage: `url(${images[index]})` }} /><div className="collection-meta"><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><ArrowUpRight size={18} /></div></article>)}</div></section>

      <section className="luma-cta" id="contacto"><div className="cta-mark"><Check size={24} /></div><p>{design.content.closing}</p><a className="luma-button light" href="/">Crear algo extraordinario <ArrowUpRight size={17} /></a></section>
      <footer className="luma-footer"><span>© 2026 {design.content.brand}</span><span>Color · Cuidado · Expresión</span><span>Hecho con intención</span></footer>
    </main>
  );
}


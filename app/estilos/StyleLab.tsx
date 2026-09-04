"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Eye, Palette, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

const styles = [
  { name: "KV / Luma", route: "/luma", type: "Editorial makeup", description: "Belleza cálida, composición editorial y terracota premium.", colors: ["#c97854", "#fffaf5", "#191716"], className: "luma" },
  { name: "Arkkhe", route: "/arkkhe", type: "Luxury digital", description: "Presencia sofisticada con ritmo cinematográfico y contraste.", colors: ["#d8ff3e", "#171717", "#f5f0e8"], className: "arkkhe" },
  { name: "Special UI", route: "/specialui", type: "Signal system", description: "Interfaz oscura, técnica y orientada a señales medibles.", colors: ["#d9ff5f", "#11120f", "#eee9df"], className: "special" },
  { name: "Spatial UI", route: "/spatial-ui", type: "Immersive product", description: "Profundidad, movimiento y capas para una experiencia espacial.", colors: ["#8b5cf6", "#111827", "#dbeafe"], className: "spatial" },
  { name: "Claymorphism", route: "/claymorphism", type: "Soft interface", description: "Volúmenes suaves, sombras táctiles y una energía amigable.", colors: ["#f4a261", "#fff3e8", "#264653"], className: "clay" },
  { name: "Skeuomorphism", route: "/skeuomorphism", type: "Tactile interface", description: "Materiales, controles y detalles inspirados en objetos físicos.", colors: ["#b9f227", "#121212", "#f1f1ed"], className: "skeuo" },
];

export default function StyleLab() {
  const [selected, setSelected] = useState(0);
  const [accent, setAccent] = useState(styles[0].colors[0]);
  const [background, setBackground] = useState(styles[0].colors[1]);
  const [text, setText] = useState(styles[0].colors[2]);
  const [radius, setRadius] = useState(24);
  const [scale, setScale] = useState(100);
  const [spacing, setSpacing] = useState(24);
  const style = styles[selected];

  function selectStyle(index: number) {
    setSelected(index);
    setAccent(styles[index].colors[0]);
    setBackground(styles[index].colors[1]);
    setText(styles[index].colors[2]);
  }

  function reset() {
    selectStyle(selected);
    setRadius(24);
    setScale(100);
    setSpacing(24);
  }

  return <main className="style-lab">
    <header className="style-lab-header">
      <Link href="/" className="lab-brand"><Image src="/logo-aionsite.png" alt="AionSite" width={160} height={40} priority /><small>Style Lab</small></Link>
      <div className="lab-status"><i /> Exploraciones visuales <span>2026</span></div>
      <Link href="/" className="lab-exit">Salir <ArrowUpRight size={15} /></Link>
    </header>
    <section className="lab-intro"><div><p className="lab-eyebrow"><Palette size={14} /> Biblioteca de estilos</p><h1>Diseño<br /><em>en movimiento.</em></h1></div><div className="lab-intro-copy"><p>Explora cada dirección visual y adapta sus decisiones hasta encontrar una combinación propia.</p><div className="lab-count"><strong>06</strong><span>direcciones<br />disponibles</span></div></div></section>
    <section className="style-grid" aria-label="Estilos disponibles">{styles.map((item, index) => <article className={`style-card ${item.className} ${selected === index ? "is-selected" : ""}`} key={item.name} onClick={() => selectStyle(index)}><button className="card-select" type="button" aria-label={`Probar ${item.name}`}><div className="card-top"><span>0{index + 1}</span><span>{item.type}</span><ArrowUpRight className="card-arrow" size={18} /></div><div className="card-preview"><div className="preview-orbit" /><div className="preview-window"><span /><span /><span /></div><strong>{item.className === "luma" ? "L" : item.name.split(" ")[0].slice(0, 1)}</strong></div><div className="card-bottom"><div><h2>{item.name}</h2><p>{item.description}</p></div><div className="swatches">{item.colors.map((color) => <i key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div></div></button><Link className="card-open" href={item.route}>Abrir página <ArrowUpRight size={13} /></Link></article>)}</section>
    <section className="playground" aria-label="Playground de estilo"><div className="playground-heading"><div><p className="lab-eyebrow"><Sparkles size={14} /> Playground en vivo</p><h2>{style.name}</h2></div><button className="reset-button" type="button" onClick={reset}><RotateCcw size={14} /> Restablecer</button></div><div className="playground-body"><div className="playground-preview" style={{ "--play-accent": accent, "--play-bg": background, "--play-text": text, "--play-radius": `${radius}px`, "--play-scale": scale / 100, "--play-spacing": `${spacing}px` } as React.CSSProperties}><div className="playback-top"><span>LIVE PREVIEW / {style.type}</span><span>01 — 04</span></div><div className="playback-main"><div><small>YOUR NEXT DIRECTION</small><strong>Diseña algo<br /><em>inolvidable.</em></strong><p>Prueba la mezcla de color, proporción y ritmo que mejor representa tu idea.</p><a href={style.route}>Ver estilo <ArrowUpRight size={14} /></a></div><div className="playback-shape"><span>{style.name.split(" ")[0].slice(0, 1)}</span></div></div></div><div className="playground-controls"><label>Color de acento<input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /><code>{accent}</code></label><label>Color de fondo<input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><code>{background}</code></label><label>Color de texto<input type="color" value={text} onChange={(event) => setText(event.target.value)} /><code>{text}</code></label><label>Radio <output>{radius}px</output><input type="range" min="0" max="60" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label><label>Escala <output>{scale}%</output><input type="range" min="80" max="125" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label><label>Espaciado <output>{spacing}px</output><input type="range" min="12" max="48" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} /></label></div></div></section>
    <footer className="style-lab-footer"><span><Sparkles size={14} /> Hecho para comparar ideas</span><span><Eye size={14} /> Selecciona un estilo para probarlo</span></footer>
  </main>;
}

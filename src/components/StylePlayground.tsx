"use client";

import { Paintbrush, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = { rootSelector: string; accent: string; background: string; text: string };

export function StylePlayground({ rootSelector, accent: initialAccent, background: initialBackground, text: initialText }: Props) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState(initialAccent);
  const [background, setBackground] = useState(initialBackground);
  const [text, setText] = useState(initialText);
  const [radius, setRadius] = useState(24);
  const [scale, setScale] = useState(100);
  const [spacing, setSpacing] = useState(24);
  const reset = () => { setAccent(initialAccent); setBackground(initialBackground); setText(initialText); setRadius(24); setScale(100); setSpacing(24); };
  const themeVars = rootSelector === ".luma-page"
    ? `--ref-terracotta: ${accent} !important; --ref-terracottaDark: ${accent} !important; --ref-paper: ${background} !important; --ref-cream: ${background} !important; --ref-ink: ${text} !important; --ref-muted: ${text} !important;`
    : rootSelector === ".special-page"
      ? `--sp-lime: ${accent} !important; --sp-ink: ${background} !important; --sp-paper: ${text} !important; --sp-muted: ${text} !important;`
      : rootSelector === ".spatial-page"
        ? `--space-blue: ${accent} !important; --space-pink: ${accent} !important; --space-bg: ${background} !important; --space-paper: ${text} !important; --space-muted: ${text} !important;`
        : rootSelector === ".clay-page"
          ? `--clay-coral: ${accent} !important; --clay-sage: ${accent} !important; --clay-yellow: ${accent} !important; --clay-cream: ${background} !important; --clay-ink: ${text} !important;`
          : rootSelector === ".skeu-page"
            ? `--sk-green: ${accent} !important; --sk-paper: ${background} !important; --sk-ink: ${text} !important; --sk-muted: ${text} !important;`
            : `--ak-blue: ${accent} !important; --ak-purple: ${accent} !important; --ak-ink: ${background} !important; --ak-bone: ${text} !important; --ak-muted: ${text} !important;`;
  const liveStyles = `${rootSelector} { --play-accent: ${accent} !important; --play-bg: ${background} !important; --play-text: ${text} !important; --play-radius: ${radius}px !important; --play-scale: ${scale / 100} !important; --play-spacing: ${spacing}px !important; ${themeVars} zoom: var(--play-scale) !important; } ${rootSelector} h1 em, ${rootSelector} h2 em, ${rootSelector} a:not(.style-playground-control):not([class*="-button"]), ${rootSelector} button:not(.style-playground-control) { color: var(--play-accent) !important; border-color: var(--play-accent) !important; } ${rootSelector} section { padding-top: var(--play-spacing) !important; padding-bottom: var(--play-spacing) !important; } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { border-radius: var(--play-radius) !important; }`;
  return <>
    <style>{liveStyles}</style>
    <Link href="/estilos" className="style-playground-back">← Estilos</Link>
    <button type="button" className="style-playground-trigger style-playground-control" onClick={() => setOpen(true)}><Paintbrush size={16} /> Personalizar</button>
    {open && <aside className="style-playground-panel" aria-label="Personalizar estilo" style={{ "--play-accent": accent, "--play-bg": background, "--play-text": text } as React.CSSProperties}>
      <div className="style-playground-head"><div><span><SlidersHorizontal size={14} /> LIVE STYLE LAB</span><h2>Personalizar</h2></div><button className="style-playground-close style-playground-control" type="button" onClick={() => setOpen(false)} aria-label="Cerrar personalizador"><X size={18} /></button></div>
      <p className="style-playground-note">Ajusta la dirección visual y observa los cambios en esta página.</p>
      <div className="style-playground-surface" style={{ borderRadius: `${radius}px`, padding: `${spacing}px`, transform: `scale(${scale / 100})`, transformOrigin: "top left", width: `${10000 / scale}%` }}><small>PREVIEW / LIVE</small><strong>Tu idea<br /><em>toma forma.</em></strong><span style={{ background: accent }} /></div>
      <div className="style-playground-controls"><label>Acento <input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /><code>{accent}</code></label><label>Fondo <input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><code>{background}</code></label><label>Texto <input type="color" value={text} onChange={(event) => setText(event.target.value)} /><code>{text}</code></label><label>Radio <output>{radius}px</output><input type="range" min="0" max="64" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label><label>Escala <output>{scale}%</output><input type="range" min="80" max="120" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label><label>Espaciado <output>{spacing}px</output><input type="range" min="12" max="48" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} /></label></div>
      <button type="button" className="style-playground-reset style-playground-control" onClick={reset}><RotateCcw size={14} /> Restablecer</button>
    </aside>}
  </>;
}

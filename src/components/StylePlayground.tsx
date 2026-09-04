"use client";

import { Paintbrush, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = { rootSelector: string; accent: string; background: string; text: string; radius?: number; borderWidth?: number; borderStyle?: string; shadow?: number; fontFamily?: string; scale?: number; spacing?: number };

const fontOptions = ["Epilogue", "Bricolage Grotesque", "Cormorant Garamond", "DM Sans", "Space Mono", "Georgia"];
const fontStacks: Record<string, string> = { "Epilogue": "var(--font-epilogue), sans-serif", "Bricolage Grotesque": "var(--font-bricolage), sans-serif", "Cormorant Garamond": "Georgia, serif", "DM Sans": "Arial, sans-serif", "Space Mono": "monospace", "Georgia": "Georgia, serif" };

export function StylePlayground({ rootSelector, accent: initialAccent, background: initialBackground, text: initialText, radius: initialRadius = 24, borderWidth: initialBorderWidth = 1, borderStyle: initialBorderStyle = "solid", shadow: initialShadow = 24, fontFamily: initialFontFamily = "Epilogue", scale: initialScale = 100, spacing: initialSpacing = 24 }: Props) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState(initialAccent);
  const [background, setBackground] = useState(initialBackground);
  const [text, setText] = useState(initialText);
  const [radius, setRadius] = useState(initialRadius);
  const [borderWidth, setBorderWidth] = useState(initialBorderWidth);
  const [borderStyle, setBorderStyle] = useState(initialBorderStyle);
  const [shadow, setShadow] = useState(initialShadow);
  const [fontFamily, setFontFamily] = useState(initialFontFamily);
  const [scale, setScale] = useState(initialScale);
  const [spacing, setSpacing] = useState(initialSpacing);
  const reset = () => { setAccent(initialAccent); setBackground(initialBackground); setText(initialText); setRadius(initialRadius); setBorderWidth(initialBorderWidth); setBorderStyle(initialBorderStyle); setShadow(initialShadow); setFontFamily(initialFontFamily); setScale(initialScale); setSpacing(initialSpacing); };
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
  const liveStyles = `${rootSelector} { --play-accent: ${accent} !important; --play-bg: ${background} !important; --play-text: ${text} !important; --play-radius: ${radius}px !important; --play-border-width: ${borderWidth}px !important; --play-border-style: ${borderStyle} !important; --play-shadow: ${shadow}px !important; --play-font: ${fontStacks[fontFamily]} !important; --play-scale: ${scale / 100} !important; --play-spacing: ${spacing}px !important; ${themeVars} zoom: var(--play-scale) !important; } ${rootSelector} h1, ${rootSelector} h2, ${rootSelector} h3, ${rootSelector} h4, ${rootSelector} p, ${rootSelector} a:not(.style-playground-control):not([class*="-button"]), ${rootSelector} button:not(.style-playground-control) { font-family: var(--play-font) !important; } ${rootSelector} h1 em, ${rootSelector} h2 em, ${rootSelector} a:not(.style-playground-control):not([class*="-button"]), ${rootSelector} button:not(.style-playground-control) { color: var(--play-accent) !important; border-color: var(--play-accent) !important; } ${rootSelector} section { padding-top: var(--play-spacing) !important; padding-bottom: var(--play-spacing) !important; } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { border-radius: var(--play-radius) !important; border-width: var(--play-border-width) !important; border-style: var(--play-border-style) !important; box-shadow: 0 var(--play-shadow) calc(var(--play-shadow) * 2) rgb(0 0 0 / .18) !important; }`;
  return <>
    <style>{liveStyles}</style>
    <Link href="/estilos" className="style-playground-back">← Estilos</Link>
    <button type="button" className="style-playground-trigger style-playground-control" onClick={() => setOpen(true)}><Paintbrush size={16} /> Personalizar</button>
    {open && <aside className="style-playground-panel" aria-label="Personalizar estilo" style={{ "--play-accent": accent, "--play-bg": background, "--play-text": text } as React.CSSProperties}>
      <div className="style-playground-head"><div><span><SlidersHorizontal size={14} /> LIVE STYLE LAB</span><h2>Personalizar</h2></div><button className="style-playground-close style-playground-control" type="button" onClick={() => setOpen(false)} aria-label="Cerrar personalizador"><X size={18} /></button></div>
      <p className="style-playground-note">Ajusta la dirección visual y observa los cambios en esta página.</p>
      <div className="style-playground-surface" style={{ borderRadius: `${radius}px`, padding: `${spacing}px`, transform: `scale(${scale / 100})`, transformOrigin: "top left", width: `${10000 / scale}%`, border: `${borderWidth}px ${borderStyle} ${accent}`, boxShadow: `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,.22)`, fontFamily: fontStacks[fontFamily] }}><small>PREVIEW / LIVE</small><strong>Tu idea<br /><em>toma forma.</em></strong><span style={{ background: accent }} /></div>
      <div className="style-playground-controls"><fieldset><legend>Colores</legend><label>Acento <input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /><code>{accent}</code></label><label>Fondo <input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><code>{background}</code></label><label>Texto <input type="color" value={text} onChange={(event) => setText(event.target.value)} /><code>{text}</code></label></fieldset><fieldset><legend>Bordes y sombra</legend><label>Radio <output>{radius}px</output><input type="range" min="0" max="64" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label><label>Grosor <output>{borderWidth}px</output><input type="range" min="0" max="4" value={borderWidth} onChange={(event) => setBorderWidth(Number(event.target.value))} /></label><label>Estilo <select value={borderStyle} onChange={(event) => setBorderStyle(event.target.value)}><option value="solid">Sólido</option><option value="dashed">Rayado</option><option value="dotted">Punteado</option></select></label><label>Sombra <output>{shadow}px</output><input type="range" min="0" max="50" value={shadow} onChange={(event) => setShadow(Number(event.target.value))} /></label></fieldset><fieldset><legend>Tamaños y tipografía</legend><label>Escala <output>{scale}%</output><input type="range" min="80" max="120" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label><label>Espaciado <output>{spacing}px</output><input type="range" min="12" max="60" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} /></label><label>Tipografía <select value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>{fontOptions.map((font) => <option key={font} value={font}>{font}</option>)}</select></label></fieldset></div>
      <button type="button" className="style-playground-reset style-playground-control" onClick={reset}><RotateCcw size={14} /> Restablecer</button>
    </aside>}
  </>;
}

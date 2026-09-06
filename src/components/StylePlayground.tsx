"use client";

import { Paintbrush, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { rootSelector: string; accent: string; secondary?: string; background: string; surface?: string; text: string; muted?: string; radius?: number; borderWidth?: number; borderStyle?: string; shadow?: number; headingFontFamily?: string; bodyFontFamily?: string; scale?: number; spacing?: number };

const fontOptions = ["Epilogue", "Bricolage Grotesque", "Cormorant Garamond", "DM Sans", "Space Mono", "Georgia"];
const fontStacks: Record<string, string> = { "Epilogue": "var(--font-epilogue), sans-serif", "Bricolage Grotesque": "var(--font-bricolage), sans-serif", "Cormorant Garamond": "Georgia, serif", "DM Sans": "Arial, sans-serif", "Space Mono": "monospace", "Georgia": "Georgia, serif" };

export function StylePlayground({ rootSelector, accent: initialAccent, secondary: initialSecondary = initialAccent, background: initialBackground, surface: initialSurface = initialBackground, text: initialText, muted: initialMuted = initialText, radius: initialRadius = 24, borderWidth: initialBorderWidth = 1, borderStyle: initialBorderStyle = "solid", shadow: initialShadow = 24, headingFontFamily: initialHeadingFontFamily = "Bricolage Grotesque", bodyFontFamily: initialBodyFontFamily = "Epilogue", scale: initialScale = 100, spacing: initialSpacing = 24 }: Props) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState(initialAccent);
  const [secondary, setSecondary] = useState(initialSecondary);
  const [background, setBackground] = useState(initialBackground);
  const [surface, setSurface] = useState(initialSurface);
  const [text, setText] = useState(initialText);
  const [muted, setMuted] = useState(initialMuted);
  const [radius, setRadius] = useState(initialRadius);
  const [borderWidth, setBorderWidth] = useState(initialBorderWidth);
  const [borderStyle, setBorderStyle] = useState(initialBorderStyle);
  const [shadow, setShadow] = useState(initialShadow);
  const [headingFontFamily, setHeadingFontFamily] = useState(initialHeadingFontFamily);
  const [bodyFontFamily, setBodyFontFamily] = useState(initialBodyFontFamily);
  const [scale, setScale] = useState(initialScale);
  const [spacing, setSpacing] = useState(initialSpacing);
  const reset = () => { setAccent(initialAccent); setSecondary(initialSecondary); setBackground(initialBackground); setSurface(initialSurface); setText(initialText); setMuted(initialMuted); setRadius(initialRadius); setBorderWidth(initialBorderWidth); setBorderStyle(initialBorderStyle); setShadow(initialShadow); setHeadingFontFamily(initialHeadingFontFamily); setBodyFontFamily(initialBodyFontFamily); setScale(initialScale); setSpacing(initialSpacing); };
  const isDirty = accent !== initialAccent || secondary !== initialSecondary || background !== initialBackground || surface !== initialSurface || text !== initialText || muted !== initialMuted || radius !== initialRadius || borderWidth !== initialBorderWidth || borderStyle !== initialBorderStyle || shadow !== initialShadow || headingFontFamily !== initialHeadingFontFamily || bodyFontFamily !== initialBodyFontFamily || scale !== initialScale || spacing !== initialSpacing;
  const accentDirty = accent !== initialAccent;
  const secondaryDirty = secondary !== initialSecondary;
  const backgroundDirty = background !== initialBackground;
  const surfaceDirty = surface !== initialSurface;
  const textDirty = text !== initialText;
  const mutedDirty = muted !== initialMuted;
  const radiusDirty = radius !== initialRadius;
  const borderWidthDirty = borderWidth !== initialBorderWidth;
  const borderStyleDirty = borderStyle !== initialBorderStyle;
  const shadowDirty = shadow !== initialShadow;
  const headingDirty = headingFontFamily !== initialHeadingFontFamily;
  const bodyDirty = bodyFontFamily !== initialBodyFontFamily;
  const scaleDirty = scale !== initialScale;
  const spacingDirty = spacing !== initialSpacing;
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root || !isDirty) return;
    const sides = ["top", "right", "bottom", "left"] as const;
    const tagged: Array<{ element: HTMLElement; side: (typeof sides)[number] }> = [];
    [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))].forEach((element) => {
      if (element.matches("h1, h2, h3, h4")) return;
      const style = getComputedStyle(element);
      sides.forEach((side) => {
        const width = style[`border${side[0].toUpperCase()}${side.slice(1)}Width` as "borderTopWidth" | "borderRightWidth" | "borderBottomWidth" | "borderLeftWidth"];
        const borderStyle = style[`border${side[0].toUpperCase()}${side.slice(1)}Style` as "borderTopStyle" | "borderRightStyle" | "borderBottomStyle" | "borderLeftStyle"];
        if (Number.parseFloat(width) > 0 && borderStyle !== "none") {
          element.setAttribute(`data-playground-border-${side}`, "true");
          tagged.push({ element, side });
        }
      });
    });
    return () => tagged.forEach(({ element, side }) => element.removeAttribute(`data-playground-border-${side}`));
  }, [rootSelector, isDirty]);
  const themeVars = rootSelector === ".luma-page"
    ? { accent: `--ref-terracotta: ${accent} !important;`, secondary: `--ref-terracottaDark: ${secondary} !important;`, background: `--ref-paper: ${background} !important;`, surface: `--ref-cream: ${surface} !important;`, text: `--ref-ink: ${text} !important;`, muted: `--ref-muted: ${muted} !important;` }
    : rootSelector === ".special-page"
      ? { accent: `--sp-lime: ${accent} !important;`, secondary: "", background: `--sp-ink: ${background} !important;`, surface: "", text: `--sp-paper: ${text} !important;`, muted: `--sp-muted: ${muted} !important;` }
      : rootSelector === ".spatial-page"
        ? { accent: `--space-blue: ${accent} !important;`, secondary: `--space-pink: ${secondary} !important;`, background: `--space-bg: ${background} !important;`, surface: "", text: `--space-paper: ${text} !important;`, muted: `--space-muted: ${muted} !important;` }
        : rootSelector === ".clay-page"
          ? { accent: `--clay-coral: ${accent} !important;`, secondary: `--clay-sage: ${secondary} !important;`, background: `--clay-cream: ${background} !important;`, surface: `--clay-yellow: ${surface} !important;`, text: `--clay-ink: ${text} !important;`, muted: "" }
          : rootSelector === ".skeu-page"
            ? { accent: `--sk-green: ${accent} !important;`, secondary: "", background: "", surface: `--sk-paper: ${surface} !important;`, text: `--sk-ink: ${text} !important;`, muted: `--sk-muted: ${muted} !important;` }
            : { accent: `--ak-blue: ${accent} !important; --color-primary: ${accent} !important;`, secondary: `--ak-purple: ${secondary} !important; --color-accent: ${secondary} !important;`, background: `--ak-ink: ${background} !important; --color-background: ${background} !important;`, surface: "", text: `--ak-bone: ${text} !important;`, muted: `--ak-muted: ${muted} !important;` };
  const liveStyles = isDirty ? [
    accentDirty ? `${rootSelector} { --play-accent: ${accent} !important; ${themeVars.accent} } ${rootSelector} h1 em, ${rootSelector} a:not(.style-playground-control):not([class*="-button"]), ${rootSelector} button:not(.style-playground-control) { color: var(--play-accent) !important; }` : "",
    secondaryDirty ? `${rootSelector} { --play-secondary: ${secondary} !important; ${themeVars.secondary} } ${rootSelector} h2 em { color: var(--play-secondary) !important; }` : "",
    backgroundDirty ? `${rootSelector} { --play-bg: ${background} !important; ${themeVars.background} }` : "",
    surfaceDirty ? `${rootSelector} { --play-surface: ${surface} !important; ${themeVars.surface} } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { background-color: var(--play-surface) !important; }` : "",
    textDirty ? `${rootSelector} { --play-text: ${text} !important; color: var(--play-text) !important; ${themeVars.text} } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { color: var(--play-text) !important; }` : "",
    mutedDirty ? `${rootSelector} { --play-muted: ${muted} !important; ${themeVars.muted} } ${rootSelector} .clay-eyebrow, ${rootSelector} .clay-proof, ${rootSelector} .clay-lede { color: var(--play-muted) !important; }` : "",
    radiusDirty ? `${rootSelector} { --play-radius: ${radius}px !important; } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { border-radius: var(--play-radius) !important; }` : "",
    borderWidthDirty ? `${rootSelector} { --play-border-width: ${borderWidth}px !important; } ${rootSelector} [data-playground-border-top] { border-top-width: var(--play-border-width) !important; } ${rootSelector} [data-playground-border-right] { border-right-width: var(--play-border-width) !important; } ${rootSelector} [data-playground-border-bottom] { border-bottom-width: var(--play-border-width) !important; } ${rootSelector} [data-playground-border-left] { border-left-width: var(--play-border-width) !important; }` : "",
    borderStyleDirty ? `${rootSelector} { --play-border-style: ${borderStyle} !important; } ${rootSelector} [data-playground-border-top] { border-top-style: var(--play-border-style) !important; } ${rootSelector} [data-playground-border-right] { border-right-style: var(--play-border-style) !important; } ${rootSelector} [data-playground-border-bottom] { border-bottom-style: var(--play-border-style) !important; } ${rootSelector} [data-playground-border-left] { border-left-style: var(--play-border-style) !important; }` : "",
    shadowDirty ? `${rootSelector} { --play-shadow: ${shadow}px !important; } ${rootSelector} article, ${rootSelector} [class*="card"], ${rootSelector} [class*="panel"], ${rootSelector} [class*="plate"] { box-shadow: 0 var(--play-shadow) calc(var(--play-shadow) * 2) rgb(0 0 0 / .18) !important; }` : "",
    headingDirty ? `${rootSelector} { --play-heading-font: ${fontStacks[headingFontFamily]} !important; } ${rootSelector} h1, ${rootSelector} h2, ${rootSelector} h3, ${rootSelector} h4 { font-family: var(--play-heading-font) !important; }` : "",
    bodyDirty ? `${rootSelector} { --play-body-font: ${fontStacks[bodyFontFamily]} !important; } ${rootSelector} p, ${rootSelector} a:not(.style-playground-control):not([class*="-button"]), ${rootSelector} button:not(.style-playground-control) { font-family: var(--play-body-font) !important; }` : "",
    scaleDirty ? `${rootSelector} { --play-scale: ${scale / 100} !important; zoom: var(--play-scale) !important; }` : "",
    spacingDirty ? `${rootSelector} { --play-spacing: ${spacing}px !important; } ${rootSelector} section { padding-top: var(--play-spacing) !important; padding-bottom: var(--play-spacing) !important; }` : "",
  ].join(" ") : "";
  return <>
    <style>{liveStyles}</style>
    <Link href="/estilos" className="style-playground-back">← Estilos</Link>
    <button type="button" className="style-playground-trigger style-playground-control" onClick={() => setOpen((value) => !value)} aria-expanded={open}><Paintbrush size={16} /> Personalizar</button>
    {open && <aside className="style-playground-panel" aria-label="Personalizar estilo" style={{ "--play-accent": accent, "--play-secondary": secondary, "--play-bg": background, "--play-surface": surface, "--play-text": text, "--play-muted": muted } as React.CSSProperties}>
      <div className="style-playground-head"><div><span><SlidersHorizontal size={14} /> LIVE STYLE LAB</span><h2>Personalizar</h2></div><button className="style-playground-close style-playground-control" type="button" onClick={() => setOpen(false)} aria-label="Cerrar personalizador"><X size={18} /></button></div>
      <p className="style-playground-note">Ajusta la dirección visual y observa los cambios en esta página.</p>
      <div className="style-playground-surface" style={{ borderRadius: `${radius}px`, padding: `${spacing}px`, transform: `scale(${scale / 100})`, transformOrigin: "top left", width: `${10000 / scale}%`, border: `${borderWidth}px ${borderStyle} ${secondary}`, background: surface, color: text, boxShadow: `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,.22)`, fontFamily: fontStacks[bodyFontFamily] }}><small style={{ color: muted }}>PREVIEW / LIVE</small><strong style={{ fontFamily: fontStacks[headingFontFamily] }}>Tu idea<br /><em style={{ color: accent }}>toma forma.</em></strong><span style={{ background: secondary }} /></div>
      <div className="style-playground-controls"><fieldset><legend>Colores</legend><label>Acento <input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /><code>{accent}</code></label><label>Secundario <input type="color" value={secondary} onChange={(event) => setSecondary(event.target.value)} /><code>{secondary}</code></label><label>Fondo <input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><code>{background}</code></label><label>Superficie <input type="color" value={surface} onChange={(event) => setSurface(event.target.value)} /><code>{surface}</code></label><label>Texto <input type="color" value={text} onChange={(event) => setText(event.target.value)} /><code>{text}</code></label><label>Texto suave <input type="color" value={muted} onChange={(event) => setMuted(event.target.value)} /><code>{muted}</code></label></fieldset><fieldset><legend>Bordes y sombra</legend><label>Radio <output>{radius}px</output><input type="range" min="0" max="64" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label><label>Grosor <output>{borderWidth}px</output><input type="range" min="0" max="4" value={borderWidth} onChange={(event) => setBorderWidth(Number(event.target.value))} /></label><label>Estilo <select value={borderStyle} onChange={(event) => setBorderStyle(event.target.value)}><option value="solid">Sólido</option><option value="dashed">Rayado</option><option value="dotted">Punteado</option></select></label><label>Sombra <output>{shadow}px</output><input type="range" min="0" max="50" value={shadow} onChange={(event) => setShadow(Number(event.target.value))} /></label></fieldset><fieldset><legend>Tamaños y tipografía</legend><label>Escala <output>{scale}%</output><input type="range" min="80" max="120" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label><label>Espaciado <output>{spacing}px</output><input type="range" min="12" max="60" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} /></label><label>Títulos <select value={headingFontFamily} onChange={(event) => setHeadingFontFamily(event.target.value)}>{fontOptions.map((font) => <option key={font} value={font} disabled={font === bodyFontFamily}>{font}</option>)}</select></label><label>Texto <select value={bodyFontFamily} onChange={(event) => setBodyFontFamily(event.target.value)}>{fontOptions.map((font) => <option key={font} value={font} disabled={font === headingFontFamily}>{font}</option>)}</select></label></fieldset></div>
      <button type="button" className="style-playground-reset style-playground-control" onClick={reset}><RotateCcw size={14} /> Restablecer</button>
    </aside>}
  </>;
}

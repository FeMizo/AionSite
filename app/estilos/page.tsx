import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Eye, Palette, Sparkles } from "lucide-react";
import "./estilos.css";

export const metadata: Metadata = {
  title: "Style Lab | AionSite",
  description: "Galería privada de estilos visuales y exploraciones de interfaz de AionSite.",
};

const styles = [
  { name: "KV / Luma", route: "/design-reference", type: "Editorial makeup", description: "Belleza cálida, composición editorial y terracota premium.", colors: ["#c97854", "#fffaf5", "#191716"], className: "luma" },
  { name: "Arkkhe", route: "/arkkhe", type: "Luxury digital", description: "Presencia sofisticada con ritmo cinematográfico y contraste.", colors: ["#d8ff3e", "#171717", "#f5f0e8"], className: "arkkhe" },
  { name: "Special UI", route: "/specialui", type: "Signal system", description: "Interfaz oscura, técnica y orientada a señales medibles.", colors: ["#d9ff5f", "#11120f", "#eee9df"], className: "special" },
  { name: "Spatial UI", route: "/spatial-ui", type: "Immersive product", description: "Profundidad, movimiento y capas para una experiencia espacial.", colors: ["#8b5cf6", "#111827", "#dbeafe"], className: "spatial" },
  { name: "Claymorphism", route: "/claymorphism", type: "Soft interface", description: "Volúmenes suaves, sombras táctiles y una energía amigable.", colors: ["#f4a261", "#fff3e8", "#264653"], className: "clay" },
  { name: "Skeuomorphism", route: "/skeuomorphism", type: "Tactile interface", description: "Materiales, controles y detalles inspirados en objetos físicos.", colors: ["#b9f227", "#121212", "#f1f1ed"], className: "skeuo" },
];

export default function EstilosPage() {
  return (
    <main className="style-lab">
      <header className="style-lab-header">
        <Link href="/" className="lab-brand"><span>A</span><strong>AionSite</strong><small>Style Lab</small></Link>
        <div className="lab-status"><i /> Exploraciones visuales <span>2026</span></div>
        <Link href="/" className="lab-exit">Salir <ArrowUpRight size={15} /></Link>
      </header>

      <section className="lab-intro">
        <div><p className="lab-eyebrow"><Palette size={14} /> Biblioteca de estilos</p><h1>Diseño<br /><em>en movimiento.</em></h1></div>
        <div className="lab-intro-copy"><p>Un espacio personal para explorar las distintas direcciones visuales que estamos construyendo para AionSite.</p><div className="lab-count"><strong>06</strong><span>direcciones<br />disponibles</span></div></div>
      </section>

      <section className="style-grid" aria-label="Estilos disponibles">
        {styles.map((style, index) => <Link href={style.route} className={`style-card ${style.className}`} key={style.name}>
          <div className="card-top"><span>0{index + 1}</span><span>{style.type}</span><ArrowUpRight className="card-arrow" size={18} /></div>
          <div className="card-preview"><div className="preview-orbit" /><div className="preview-window"><span /><span /><span /></div><strong>{style.className === "luma" ? "L" : style.name.split(" ")[0].slice(0, 1)}</strong></div>
          <div className="card-bottom"><div><h2>{style.name}</h2><p>{style.description}</p></div><div className="swatches">{style.colors.map((color) => <i key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div></div>
        </Link>)}
      </section>

      <footer className="style-lab-footer"><span><Sparkles size={14} /> Hecho para comparar ideas</span><span><Eye size={14} /> Selecciona un estilo para verlo</span></footer>
    </main>
  );
}

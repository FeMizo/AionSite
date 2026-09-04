import type { Metadata } from "next";
import Link from "next/link";
import "./estilos.css";

export const metadata: Metadata = {
  title: "Style Lab | AionSite",
  description: "Galería privada de estilos visuales y exploraciones de interfaz de AionSite.",
};

export default function EstilosPage() {
  const styles = [
    ["Luma", "/luma"], ["Arkkhe", "/arkkhe"], ["Special UI", "/specialui"],
    ["Spatial UI", "/spatial-ui"], ["Claymorphism", "/claymorphism"], ["Skeuomorphism", "/skeuomorphism"],
  ];
  return <main className="style-lab style-index"><header className="style-lab-header"><Link href="/" className="lab-brand"><span>A</span><strong>AionSite</strong><small>Style Lab</small></Link><Link href="/" className="lab-exit">Salir</Link></header><section className="lab-intro"><div><p className="lab-eyebrow">Biblioteca de estilos</p><h1>Elige tu<br /><em>dirección.</em></h1></div><p className="lab-intro-copy">Entra a cualquier estilo para abrir su playground y personalizarlo en vivo.</p></section><section className="style-index-list" aria-label="Estilos disponibles">{styles.map(([name, href], index) => <Link key={href} href={href}><span>0{index + 1}</span><strong>{name}</strong><span>Personalizar ↗</span></Link>)}</section></main>;
}

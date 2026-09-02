import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { initialCmsContent } from "@/src/cms/site-content";
import { ScrollMotion } from "@/src/components/ScrollMotion";

const homeLogo = initialCmsContent.base.logoLight;
const homeName = initialCmsContent.base.name;

export function StylePageHeader() {
  return (
    <header className="style-page-header">
      <ScrollMotion />
      <Link href="/" className="style-page-brand" aria-label={`${homeName} inicio`}>
        <Image src={homeLogo} alt={homeName} width={160} height={40} className="style-page-logo-image" priority />
      </Link>
      <nav className="style-page-nav" aria-label="Navegación principal">
        <Link href="/#servicios">Servicios</Link><Link href="/#proyectos">Proyectos</Link><Link href="/#contacto">Contacto</Link>
      </nav>
      <Link href="/#contacto" className="style-page-cta">Hablemos <ArrowUpRight size={15} /></Link>
      <button className="style-page-menu" type="button" aria-label="Abrir menú"><Menu size={19} /></button>
    </header>
  );
}

export function StylePageFooter() {
  return (
    <footer className="style-page-footer">
      <Link href="/" className="style-page-brand"><Image src={homeLogo} alt={homeName} width={160} height={40} className="style-page-logo-image" /></Link>
      <div className="style-page-footer-links"><Link href="/#servicios">Servicios</Link><Link href="/#proyectos">Proyectos</Link><Link href="/#contacto">Contacto</Link></div>
      <span>© 2026 AionSite · Hecho en México</span>
    </footer>
  );
}

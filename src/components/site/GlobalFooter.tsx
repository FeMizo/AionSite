import Image from "next/image";
import Link from "@/src/components/ui/SiteLink";
import { initialCmsContent } from "@/src/cms/site-content";

const legal = [
  { name: "Privacidad", href: "/privacidad" },
  { name: "Términos", href: "/terminos" },
  { name: "Aviso legal", href: "/legales" },
];

/** The one footer used across every public page. Links and contact come from the CMS footer section. */
export function GlobalFooter() {
  const { base, sections } = initialCmsContent;
  const footer = sections.footer.data;
  const email = footer.email ?? base.email;
  const whatsapp = footer.whatsappLink ?? base.whatsappLink;

  return (
    <footer className="sc sc-footer">
      <div className="sc-footer__top">
        <div className="sc-footer__brand">
          <Link href="/" className="sc-logo" aria-label={`${base.name}, inicio`}>
            <Image src={base.logoLight ?? "/logo-aionsite.webp"} alt="" width={590} height={119} />
          </Link>
          <p>{footer.description}</p>
        </div>

        <nav aria-label="Sitio" className="sc-footer__col">
          <p className="sc-footer__title">Sitio</p>
          {footer.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.name}
            </Link>
          ))}
          <Link href="/blog">Blog</Link>
        </nav>

        <div className="sc-footer__col">
          <p className="sc-footer__title">Contacto</p>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span>Ciudad del Carmen, Campeche</span>
        </div>
      </div>

      <div className="sc-footer__bottom">
        <p>© {new Date().getFullYear()} {base.name}. Hecho en México.</p>
        <nav aria-label="Legal">
          {legal.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

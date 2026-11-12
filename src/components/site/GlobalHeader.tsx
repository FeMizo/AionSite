import Image from "next/image";
import Link from "@/src/components/ui/SiteLink";
import { initialCmsContent } from "@/src/cms/site-content";
import { MobileNav } from "./MobileNav";

/** The one header used across every public page. Navigation comes from the CMS header section. */
export function GlobalHeader() {
  const { base, sections } = initialCmsContent;
  const navigation = sections.header.data.navigation;
  const whatsapp = sections.header.data.whatsappLink ?? base.whatsappLink;

  return (
    <header className="sc sc-header">
      <Link href="/" className="sc-logo" aria-label={`${base.name}, inicio`}>
        <Image src={base.logoLight ?? "/logo-aionsite.webp"} alt="" width={590} height={119} priority />
      </Link>
      <nav aria-label="Principal" className="sc-nav">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="sc-header__end">
        <Link href="/cotizar-proyecto/" className="sc-btn sc-btn--small">
          Cotizar
        </Link>
        <MobileNav links={navigation} quoteHref="/cotizar-proyecto/" whatsapp={whatsapp} />
      </div>
    </header>
  );
}

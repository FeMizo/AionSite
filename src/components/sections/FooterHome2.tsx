"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CmsBase, FooterSectionData } from "@/src/cms/types";
import { isInternalHref } from "@/src/lib/routing";

export function FooterHome2({ base, data }: { base: CmsBase; data: FooterSectionData }) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="h-24 overflow-hidden border-b border-white/10 bg-slate-950" aria-hidden="true"><div className="footer-home2-dots h-full w-[200%] opacity-75" /></div>
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1820px] py-12 sm:w-[calc(100%-48px)] lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(320px,1.25fr)_repeat(2,minmax(150px,0.42fr))_minmax(180px,0.5fr)] lg:gap-16 lg:min-h-[330px]">
          <div><h2 className="max-w-2xl font-display text-[clamp(2.35rem,3.5vw,3.9rem)] font-light leading-[1.06]">Diseno web, ecommerce, SEO e IA para negocios.</h2><p className="mt-6 max-w-md text-sm leading-6 text-slate-400">{data.description}</p></div>
          <FooterNav title="Enlaces" links={data.navigation.slice(0, 4)} />
          <FooterNav title="Mas enlaces" links={data.navigation.slice(4)} />
          <div><p className="mb-5 text-sm font-semibold text-white">Contacto</p><a href={data.whatsappLink} target="_blank" rel="noreferrer" className="text-sm text-blue-300 transition-colors hover:text-white">WhatsApp directo</a><a href="https://www.facebook.com/aionsite/" target="_blank" rel="noreferrer" className="mt-4 block text-sm text-slate-400 transition-colors hover:text-white">Facebook</a><a href="https://www.instagram.com/aionsite.webs/" target="_blank" rel="noreferrer" className="mt-3 block text-sm text-slate-400 transition-colors hover:text-white">Instagram</a></div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 flex w-full items-center sm:mt-16"><Link href="/" aria-label="Ir a inicio - AionSite" className="flex items-center"><Image src={base.logoLight} alt="AionSite" width={160} height={40} className="h-10 w-auto sm:h-14" priority /></Link></motion.div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[9px] leading-snug text-white/50"><p>© {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</p><Link href="/privacidad/" className="transition-colors hover:text-white">Privacidad</Link><Link href="/terminos/" className="transition-colors hover:text-white">Terminos</Link><Link href="/legales/" className="transition-colors hover:text-white">Legales</Link></div>
      </div>
      <style jsx>{`@keyframes footerHome2DotsMove { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } } .footer-home2-dots { background-image: radial-gradient(circle, rgb(255 255 255 / 0.55) 1.5px, transparent 2px), radial-gradient(circle, rgb(255 255 255 / 0.35) 1px, transparent 1.5px), radial-gradient(circle, rgb(255 255 255 / 0.45) 1.2px, transparent 1.8px); background-position: 0 8px, 24px 22px, 48px 14px; background-size: 72px 38px, 110px 44px, 160px 52px; animation: footerHome2DotsMove 18s linear infinite; }`}</style>
    </footer>
  );
}

function FooterNav({ title, links }: { title: string; links: FooterSectionData["navigation"] }) {
  return <div><p className="mb-5 text-sm font-semibold text-white">{title}</p><nav className="flex flex-col items-start gap-4 text-sm text-slate-400" aria-label={title}>{links.map((item) => isInternalHref(item.href) ? <Link key={item.name} href={item.href} className="transition-transform transition-colors duration-200 hover:translate-x-1 hover:text-white">{item.name}</Link> : <a key={item.name} href={item.href} className="transition-transform transition-colors duration-200 hover:translate-x-1 hover:text-white">{item.name}</a>)}</nav></div>;
}

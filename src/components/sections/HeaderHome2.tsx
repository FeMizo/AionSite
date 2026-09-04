"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CmsBase, HeaderSectionData } from "@/src/cms/types";
import { MobileMenu } from "@/src/components/ui/MobileMenu";
import { isInternalHref } from "@/src/lib/routing";

export function HeaderHome2({ base, data }: { base: CmsBase; data: HeaderSectionData }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-6 py-5 lg:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-slate-950/45 px-4 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`Ir a inicio - ${data.name}`}>
          <Image src={base.logoLight} alt={data.name} width={160} height={40} className="h-9 w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {data.navigation.map((item) => isInternalHref(item.href) ? <Link key={item.name} href={item.href} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">{item.name}</Link> : <a key={item.name} href={item.href} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">{item.name}</a>)}
          <a href={data.whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"><MessageCircleMore size={15} />Cotizar por WhatsApp</a>
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white lg:hidden" aria-expanded={open} aria-label={open ? "Cerrar menu" : "Abrir menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} navigation={data.navigation} whatsappLink={data.whatsappLink} />
    </header>
  );
}

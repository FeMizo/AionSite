"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

type ServiceType = "website" | "social" | "both";
type Timeline = "regular" | "fast" | "rush";

const money = (value: number) => `$${value.toLocaleString("en-US")}`;

function websitePrice(extraPagesCount: number, ecommerce: boolean) {
  const base = ecommerce ? 6500 : 4500;
  const firstPages = Math.min(extraPagesCount, 4) * 500;
  const extraPages = Math.max(extraPagesCount - 4, 0) * 350;
  return base + firstPages + extraPages;
}

function socialPrice(extraPosts: number, withWebsite: boolean) {
  const base = withWebsite ? 3000 : 3500;
  return base + (extraPosts / 10) * 200;
}

function calculatePrice(serviceType: ServiceType, pages: number, posts: number, ecommerce: boolean, needContent: boolean, needSEO: boolean, timeline: Timeline) {
  let total = serviceType === "website" ? websitePrice(pages, ecommerce) : serviceType === "social" ? socialPrice(posts, false) : websitePrice(pages, ecommerce) + socialPrice(posts, true);
  if (needContent && serviceType !== "social") total += pages * 50;
  if (needSEO && serviceType !== "social") total += pages * 50;
  if (timeline === "rush" && serviceType !== "social") total += pages * 100;
  if (timeline === "fast" && serviceType !== "social") total += pages * 25;
  return total;
}

export function PricingHome2() {
  const [serviceType, setServiceType] = useState<ServiceType>("both");
  const [pages, setPages] = useState(0);
  const [posts, setPosts] = useState(0);
  const [ecommerce, setEcommerce] = useState(false);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<Timeline>("regular");
  const price = useMemo(() => calculatePrice(serviceType, pages, posts, ecommerce, needContent, needSEO, timeline), [serviceType, pages, posts, ecommerce, needContent, needSEO, timeline]);
  const agency = Math.round(price * 1.8);
  const freelancer = Math.round(price * 1.25);
  const hasWebsite = serviceType !== "social";
  const hasSocial = serviceType !== "website";

  return (
    <section id="calculator-section" className="bg-slate-950 py-16 text-white md:py-28">
      <Container>
        <header className="mx-auto mb-12 max-w-5xl text-center md:mb-16"><p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">Calcula tu proyecto</p><Heading as="h2" className="mt-4 font-normal text-white">Un sitio web y redes sociales dentro de tu presupuesto</Heading></header>
        <div className="grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2">
          <div className="divide-y divide-white/10 bg-slate-950 p-8 lg:p-12">
            <div className="pb-8"><h3 className="mb-5 text-lg font-medium">Que servicio necesitas?</h3><div className="space-y-4">{[["website", "Solo sitio web"], ["social", "Solo redes sociales"], ["both", "Sitio web + redes sociales"]].map(([value, label]) => <label key={value} onClick={() => setServiceType(value as ServiceType)} className="flex cursor-pointer items-center gap-3 text-sm text-slate-200"><input type="radio" name="serviceType" value={value} checked={serviceType === value} onChange={() => setServiceType(value as ServiceType)} className="h-5 w-5 appearance-none rounded-full border-2 border-slate-500 checked:border-blue-400 checked:bg-[radial-gradient(circle,_#60a5fa_0_4px,_transparent_5px)]" />{label}</label>)}</div></div>
            {hasWebsite && <div className="py-8"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-medium">Numero de paginas <span className="text-blue-300">({pages} extra)</span></h3><span className="font-mono text-sm text-slate-400">{pages} extras</span></div><input aria-label="Numero de paginas extra" type="range" min="0" max="30" step="1" value={pages} onChange={(event) => setPages(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-blue-400" /><div className="mt-2 flex justify-between text-xs text-slate-500"><span>0</span><span>30</span></div><p className="mt-3 text-xs text-slate-400">Incluye {ecommerce ? 8 : 4} paginas basicas. Base: {ecommerce ? "$6,500" : "$4,500"}. Cada pagina extra cuesta $500; despues de 4 extras baja a $350.</p><label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-200"><input type="checkbox" checked={ecommerce} onChange={(event) => setEcommerce(event.target.checked)} className="h-5 w-5 appearance-none rounded border-2 border-slate-500 checked:border-blue-400 checked:bg-blue-400" />Es un ecommerce <span className="text-blue-300">(base $6,500)</span></label></div>}
            {hasSocial && <div className="py-8"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-medium">Publicaciones para redes <span className="text-blue-300">({posts} extra)</span></h3><span className="font-mono text-sm text-slate-400">{posts} extras</span></div><input aria-label="Publicaciones extra para redes" type="range" min="0" max="50" step="10" value={posts} onChange={(event) => setPosts(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-blue-400" /><div className="mt-2 flex justify-between text-xs text-slate-500"><span>0</span><span>50</span></div><p className="mt-3 text-xs text-slate-400">Incluye 2 redes sociales con hasta 3 publicaciones a la semana. Cada 10 publicaciones extra por mes: +$200.</p></div>}
            {hasWebsite && <div className="py-8"><h3 className="mb-5 text-lg font-medium">Extras</h3><div className="space-y-4">{[[needContent, setNeedContent, "Necesito ayuda con el contenido", "+$50/pagina"], [needSEO, setNeedSEO, "Quiero optimizar mi sitio para SEO", "+$50/pagina"]].map(([checked, setter, label, extra]) => <label key={label as string} className="flex cursor-pointer items-center justify-between gap-4 text-sm text-slate-200"><span className="flex items-center gap-3"><input type="checkbox" checked={checked as boolean} onChange={() => (setter as React.Dispatch<React.SetStateAction<boolean>>)(!(checked as boolean))} className="h-5 w-5 appearance-none rounded border-2 border-slate-500 checked:border-blue-400 checked:bg-blue-400" />{label as string}</span><span className="shrink-0 text-blue-300">{extra as string}</span></label>)}</div></div>}
            {hasWebsite && <div className="pt-8"><h3 className="mb-5 text-lg font-medium">Que tan rapido lo necesitas?</h3><div className="space-y-4">{[["rush", "En 7 dias", "+$100/pagina"], ["fast", "En 14 dias", "+$25/pagina"], ["regular", "Velocidad regular (segun lo acordado)", "sin costo extra"]].map(([value, label, extra]) => <label key={value} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-200"><span className="flex items-center gap-3"><input type="radio" name="timeline" value={value} checked={timeline === value} onChange={() => setTimeline(value as Timeline)} className="h-5 w-5 appearance-none rounded-full border-2 border-slate-500 checked:border-blue-400 checked:bg-[radial-gradient(circle,_#60a5fa_0_4px,_transparent_5px)]" />{label}</span><span className="shrink-0 text-blue-300">{extra}</span></label>)}</div></div>}
          </div>
          <div className="min-h-[717px] border-t border-white/10 bg-slate-900/70 p-8 lg:rounded-r-2xl lg:border-l lg:border-t-0 lg:p-12"><h3 className="font-display text-3xl font-normal">Costo estimado</h3><p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Una estimacion basada en tu servicio, paginas, publicaciones, extras y tiempo de entrega.</p><div className="mt-8 space-y-3"><EstimateCard title="Una agencia normalmente cobra minimo" price={agency} subtitle="+ Mas tiempo y costos adicionales" /><EstimateCard title="Un freelancer normalmente cobra minimo" price={freelancer} subtitle="+ Mas vueltas y seguimiento" /><div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-6 text-white"><p className="text-sm font-medium">Con AionSite</p><p className="mt-2 text-5xl font-bold tracking-tight">{money(price)}</p><p className="mt-3 text-sm text-white/85">Ahorra dinero, tiempo y preocupaciones</p></div></div><p className="mt-8 text-xs leading-5 text-slate-500">Esta estimacion es un punto de partida. El alcance, la inversion y el tiempo final se confirman despues de conversar.</p></div>
        </div>
      </Container>
    </section>
  );
}

function EstimateCard({ title, price, subtitle }: { title: string; price: number; subtitle: string }) {
  return <div className="rounded-2xl bg-white/10 p-6"><p className="text-sm text-slate-300">{title}</p><p className="mt-2 text-4xl font-bold tracking-tight">{money(price)}</p><p className="mt-3 text-sm text-slate-400">{subtitle}</p><div className="mt-4 flex items-center gap-2 text-xs text-blue-300"><Check size={14} />Referencia de mercado</div></div>;
}

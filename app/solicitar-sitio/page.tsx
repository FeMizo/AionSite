import type { Metadata } from "next";
import { Header } from "@/src/components/sections/Header";
import { SiteFooter } from "@/src/components/sections/SiteFooter";
import { SiteRequestForm } from "@/src/components/productos/SiteRequestForm";
import { Container } from "@/src/components/ui/Container";
import { withCanonical } from "@/src/lib/metadata";
import { initialCmsContent } from "@/src/cms/site-content";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

export const metadata: Metadata = withCanonical("/solicitar-sitio/", {
  title: "Solicita tu sitio web | AionSite",
  description: "Cuéntanos sobre tu negocio y solicita una propuesta de sitio web o tienda online por WhatsApp.",
});

export default function RequestSitePage() {
  return <><Header base={initialCmsContent.base} data={{ ...initialCmsContent.sections.header.data, navigation: mapNavigationForInnerPage(initialCmsContent.sections.header.data.navigation) }} /><main id="main-content" className="bg-slate-950 pb-24 pt-36 text-white">
    <Container><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <a href="/cotizar-proyecto/" className="text-sm text-blue-300 hover:underline">← Volver a cotizar proyecto</a>
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-blue-300">Tu siguiente paso</p>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">Tu negocio.<br /><span className="text-blue-300">Una web a su altura.</span></h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">Cuéntanos qué necesitas. Revisaremos tu solicitud y hablaremos contigo para definir una propuesta.</p>
        <ol className="mt-10 space-y-6 text-sm text-slate-300">
          {["Cuéntanos sobre tu negocio y tus objetivos.", "Revisa tu mensaje y envíalo por WhatsApp.", "Definimos contigo el alcance y la propuesta."].map((text, index) => <li key={text} className="flex gap-4"><span className="font-mono text-blue-300">0{index + 1}</span><span>{text}</span></li>)}
        </ol>
      </div>
      <SiteRequestForm />
    </div></Container>
  </main><SiteFooter /></>;
}

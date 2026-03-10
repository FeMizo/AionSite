import type { ReactNode } from "react";
import { FAQ } from "@/src/components/sections/FAQ";
import { FinalCTA } from "@/src/components/sections/FinalCTA";
import { Footer } from "@/src/components/sections/Footer";
import { Header } from "@/src/components/sections/Header";
import { Hero } from "@/src/components/sections/Hero";
import { Portfolio } from "@/src/components/sections/Portfolio";
import { Pricing } from "@/src/components/sections/Pricing";
import { Process } from "@/src/components/sections/Process";
import { Services } from "@/src/components/sections/Services";
import { Stats } from "@/src/components/sections/Stats";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import type {
  CmsContent,
  FieldDefinition,
  SectionId,
  SectionPlacement,
  SectionRegistryEntry,
} from "@/src/cms/types";

const navigationFields: FieldDefinition[] = [
  {
    key: "navigation",
    label: "Enlaces de navegacion",
    type: "array",
    itemLabel: "Enlace",
    itemFields: [
      { key: "name", label: "Texto", type: "text", placeholder: "Servicios" },
      { key: "href", label: "Href", type: "text", placeholder: "#servicios" },
    ],
  },
];

export const sectionRegistry: Record<SectionId, SectionRegistryEntry> = {
  header: {
    id: "header",
    label: "Header",
    description: "Barra superior con logo, navegacion y CTA principal.",
    placement: "header",
    type: "navigation",
    fields: [
      { key: "name", label: "Nombre de marca", type: "text" },
      ...navigationFields,
      { key: "whatsappLink", label: "Link de WhatsApp", type: "url" },
    ],
  },
  hero: {
    id: "hero",
    label: "Hero",
    description: "Bloque principal con propuesta de valor y CTAs.",
    placement: "main",
    type: "hero",
    fields: [
      { key: "title", label: "Titulo", type: "textarea" },
      { key: "subtitle", label: "Subtitulo", type: "textarea" },
      { key: "primaryCTA", label: "CTA principal", type: "text" },
      { key: "secondaryCTA", label: "CTA secundario", type: "text" },
      {
        key: "trustBar",
        label: "Trust bar",
        type: "array",
        itemLabel: "Punto",
        itemType: "text",
      },
    ],
  },
  services: {
    id: "services",
    label: "Servicios",
    description: "Tarjetas de servicio con icono, titulo y descripcion.",
    placement: "main",
    type: "cards",
    fields: [
      {
        key: "root",
        label: "Servicios",
        type: "array",
        itemLabel: "Servicio",
        itemFields: [
          { key: "title", label: "Titulo", type: "text" },
          { key: "description", label: "Descripcion", type: "textarea" },
          { key: "icon", label: "Icono Lucide", type: "text", placeholder: "Globe" },
        ],
      },
    ],
  },
  stats: {
    id: "stats",
    label: "Stats",
    description: "Metricas destacadas de conversion y credibilidad.",
    placement: "main",
    type: "metrics",
    fields: [
      {
        key: "root",
        label: "Metricas",
        type: "array",
        itemLabel: "Metrica",
        itemFields: [
          { key: "value", label: "Valor", type: "text" },
          { key: "label", label: "Etiqueta", type: "text" },
        ],
      },
    ],
  },
  portfolio: {
    id: "portfolio",
    label: "Portafolio",
    description: "Casos destacados con imagen, categoria y URL.",
    placement: "main",
    type: "gallery",
    fields: [
      {
        key: "root",
        label: "Proyectos",
        type: "array",
        itemLabel: "Proyecto",
        itemFields: [
          { key: "title", label: "Titulo", type: "text" },
          { key: "category", label: "Categoria", type: "text" },
          { key: "image", label: "Imagen", type: "image" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
    ],
  },
  process: {
    id: "process",
    label: "Proceso",
    description: "Timeline del flujo de trabajo.",
    placement: "main",
    type: "timeline",
    fields: [
      {
        key: "root",
        label: "Pasos",
        type: "array",
        itemLabel: "Paso",
        itemFields: [
          { key: "step", label: "Numero", type: "text", placeholder: "01" },
          { key: "title", label: "Titulo", type: "text" },
          { key: "description", label: "Descripcion", type: "textarea" },
        ],
      },
    ],
  },
  pricing: {
    id: "pricing",
    label: "Paquetes",
    description: "Planes comerciales y beneficios.",
    placement: "main",
    type: "pricing",
    fields: [
      {
        key: "root",
        label: "Planes",
        type: "array",
        itemLabel: "Plan",
        itemFields: [
          { key: "name", label: "Nombre", type: "text" },
          { key: "price", label: "Precio", type: "text" },
          { key: "recommended", label: "Recomendado", type: "boolean" },
          {
            key: "features",
            label: "Features",
            type: "array",
            itemLabel: "Feature",
            itemType: "text",
          },
        ],
      },
    ],
  },
  testimonials: {
    id: "testimonials",
    label: "Testimonios",
    description: "Prueba social con citas de clientes.",
    placement: "main",
    type: "testimonials",
    fields: [
      {
        key: "root",
        label: "Testimonios",
        type: "array",
        itemLabel: "Testimonio",
        itemFields: [
          { key: "name", label: "Nombre", type: "text" },
          { key: "company", label: "Empresa", type: "text" },
          { key: "text", label: "Texto", type: "textarea" },
        ],
      },
    ],
  },
  faq: {
    id: "faq",
    label: "FAQ",
    description: "Preguntas frecuentes con respuestas expandibles.",
    placement: "main",
    type: "accordion",
    fields: [
      {
        key: "root",
        label: "FAQs",
        type: "array",
        itemLabel: "Pregunta",
        itemFields: [
          { key: "question", label: "Pregunta", type: "text" },
          { key: "answer", label: "Respuesta", type: "textarea" },
        ],
      },
    ],
  },
  finalCTA: {
    id: "finalCTA",
    label: "CTA final",
    description: "Llamado final a conversion.",
    placement: "main",
    type: "cta",
    fields: [
      { key: "title", label: "Titulo", type: "textarea" },
      { key: "subtitle", label: "Subtitulo", type: "textarea" },
      { key: "buttonText", label: "Texto del boton", type: "text" },
      { key: "responseText", label: "Texto auxiliar", type: "text" },
      { key: "whatsappLink", label: "Link de WhatsApp", type: "url" },
    ],
  },
  footer: {
    id: "footer",
    label: "Footer",
    description: "Pie de pagina con descripcion, contacto y enlaces.",
    placement: "footer",
    type: "footer",
    fields: [
      { key: "name", label: "Nombre de marca", type: "text" },
      { key: "description", label: "Descripcion", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      ...navigationFields,
      { key: "whatsappLink", label: "Link de WhatsApp", type: "url" },
    ],
  },
  whatsappFloatingButton: {
    id: "whatsappFloatingButton",
    label: "Boton flotante",
    description: "Acceso rapido a WhatsApp desde cualquier scroll.",
    placement: "floating",
    type: "floating-action",
    fields: [
      { key: "whatsappLink", label: "Link de WhatsApp", type: "url" },
      { key: "tooltip", label: "Tooltip", type: "text" },
    ],
  },
};

const sectionRenderers: Record<SectionId, (content: CmsContent) => ReactNode> = {
  header: (content) => (
    <Header base={content.base} data={content.sections.header.data} />
  ),
  hero: (content) => (
    <Hero
      data={content.sections.hero.data}
      headerData={content.sections.header.data}
    />
  ),
  services: (content) => <Services data={content.sections.services.data} />,
  stats: (content) => <Stats data={content.sections.stats.data} />,
  portfolio: (content) => <Portfolio data={content.sections.portfolio.data} />,
  process: (content) => <Process data={content.sections.process.data} />,
  pricing: (content) => (
    <Pricing
      data={content.sections.pricing.data}
      headerData={content.sections.header.data}
    />
  ),
  testimonials: (content) => (
    <Testimonials data={content.sections.testimonials.data} />
  ),
  faq: (content) => <FAQ data={content.sections.faq.data} />,
  finalCTA: (content) => <FinalCTA data={content.sections.finalCTA.data} />,
  footer: (content) => (
    <Footer
      base={content.base}
      data={content.sections.footer.data}
    />
  ),
  whatsappFloatingButton: (content) => (
    <WhatsAppFloatingButton
      data={content.sections.whatsappFloatingButton.data}
    />
  ),
};

export function getOrderedSectionIds(
  content: CmsContent,
  placement?: SectionPlacement,
) {
  return (Object.keys(content.sections) as SectionId[])
    .filter((id) => (placement ? sectionRegistry[id].placement === placement : true))
    .sort((left, right) => content.sections[left].order - content.sections[right].order);
}

export function getActiveSectionIds(
  content: CmsContent,
  placement?: SectionPlacement,
) {
  return getOrderedSectionIds(content, placement).filter(
    (id) => content.sections[id].enabled,
  );
}

export function renderSection(id: SectionId, content: CmsContent) {
  return sectionRenderers[id](content);
}

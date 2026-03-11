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
import { SideImageContent } from "@/src/components/sections/SideImageContent";
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
    label: "Enlaces de navegación",
    type: "array",
    itemLabel: "Enlace",
    itemFields: [
      { key: "name", label: "Texto", type: "text", placeholder: "Servicios" },
      { key: "href", label: "Enlace", type: "text", placeholder: "#servicios" },
    ],
  },
];

export const sectionRegistry: Record<SectionId, SectionRegistryEntry> = {
  header: {
    id: "header",
    label: "Encabezado",
    description: "Barra superior con logo, navegación y botón principal.",
    placement: "header",
    type: "navegación",
    fields: [
      { key: "name", label: "Nombre de marca", type: "text" },
      ...navigationFields,
      { key: "whatsappLink", label: "Enlace de WhatsApp", type: "url" },
    ],
  },
  hero: {
    id: "hero",
    label: "Portada",
    description: "Bloque principal con propuesta de valor y botones de acción.",
    placement: "main",
    type: "portada",
    fields: [
      { key: "badgeText", label: "Etiqueta superior", type: "text" },
      { key: "title", label: "Título", type: "textarea" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      { key: "primaryCTA", label: "Botón principal", type: "text" },
      { key: "secondaryCTA", label: "Botón secundario", type: "text" },
      {
        key: "trustBar",
        label: "Franja de confianza",
        type: "array",
        itemLabel: "Punto",
        itemType: "text",
      },
    ],
  },
  services: {
    id: "services",
    label: "Servicios",
    description: "Tarjetas de servicio con ícono, título y descripción.",
    placement: "main",
    type: "tarjetas",
    fields: [
      {
        key: "root",
        label: "Servicios",
        type: "array",
        itemLabel: "Servicio",
        itemFields: [
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
          { key: "icon", label: "Ícono Lucide", type: "text", placeholder: "Globe" },
        ],
      },
    ],
  },
  stats: {
    id: "stats",
    label: "Métricas",
    description: "Métricas destacadas de conversión y credibilidad.",
    placement: "main",
    type: "métricas",
    fields: [
      {
        key: "root",
        label: "Métricas",
        type: "array",
        itemLabel: "Métrica",
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
    description: "Casos destacados con imagen, categoría y URL.",
    placement: "main",
    type: "galería",
    fields: [
      {
        key: "root",
        label: "Proyectos",
        type: "array",
        itemLabel: "Proyecto",
        itemFields: [
          { key: "title", label: "Título", type: "text" },
          { key: "category", label: "Categoría", type: "text" },
          { key: "image", label: "Imagen", type: "image" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
    ],
  },
  process: {
    id: "process",
    label: "Proceso",
    description: "Línea de tiempo del flujo de trabajo.",
    placement: "main",
    type: "proceso",
    fields: [
      {
        key: "root",
        label: "Pasos",
        type: "array",
        itemLabel: "Paso",
        itemFields: [
          { key: "step", label: "Número", type: "text", placeholder: "01" },
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
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
            label: "Características",
            type: "array",
            itemLabel: "Característica",
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
    label: "Preguntas frecuentes",
    description: "Preguntas frecuentes con respuestas expandibles.",
    placement: "main",
    type: "acordeón",
    fields: [
      {
        key: "root",
        label: "Preguntas",
        type: "array",
        itemLabel: "Pregunta",
        itemFields: [
          { key: "question", label: "Pregunta", type: "text" },
          { key: "answer", label: "Respuesta", type: "textarea" },
        ],
      },
    ],
  },
  sideImageContent: {
    id: "sideImageContent",
    label: "Imagen lateral + contenido",
    description:
      "Bloque reusable con imagen y contenido. Permite invertir la disposicion.",
    placement: "main",
    type: "bloque lateral",
    fields: [
      { key: "title", label: "Titulo", type: "textarea" },
      { key: "description", label: "Descripcion", type: "textarea" },
      { key: "buttonText", label: "Texto del boton", type: "text" },
      { key: "buttonLink", label: "Enlace del boton", type: "url" },
      { key: "image", label: "Imagen", type: "image" },
      {
        key: "reverse",
        label: "Invertir disposicion (imagen a la derecha)",
        type: "boolean",
      },
    ],
  },
  finalCTA: {
    id: "finalCTA",
    label: "Llamado final",
    description: "Llamado final a conversión.",
    placement: "main",
    type: "llamado",
    fields: [
      { key: "title", label: "Título", type: "textarea" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      { key: "buttonText", label: "Texto del botón", type: "text" },
      { key: "responseText", label: "Texto auxiliar", type: "text" },
      { key: "whatsappLink", label: "Enlace de WhatsApp", type: "url" },
    ],
  },
  footer: {
    id: "footer",
    label: "Pie de página",
    description: "Pie de página con descripción, contacto y enlaces.",
    placement: "footer",
    type: "pie de página",
    fields: [
      { key: "name", label: "Nombre de marca", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "email", label: "Correo", type: "text" },
      ...navigationFields,
      { key: "whatsappLink", label: "Enlace de WhatsApp", type: "url" },
    ],
  },
  whatsappFloatingButton: {
    id: "whatsappFloatingButton",
    label: "Botón flotante",
    description: "Acceso rápido a WhatsApp desde cualquier desplazamiento.",
    placement: "floating",
    type: "acción flotante",
    fields: [
      { key: "whatsappLink", label: "Enlace de WhatsApp", type: "url" },
      { key: "tooltip", label: "Texto de apoyo", type: "text" },
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
  sideImageContent: (content) => (
    <SideImageContent data={content.sections.sideImageContent.data} />
  ),
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
  return content.sectionSequence.filter((id) =>
    placement ? sectionRegistry[id].placement === placement : true,
  );
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

import type { FieldDefinition } from "@/src/cms/types";
import type { AboutSectionId, AboutSectionRegistryEntry } from "@/src/about/types";

const highlightFields: FieldDefinition[] = [
  { key: "value", label: "Valor", type: "text" },
  { key: "label", label: "Etiqueta", type: "text" },
];

export const aboutSectionOrder: AboutSectionId[] = [
  "hero",
  "intro",
  "valueBlocks",
  "experience",
  "stack",
  "differentiators",
  "education",
  "contact",
];

export const aboutSectionRegistry: Record<AboutSectionId, AboutSectionRegistryEntry> = {
  hero: {
    id: "hero",
    label: "Hero",
    description: "Intro principal de la página About.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Título", type: "textarea" },
      { key: "summary", label: "Resumen", type: "textarea" },
      { key: "location", label: "Ubicación", type: "text" },
      { key: "availability", label: "Disponibilidad", type: "text" },
      { key: "role", label: "Rol", type: "text" },
      {
        key: "highlights",
        label: "Highlights",
        type: "array",
        itemLabel: "Highlight",
        itemFields: highlightFields,
      },
    ],
  },
  intro: {
    id: "intro",
    label: "Sobre mí",
    description: "Narrativa base y principios de trabajo.",
    fields: [
      { key: "title", label: "Título", type: "textarea" },
      {
        key: "paragraphs",
        label: "Párrafos",
        type: "array",
        itemLabel: "Párrafo",
        itemType: "text",
      },
      {
        key: "principles",
        label: "Principios",
        type: "array",
        itemLabel: "Principio",
        itemFields: [
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
        ],
      },
    ],
  },
  valueBlocks: {
    id: "valueBlocks",
    label: "Bloques de valor",
    description: "Cómo ayudas y en qué especialidades aportas más valor.",
    fields: [
      {
        key: "root",
        label: "Bloques",
        type: "array",
        itemLabel: "Bloque",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
        ],
      },
    ],
  },
  experience: {
    id: "experience",
    label: "Experiencia",
    description: "Experiencia destacada en formato timeline.",
    fields: [
      {
        key: "root",
        label: "Experiencias",
        type: "array",
        itemLabel: "Experiencia",
        itemFields: [
          { key: "period", label: "Periodo", type: "text" },
          { key: "title", label: "Rol", type: "text" },
          { key: "subtitle", label: "Empresa", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
          {
            key: "points",
            label: "Puntos",
            type: "array",
            itemLabel: "Punto",
            itemType: "text",
          },
        ],
      },
    ],
  },
  stack: {
    id: "stack",
    label: "Stack",
    description: "Grupos de habilidades, herramientas y tecnologías.",
    fields: [
      {
        key: "root",
        label: "Grupos",
        type: "array",
        itemLabel: "Grupo",
        itemFields: [
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
          {
            key: "items",
            label: "Items",
            type: "array",
            itemLabel: "Item",
            itemType: "text",
          },
        ],
      },
    ],
  },
  differentiators: {
    id: "differentiators",
    label: "Diferenciadores",
    description: "Puntos que te hacen destacar.",
    fields: [
      {
        key: "root",
        label: "Diferenciadores",
        type: "array",
        itemLabel: "Diferenciador",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "title", label: "Título", type: "text" },
          { key: "description", label: "Descripción", type: "textarea" },
        ],
      },
    ],
  },
  education: {
    id: "education",
    label: "Formación",
    description: "Educación e idiomas.",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "summary", label: "Resumen", type: "textarea" },
      {
        key: "languages",
        label: "Idiomas",
        type: "array",
        itemLabel: "Idioma",
        itemType: "text",
      },
    ],
  },
  contact: {
    id: "contact",
    label: "CTA final",
    description: "Llamado final a contacto para About.",
    fields: [
      { key: "title", label: "Título", type: "textarea" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "note", label: "Nota", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      { key: "linkedIn", label: "LinkedIn", type: "url" },
    ],
  },
};

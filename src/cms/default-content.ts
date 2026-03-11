import { getWhatsAppLink } from "@/src/config/whatsapp";
import type { CmsContent } from "@/src/cms/types";

const base = {
  name: "AionSite",
  description:
    "Agencia boutique de diseño y desarrollo web premium enfocada en conversión, velocidad y SEO técnico.",
  email: "contacto@aionsite.com.mx",
  whatsappLink: getWhatsAppLink(),
  navigation: [
    { name: "Servicios", href: "#servicios" },
    { name: "Portafolio", href: "#portafolio" },
    { name: "Proceso", href: "#proceso" },
    { name: "Paquetes", href: "#paquetes" },
    { name: "Preguntas frecuentes", href: "#faq" },
    { name: "Contacto", href: "#contacto" },
  ],
  logoLight: "/logo-aionsite.png",
};

export const defaultCmsContent: CmsContent = {
  base,
  sections: {
    header: {
      id: "header",
      enabled: true,
      order: 0,
      data: {
        name: base.name,
        navigation: base.navigation,
        whatsappLink: base.whatsappLink,
      },
    },
    hero: {
      id: "hero",
      enabled: true,
      order: 1,
      data: {
        badgeText: "Diseño web de alto impacto",
        title: "Sitios web modernos que generan clientes.",
        subtitle:
          "Diseñamos y desarrollamos experiencias digitales de alto impacto que posicionan tu marca y multiplican tus ventas.",
        primaryCTA: "Cotizar por WhatsApp",
        secondaryCTA: "Ver portafolio",
        trustBar: ["Velocidad", "SEO técnico", "Diseño premium", "Soporte"],
      },
    },
    services: {
      id: "services",
      enabled: true,
      order: 2,
      data: [
        {
          title: "Sitio Web Profesional",
          description:
            "Presencia digital sólida con diseño a medida, optimizado para todos los dispositivos.",
          icon: "Globe",
        },
        {
          title: "Página de conversión",
          description:
            "Páginas enfocadas en un solo objetivo: convertir visitantes en clientes potenciales.",
          icon: "Target",
        },
        {
          title: "Tienda en línea",
          description:
            "Comercio electrónico escalable con pasarelas de pago seguras y gestión de inventario.",
          icon: "ShoppingBag",
        },
        {
          title: "Mantenimiento + SEO",
          description:
            "Tu sitio siempre actualizado, seguro y escalando posiciones en Google.",
          icon: "TrendingUp",
        },
      ],
    },
    sideImageContent: {
      id: "sideImageContent",
      enabled: true,
      order: 3,
      data: {
        title: "Lleva tu presencia digital a un nuevo nivel",
        description:
          "Combinamos estrategia, diseño y desarrollo para que tu sitio no solo se vea bien, sino que también convierta visitas en oportunidades reales para tu negocio.",
        buttonText: "Solicitar propuesta",
        buttonLink: getWhatsAppLink(),
        image: "/portfolio/lg.png",
        reverse: false,
      },
    },
    stats: {
      id: "stats",
      enabled: true,
      order: 4,
      data: [
        { value: "99%", label: "Satisfacción" },
        { value: "+30", label: "Proyectos" },
        { value: "2x", label: "Conversión" },
      ],
    },
    portfolio: {
      id: "portfolio",
      enabled: true,
      order: 5,
      data: [
        {
          title: "Casa Brava",
          category: "Comercio electrónico",
          image: "/portfolio/brisa-carmen.png",
          url: "https://restaurante.aionsite.com.mx/",
        },
        {
          title: "Nova SaaS",
          category: "Negocios",
          image: "/portfolio/sitiop-mx.svg",
          url: "https://sitiop.mx",
        },
        {
          title: "Lumina Conversión",
          category: "Conversión",
          image: "/portfolio/sitiop-mx.svg",
          url: "https://sitiop.mx",
        },
      ],
    },
    process: {
      id: "process",
      enabled: true,
      order: 6,
      data: [
        {
          step: "01",
          title: "Diagnóstico",
          description: "Entendemos tus objetivos y analizamos tu competencia.",
        },
        {
          step: "02",
          title: "Propuesta",
          description: "Definimos la estrategia y el alcance del proyecto.",
        },
        {
          step: "03",
          title: "Diseño",
          description: "Creamos una interfaz premium alineada a tu marca.",
        },
        {
          step: "04",
          title: "Desarrollo",
          description: "Construimos tu sitio con las mejores tecnologías.",
        },
        {
          step: "05",
          title: "Lanzamiento",
          description: "Optimizamos y ponemos tu sitio en marcha.",
        },
      ],
    },
    pricing: {
      id: "pricing",
      enabled: true,
      order: 7,
      data: [
        {
          name: "Esencial",
          price: "Desde $5,000",
          features: [
            "Página de inicio con diseño básico",
            "Diseño adaptable",
            "Formulario de contacto",
            "SEO básico",
          ],
          recommended: false,
        },
        {
          name: "Crecimiento",
          price: "Desde $12,000",
          features: [
            "Todo lo del plan Esencial",
            "Página de inicio con diseño premium",
            "5 secciones personalizadas",
            "SEO avanzado",
            "Soporte 3 meses",
          ],
          recommended: true,
        },
        {
          name: "Mantenimiento mensual",
          price: "$15,000/mes",
          features: [
            "Actualizaciones mensuales",
            "Optimización de velocidad",
            "Soporte prioritario",
          ],
          recommended: false,
        },
        {
          name: "Comercio electrónico",
          price: "Desde $20,000",
          features: [
            "Tienda en línea",
            "Integración con pasarelas de pago",
            "Configuración de inventario",
            "Soporte 6 meses",
          ],
          recommended: false,
        },
      ],
    },
    testimonials: {
      id: "testimonials",
      enabled: false,
      order: 8,
      data: [
        {
          name: "Carlos R.",
          company: "TechFlow",
          text: "AionSite transformó nuestra presencia en línea. Las ventas subieron un 40% en dos meses.",
        },
        {
          name: "Ana M.",
          company: "Lumina",
          text: "El diseño es impecable y la velocidad de carga es increíble. Muy recomendados.",
        },
        {
          name: "Jorge L.",
          company: "Vortex",
          text: "Un equipo profesional que entiende el negocio, no solo el código.",
        },
      ],
    },
    faq: {
      id: "faq",
      enabled: true,
      order: 9,
      data: [
        {
          question: "¿Cuánto tiempo toma un proyecto?",
          answer:
            "Depende de la complejidad, pero una página de conversión suele tomar 2-3 días y un sitio web profesional de 1 a 3 semanas.",
        },
        {
          question: "¿Incluyen hosting y dominio?",
          answer:
            "Sí. Podemos gestionar hosting y dominio por ti, o trabajar con cuentas tuyas si ya las tienes.",
        },
        {
          question: "¿El sitio será autogestionable?",
          answer:
            "Sí. Desde el paquete Crecimiento incluimos acceso para que puedas actualizar textos e imágenes fácilmente.",
        },
      ],
    },
    finalCTA: {
      id: "finalCTA",
      enabled: true,
      order: 10,
      data: {
        title: "¿Listo para llevar tu negocio al siguiente nivel?",
        subtitle: "Hablemos de tu proyecto y creemos algo increíble juntos.",
        buttonText: "Iniciar conversación por WhatsApp",
        responseText: "Respuesta en menos de 24 horas",
        whatsappLink: base.whatsappLink,
      },
    },
    footer: {
      id: "footer",
      enabled: true,
      order: 11,
      data: {
        name: base.name,
        description: base.description,
        email: base.email,
        navigation: base.navigation,
        whatsappLink: base.whatsappLink,
      },
    },
    whatsappFloatingButton: {
      id: "whatsappFloatingButton",
      enabled: true,
      order: 12,
      data: {
        whatsappLink: base.whatsappLink,
        tooltip: "¿En qué podemos ayudarte?",
      },
    },
  },
  sectionSequence: [
    "header",
    "hero",
    "services",
    "sideImageContent",
    "stats",
    "portfolio",
    "process",
    "pricing",
    "testimonials",
    "faq",
    "finalCTA",
    "footer",
    "whatsappFloatingButton",
  ],
};



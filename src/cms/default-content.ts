import { getWhatsAppLink } from "@/src/config/whatsapp";
import type { CmsContent } from "@/src/cms/types";

const base = {
  name: "AionSite",
  description:
    "Agencia boutique de diseno y desarrollo web premium enfocada en conversion, velocidad y SEO tecnico.",
  email: "contacto@aionsite.com.mx",
  whatsappLink: getWhatsAppLink(),
  navigation: [
    { name: "Servicios", href: "#servicios" },
    { name: "Portafolio", href: "#portafolio" },
    { name: "Proceso", href: "#proceso" },
    { name: "Paquetes", href: "#paquetes" },
    { name: "FAQ", href: "#faq" },
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
        title: "Sitios web modernos que generan clientes.",
        subtitle:
          "Disenamos y desarrollamos experiencias digitales de alto impacto que posicionan tu marca y multiplican tus ventas.",
        primaryCTA: "Cotizar por WhatsApp",
        secondaryCTA: "Ver portafolio",
        trustBar: ["Velocidad", "SEO tecnico", "Diseno premium", "Soporte"],
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
            "Presencia digital solida con diseno a medida, optimizado para todos los dispositivos.",
          icon: "Globe",
        },
        {
          title: "Landing Page de Conversion",
          description:
            "Paginas enfocadas en un solo objetivo: convertir visitantes en clientes potenciales.",
          icon: "Target",
        },
        {
          title: "Tienda Online",
          description:
            "E-commerce escalable con pasarelas de pago seguras y gestion de inventario.",
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
    stats: {
      id: "stats",
      enabled: true,
      order: 3,
      data: [
        { value: "99%", label: "Satisfaccion" },
        { value: "+30", label: "Proyectos" },
        { value: "2x", label: "Conversion" },
      ],
    },
    portfolio: {
      id: "portfolio",
      enabled: true,
      order: 4,
      data: [
        {
          title: "Casa Brava",
          category: "Ecommerce",
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
          title: "Lumina Landing",
          category: "Landing",
          image: "/portfolio/sitiop-mx.svg",
          url: "https://sitiop.mx",
        },
      ],
    },
    process: {
      id: "process",
      enabled: true,
      order: 5,
      data: [
        {
          step: "01",
          title: "Diagnostico",
          description: "Entendemos tus objetivos y analizamos tu competencia.",
        },
        {
          step: "02",
          title: "Propuesta",
          description: "Definimos la estrategia y el alcance del proyecto.",
        },
        {
          step: "03",
          title: "Diseno",
          description: "Creamos una interfaz premium alineada a tu marca.",
        },
        {
          step: "04",
          title: "Desarrollo",
          description: "Construimos tu sitio con las mejores tecnologias.",
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
      order: 6,
      data: [
        {
          name: "Esencial",
          price: "Desde $5,000",
          features: [
            "Home con diseno basico",
            "Diseno responsive",
            "Formulario de contacto",
            "SEO basico",
          ],
          recommended: false,
        },
        {
          name: "Crecimiento",
          price: "Desde $12,000",
          features: [
            "Todo lo del plan Esencial",
            "Home con diseno premium",
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
            "Optimizacion de velocidad",
            "Soporte prioritario",
          ],
          recommended: false,
        },
        {
          name: "Ecommerce",
          price: "Desde $20,000",
          features: [
            "Tienda Online",
            "Integracion con pasarelas de pago",
            "Configuracion de inventario",
            "Soporte 6 meses",
          ],
          recommended: false,
        },
      ],
    },
    testimonials: {
      id: "testimonials",
      enabled: false,
      order: 7,
      data: [
        {
          name: "Carlos R.",
          company: "TechFlow",
          text: "AionSite transformo nuestra presencia online. Las ventas subieron un 40% en dos meses.",
        },
        {
          name: "Ana M.",
          company: "Lumina",
          text: "El diseno es impecable y la velocidad de carga es increible. Muy recomendados.",
        },
        {
          name: "Jorge L.",
          company: "Vortex",
          text: "Un equipo profesional que entiende el negocio, no solo el codigo.",
        },
      ],
    },
    faq: {
      id: "faq",
      enabled: true,
      order: 8,
      data: [
        {
          question: "Cuanto tiempo toma un proyecto?",
          answer:
            "Depende de la complejidad, pero una landing suele tomar 2-3 dias y un sitio web pro 1-3 semanas.",
        },
        {
          question: "Incluyen hosting y dominio?",
          answer:
            "Si. Podemos gestionar hosting y dominio por ti, o trabajar con cuentas tuyas si ya las tienes.",
        },
        {
          question: "El sitio sera autogestionable?",
          answer:
            "Si. Desde el paquete Crecimiento incluimos acceso para que puedas actualizar textos e imagenes facilmente.",
        },
      ],
    },
    finalCTA: {
      id: "finalCTA",
      enabled: true,
      order: 9,
      data: {
        title: "Listo para llevar tu negocio al siguiente nivel?",
        subtitle: "Hablemos de tu proyecto y creemos algo increible juntos.",
        buttonText: "Iniciar conversacion por WhatsApp",
        responseText: "Respuesta en menos de 24 horas",
        whatsappLink: base.whatsappLink,
      },
    },
    footer: {
      id: "footer",
      enabled: true,
      order: 10,
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
      order: 11,
      data: {
        whatsappLink: base.whatsappLink,
        tooltip: "En que podemos ayudarte?",
      },
    },
  },
};

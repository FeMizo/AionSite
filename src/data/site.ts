import { getWhatsAppLink } from "@/src/config/whatsapp";

type ToggleSection<T> = {
  show: boolean;
  data: T;
};

export const base = {
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
    { name: "FAQ", href: "#faq" },
    { name: "Contacto", href: "#contacto" },
  ],
  logoLight: "/logo-aionsite.png",
};

export const siteData: {
  header: ToggleSection<{
    name: string;
    navigation: { name: string; href: string }[];
    whatsappLink: string;
  }>;
  hero: ToggleSection<{
    title: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
    trustBar: string[];
  }>;
  services: ToggleSection<
    { title: string; description: string; icon: string }[]
  >;
  stats: ToggleSection<{ value: string; label: string }[]>;
  portfolio: ToggleSection<
    { title: string; category: string; image: string; url: string }[]
  >;
  process: ToggleSection<
    { step: string; title: string; description: string }[]
  >;
  pricing: ToggleSection<
    {
      name: string;
      price: string;
      features: string[];
      recommended: boolean;
    }[]
  >;
  testimonials: ToggleSection<
    { name: string; company: string; text: string }[]
  >;
  faq: ToggleSection<{ question: string; answer: string }[]>;
  finalCTA: ToggleSection<{
    title: string;
    subtitle: string;
    buttonText: string;
    responseText: string;
    whatsappLink: string;
  }>;
  footer: ToggleSection<{
    name: string;
    description: string;
    email: string;
    navigation: { name: string; href: string }[];
    whatsappLink: string;
  }>;
  whatsappFloatingButton: ToggleSection<{
    whatsappLink: string;
    tooltip: string;
  }>;
} = {
  header: {
    show: true,
    data: {
      name: base.name,
      navigation: base.navigation,
      whatsappLink: base.whatsappLink,
    },
  },
  hero: {
    show: true,
    data: {
      title: "Sitios web modernos que generan clientes.",
      subtitle:
        "Diseñamos y desarrollamos experiencias digitales de alto impacto que posicionan tu marca y multiplican tus ventas.",
      primaryCTA: "Cotizar por WhatsApp",
      secondaryCTA: "Ver portafolio",
      trustBar: ["Velocidad", "SEO técnico", "Diseño premium", "Soporte"],
    },
  },
  services: {
    show: true,
    data: [
      {
        title: "Sitio Web Profesional",
        description:
          "Presencia digital sólida con diseño a medida, optimizado para todos los dispositivos.",
        icon: "Globe",
      },
      {
        title: "Landing Page de Conversión",
        description:
          "Páginas enfocadas en un solo objetivo: convertir visitantes en clientes potenciales.",
        icon: "Target",
      },
      {
        title: "Tienda Online",
        description:
          "E-commerce escalable con pasarelas de pago seguras y gestión de inventario.",
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
    show: true,
    data: [
      { value: "99%", label: "Satisfacción" },
      { value: "+30", label: "Proyectos" },
      { value: "2x", label: "Conversión" },
    ],
  },
  portfolio: {
    show: true,
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
    show: true,
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
    show: true,
    data: [
      {
        name: "Esencial",
        price: "Desde $5,000",
        features: [
          "Home Page",
          "Diseño Responsive",
          "Formulario de Contacto",
          "SEO Básico",
        ],
        recommended: false,
      },
      {
        name: "Crecimiento",
        price: "Desde $12,000",
        features: [
          "home Page",
          "5 secciones personalizadas",
          "SEO Avanzado",
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
        name: "Ecommerce",
        price: "Desde $20,000",
        features: [
          "Tienda Online",
          "Integración con pasarelas de pago",
          "Configuración de inventario",
          "Soporte 6 meses",
        ],
        recommended: false,
      },
    ],
  },
  testimonials: {
    show: false,
    data: [
      {
        name: "Carlos R.",
        company: "TechFlow",
        text: "AionSite transformó nuestra presencia online. Las ventas subieron un 40% en dos meses.",
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
    show: true,
    data: [
      {
        question: "¿Cuánto tiempo toma un proyecto?",
        answer:
          "Depende de la complejidad, pero una landing suele tomar 2-3 días y un sitio web pro 1-3 semanas.",
      },
      {
        question: "¿Incluyen hosting y dominio?",
        answer:
          "Te asesoramos en la compra y configuración, o podemos incluirlo en un paquete de mantenimiento.",
      },
      {
        question: "¿El sitio será autogestionable?",
        answer:
          "Sí, entregamos herramientas para que puedas actualizar textos e imágenes fácilmente.",
      },
    ],
  },
  finalCTA: {
    show: true,
    data: {
      title: "¿Listo para llevar tu negocio al siguiente nivel?",
      subtitle: "Hablemos de tu proyecto y creemos algo increíble juntos.",
      buttonText: "Iniciar conversación por WhatsApp",
      responseText: "Respuesta en menos de 24 horas",
      whatsappLink: base.whatsappLink,
    },
  },
  footer: {
    show: true,
    data: {
      name: base.name,
      description: base.description,
      email: base.email,
      navigation: base.navigation,
      whatsappLink: base.whatsappLink,
    },
  },
  whatsappFloatingButton: {
    show: true,
    data: {
      whatsappLink: base.whatsappLink,
      tooltip: "¿En qué podemos ayudarte?",
    },
  },
};

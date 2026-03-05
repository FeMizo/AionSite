import { getWhatsAppLink } from "@/src/config/whatsapp";

export const siteData = {
  name: "AionSite",
  tagline: "Sitios web modernos que generan clientes.",
  description:
    "Agencia boutique de diseño y desarrollo web premium enfocada en conversión, velocidad y SEO técnico.",
  email: "hello@aionsite.com.mx",
  whatsappLink: getWhatsAppLink(),

  navigation: [
    { name: "Servicios", href: "#servicios" },
    { name: "Portafolio", href: "#portafolio" },
    { name: "Proceso", href: "#proceso" },
    { name: "Paquetes", href: "#paquetes" },
    { name: "FAQ", href: "#faq" },
    { name: "Contacto", href: "#contacto" },
  ],

  hero: {
    title: "Sitios web modernos que generan clientes.",
    subtitle:
      "Diseñamos y desarrollamos experiencias digitales de alto impacto que posicionan tu marca y multiplican tus ventas.",
    primaryCTA: "Cotizar por WhatsApp",
    secondaryCTA: "Ver portafolio",
    trustBar: ["Velocidad", "SEO técnico", "Diseño premium", "Soporte"],
  },

  services: [
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

  stats: [
    { value: "99%", label: "Satisfacción" },
    { value: "+30", label: "Proyectos" },
    { value: "2x", label: "Conversión" },
  ],

  portfolio: [
    {
      title: "EcoStore",
      category: "Ecommerce",
      image: "https://picsum.photos/seed/eco/600/400",
    },
    {
      title: "Nova SaaS",
      category: "Negocios",
      image: "https://picsum.photos/seed/nova/600/400",
    },
    {
      title: "Lumina Landing",
      category: "Landing",
      image: "https://picsum.photos/seed/lumina/600/400",
    },
    {
      title: "Apex Fitness",
      category: "Negocios",
      image: "https://picsum.photos/seed/apex/600/400",
    },
    {
      title: "Zenith App",
      category: "Landing",
      image: "https://picsum.photos/seed/zenith/600/400",
    },
    {
      title: "Vortex Shop",
      category: "Ecommerce",
      image: "https://picsum.photos/seed/vortex/600/400",
    },
  ],

  process: [
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

  pricing: [
    {
      name: "Esencial",
      price: "Desde $5,000",
      features: [
        "Landing Page",
        "Diseño Responsive",
        "SEO Básico",
        "Soporte 1 mes",
      ],
      recommended: false,
    },
    {
      name: "Crecimiento",
      price: "Desde $10,000",
      features: [
        "Sitio Web Pro (5 secciones)",
        "Blog / Noticias",
        "SEO Avanzado",
        "Soporte 3 meses",
      ],
      recommended: true,
    },
    {
      name: "Ecommerce",
      price: "Desde $15,000",
      features: [
        "Tienda Online",
        "Pasarela de Pagos",
        "Gestión de Stock",
        "Soporte 6 meses",
      ],
      recommended: false,
    },
  ],

  testimonials: [
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

  faqs: [
    {
      question: "¿Cuánto tiempo toma un proyecto?",
      answer:
        "Depende de la complejidad, pero una landing suele tomar 1-2 semanas y un sitio web pro 3-4 semanas.",
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
};

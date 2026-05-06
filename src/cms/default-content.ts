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
    { name: "Blog", href: "/blog" },
    { name: "Paquetes", href: "#paquetes" },
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
          type: "CMS",
        },
        {
          title: "Nova SaaS",
          category: "Negocios",
          image: "/portfolio/sitiop-mx.svg",
          url: "https://sitiop.mx",
          type: "Nuxt/Next",
        },
        {
          title: "Lumina Conversión",
          category: "Conversión",
          image: "/portfolio/sitiop-mx.svg",
          url: "https://sitiop.mx",
          type: "Custom code",
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
          price: "Desde $3,500",
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
            "Soporte 2 meses",
          ],
          recommended: true,
        },
        {
          name: "Mantenimiento mensual",
          price: "Desde $3,000/mes",
          features: [
            "Actualizaciones mensuales",
            "Optimización de velocidad",
            "Soporte prioritario",
            "Reportes de rendimiento",
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
      enabled: true,
      order: 8,
      data: [
        {
          name: "Luis Mendoza",
          company: "Casa Brava",
          text: "Antes no teníamos presencia en Google. Hoy nos encuentran solos. El sitio quedó exactamente como lo imaginaba y el proceso fue muy claro desde el inicio.",
        },
        {
          name: "Karla Ramírez",
          company: "Molotes",
          text: "Necesitaba algo sencillo pero que se viera profesional. Lo entregaron rápido, se ve increíble en el celular y ya varios clientes nos han dicho que lo encontraron por internet.",
        },
        {
          name: "Iván Torres",
          company: "Lobby PM",
          text: "Lo que más me gustó fue que no me vendieron más de lo que necesitaba. Entendieron el negocio y propusieron lo correcto. Muy buena experiencia.",
        },
      ],
    },
    faq: {
      id: "faq",
      enabled: true,
      order: 9,
      data: [
        {
          question: "¿En cuánto tiempo pueden entregar mi sitio web?",
          answer:
            "Depende del alcance. Una página de conversión puede estar lista en 3 a 5 días hábiles, mientras que un sitio corporativo completo suele tomar de 2 a 4 semanas.",
        },
        {
          question: "¿Cómo manejan pagos y anticipo?",
          answer:
            "Trabajamos con anticipo para iniciar y pagos por etapas según avance. Así tienes visibilidad del progreso y control del presupuesto durante todo el proyecto.",
        },
        {
          question: "¿Ustedes pueden gestionar dominio y hosting?",
          answer:
            "Sí. Podemos encargarnos de la configuración completa de dominio, hosting y correo profesional, o trabajar con proveedores que tú ya utilices.",
        },
        {
          question: "¿Podré editar textos e imágenes después de publicar?",
          answer:
            "Sí. Entregamos una estructura editable para que tu equipo pueda actualizar contenido sin depender de desarrollo para cambios básicos.",
        },
        {
          question: "¿Incluyen soporte, mantenimiento y SEO después del lanzamiento?",
          answer:
            "Sí. Contamos con planes de mantenimiento mensual que incluyen soporte técnico, mejoras continuas, optimización de rendimiento y acompañamiento SEO.",
        },
      ],
    },
    contactForm: {
      id: "contactForm",
      enabled: true,
      order: 10,
      data: {
        title: "Hablemos de tu proyecto",
        subtitle: "Cuéntanos qué necesitas y te respondemos con una propuesta a tu medida.",
        email: base.email,
        responseText: "Respuesta en menos de 24 horas",
        whatsappLink: base.whatsappLink,
      },
    },
    finalCTA: {
      id: "finalCTA",
      enabled: true,
      order: 11,
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
      order: 12,
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
      order: 13,
      data: {
        whatsappLink: base.whatsappLink,
        tooltip: "¿En qué podemos ayudarte?",
      },
    },
    blog: {
      id: "blog",
      enabled: true,
      order: 13,
      data: {
        hero: {
          badgeText: "Blog & Recursos",
          title: "Conocimiento que impulsa tu negocio digital.",
          subtitle:
            "Estrategias, tendencias y consejos prácticos de diseño web para que tu marca destaque y convierta más.",
        },
        article: {
          headings: [
            { level: 2, id: "por-que-diseno-importa", text: "Por qué el diseño importa" },
            { level: 3, id: "primera-impresion", text: "La primera impresión" },
            { level: 3, id: "confianza-y-conversion", text: "Confianza y conversión" },
            { level: 2, id: "elementos-clave", text: "Elementos clave de un sitio exitoso" },
            { level: 3, id: "velocidad", text: "Velocidad de carga" },
            { level: 3, id: "seo-tecnico", text: "SEO técnico" },
            { level: 2, id: "siguiente-paso", text: "El siguiente paso" },
          ],
          blocks: [
            {
              type: "h2",
              id: "por-que-diseno-importa",
              text: "Por qué el diseño importa",
            },
            {
              type: "p",
              text: "En un mercado donde la atención dura segundos, tu sitio web es el primer vendedor de tu negocio. Un diseño bien ejecutado no solo comunica quién eres: genera confianza, reduce fricción y guía al visitante hacia la acción que necesitas.",
            },
            {
              type: "h3",
              id: "primera-impresion",
              text: "La primera impresión",
            },
            {
              type: "p",
              text: "Los usuarios forman una opinión sobre un sitio en menos de 50 milisegundos. Eso significa que el color, la tipografía, el espaciado y la jerarquía visual comunican antes de que se lea una sola palabra. El diseño no es decoración: es comunicación.",
            },
            {
              type: "quote",
              text: "Un buen diseño web no se nota. Lo que se nota es cuando algo no funciona.",
            },
            {
              type: "h3",
              id: "confianza-y-conversion",
              text: "Confianza y conversión",
            },
            {
              type: "p",
              text: "La coherencia visual, los testimonios bien colocados, los llamados a acción claros y la velocidad de carga son los pilares que transforman visitas en oportunidades reales de negocio. Sin ellos, tienes tráfico pero no resultados.",
            },
            {
              type: "h2",
              id: "elementos-clave",
              text: "Elementos clave de un sitio exitoso",
            },
            {
              type: "p",
              text: "Más allá del aspecto visual, hay factores técnicos que determinan si tu sitio convierte o no. Aquí los más importantes que trabajamos en cada proyecto.",
            },
            {
              type: "h3",
              id: "velocidad",
              text: "Velocidad de carga",
            },
            {
              type: "p",
              text: "Google penaliza los sitios lentos y los usuarios los abandonan. Un tiempo de carga superior a 3 segundos incrementa la tasa de rebote hasta un 53%. Optimizamos imágenes, código y servidores para que tu sitio cargue en menos de 1.5 segundos.",
            },
            {
              type: "h3",
              id: "seo-tecnico",
              text: "SEO técnico",
            },
            {
              type: "p",
              text: "No basta con aparecer en Google: hay que aparecer cuando tu cliente tiene intención de compra. Estructuramos cada página con metadatos, schema markup, URLs limpias y arquitectura de contenido que posiciona orgánicamente.",
            },
            {
              type: "h2",
              id: "siguiente-paso",
              text: "El siguiente paso",
            },
            {
              type: "p",
              text: "Si llegaste hasta aquí, ya tienes la información. Ahora el movimiento que marca la diferencia es decidir actuar. Cuéntanos tu proyecto y en menos de 24 horas tendrás una propuesta concreta.",
            },
          ],
        },
        form: {
          title: "¿Tienes un proyecto?",
          subtitle: "Cuéntanos qué necesitas y te respondemos en menos de 24 horas.",
        },
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
    "blog",
    "footer",
    "whatsappFloatingButton",
  ],
};



import type { AboutContent } from "@/src/about/types";

export type AboutLanguage = "en" | "es";

const SPANISH_STRING_MAP: Record<string, string> = {
  Conoceme: "Conóceme",
  "Jose Miss builds frontend and CMS experiences with a clear business focus.":
    "Jose Miss crea experiencias frontend y CMS con un enfoque claro en negocio.",
  "Frontend & CMS Developer based in Mexico, open to USA and LATAM remote work. Specialized in Vue.js, Nuxt.js, WordPress, and Shopify with a strong focus on performance, technical SEO, and conversion-minded execution.":
    "Desarrollador Frontend y CMS basado en México, disponible para trabajo remoto en USA y LATAM. Especializado en Vue.js, Nuxt.js, WordPress y Shopify, con fuerte enfoque en rendimiento, SEO técnico y ejecución orientada a conversión.",
  Mexico: "México",
  "Open to USA & LATAM Remote": "Disponible para trabajo remoto en USA y LATAM",
  "Frontend & CMS Developer": "Desarrollador Frontend y CMS",
  "Since 2018": "Desde 2018",
  "Hands-on web delivery": "Entrega web práctica",
  "Custom frontend builds": "Desarrollos frontend a medida",
  "CMS and eCommerce execution": "Implementacion de CMS y eCommerce",
  "Performance + SEO": "Rendimiento + SEO",
  "Optimization as part of delivery": "Optimización como parte de la entrega",
  "A practical builder with design sensitivity and product awareness.":
    "Un perfil práctico con sensibilidad de diseño y visión de producto.",
  "My work sits between frontend engineering, CMS implementation, and conversion-focused execution. I build the interface layer, adapt platforms to business needs, and keep performance and maintainability in view from the start.":
    "Mi trabajo se mueve entre ingeniería frontend, implementación de CMS y ejecución enfocada en conversión. Construyo la capa de interfaz, adapto plataformas a necesidades de negocio y mantengo rendimiento y mantenibilidad presentes desde el inicio.",
  "A background in Graphic Design helps me collaborate closely with design teams and translate visual direction into production-ready UI. That balance is useful when projects need both polish and speed.":
    "Mi formación en Diseño Gráfico me ayuda a colaborar de cerca con equipos de diseño y convertir dirección visual en interfaces listas para producción. Ese equilibrio es útil cuando los proyectos necesitan calidad visual y velocidad.",
  "Build for clarity": "Construir con claridad",
  "Interfaces should feel clean, predictable, and easy to maintain, not just visually appealing.":
    "Las interfaces deben sentirse limpias, predecibles y fáciles de mantener, no solo verse bien.",
  "Optimize what matters": "Optimizar lo que importa",
  "Performance, SEO structure, and conversion surfaces are part of the implementation, not post-launch extras.":
    "El rendimiento, la estructura SEO y los puntos de conversión forman parte de la implementación, no son extras posteriores al lanzamiento.",
  "Work well remotely": "Trabajar bien en remoto",
  "I am used to collaborating with distributed teams across USA and LATAM using async-friendly workflows and clear handoffs.":
    "Estoy acostumbrado a colaborar con equipos distribuidos en USA y LATAM usando flujos de trabajo compatibles con asincronia y handoffs claros.",
  Frontend: "Frontend",
  "Vue.js and Nuxt.js interfaces": "Interfaces con Vue.js y Nuxt.js",
  "Custom frontend work for marketing sites, product experiences, and content-heavy builds that need structure, responsiveness, and maintainable code.":
    "Trabajo frontend a medida para sitios de marketing, experiencias de producto y desarrollos con mucho contenido que requieren estructura, respuesta y código mantenible.",
  "CMS & eCommerce": "CMS y eCommerce",
  "WordPress and Shopify delivery": "Entrega con WordPress y Shopify",
  "Theme customization, from-scratch builds, builder-based implementations, and third-party integrations aligned to content and commerce workflows.":
    "Personalizacion de temas, desarrollos desde cero, implementaciones con builders e integraciones de terceros alineadas a flujos de contenido y comercio.",
  Optimization: "Optimizacion",
  "Performance, SEO, and conversion support":
    "Soporte en rendimiento, SEO y conversión",
  "Core Web Vitals improvements, technical SEO foundations, analytics tooling, and UX adjustments that support acquisition and conversion goals.":
    "Mejoras de Core Web Vitals, bases de SEO técnico, herramientas de analítica y ajustes UX que apoyan objetivos de adquisición y conversión.",
  "Aug 2022 - July 2026": "Ago 2022 - Jul 2026",
  "Web Developer": "Desarrollador Web",
  LinkGraph: "LinkGraph",
  "Working across Shopify and WordPress delivery for marketing-driven websites and eCommerce implementations.":
    "Trabajo en implementaciones con Shopify y WordPress para sitios impulsados por marketing y proyectos de eCommerce.",
  "Customize Shopify stores with theme work and third-party app integrations.":
    "Personalizo tiendas Shopify con trabajo de temas e integraciones de apps de terceros.",
  "Build and maintain WordPress sites using custom development and page builders.":
    "Desarrollo y mantengo sitios WordPress usando desarrollo personalizado y page builders.",
  "Improve SEO structure, performance, and conversion-oriented user flows.":
    "Mejoro la estructura SEO, el rendimiento y los flujos de usuario orientados a conversión.",
  "Collaborate with remote marketing and development teams.":
    "Colaboro con equipos remotos de marketing y desarrollo.",
  "Aug 2020 - Sep 2022 | Jan 2024 - Present":
    "Ago 2020 - Sep 2022 | Ene 2024 - Actualidad",
  "Freelance Web Developer": "Desarrollador Web Freelance",
  "Honey Mustard": "Honey Mustard",
  "Supporting product and marketing initiatives with a mix of custom frontend development and CMS delivery.":
    "Apoyo iniciativas de producto y marketing con una mezcla de desarrollo frontend a medida y entrega CMS.",
  "Built custom frontend applications with Vue.js and Nuxt.js.":
    "Desarrollé aplicaciones frontend personalizadas con Vue.js y Nuxt.js.",
  "Developed WordPress and Shopify websites from scratch.":
    "Desarrollé sitios en WordPress y Shopify desde cero.",
  "Improved UI/UX quality and overall website performance.":
    "Mejoré la calidad UI/UX y el rendimiento general de los sitios.",
  "Aug 2020 - Aug 2022": "Ago 2020 - Ago 2022",
  "DUDE Agency": "DUDE Agency",
  "Delivered custom WordPress implementations for multiple client accounts with ongoing support responsibilities.":
    "Entregué implementaciones WordPress personalizadas para múltiples cuentas de clientes con responsabilidades de soporte continuo.",
  "Developed custom WordPress websites for different business contexts.":
    "Desarrolle sitios WordPress personalizados para distintos contextos de negocio.",
  "Handled theme customization and plugin integrations.":
    "Gestioné personalización de temas e integraciones de plugins.",
  "Maintained and improved live sites over time.":
    "Mantuve y mejoré sitios en producción con el tiempo.",
  "Mar 2018 - Sep 2020": "Mar 2018 - Sep 2020",
  "CEGA Security, Maya Solar, and Kemix Quimica":
    "CEGA Security, Maya Solar y Kemix Quimica",
  "Early in-house work focused on WordPress development, maintenance, and the operational side of keeping business sites healthy.":
    "Etapa inicial in-house enfocada en desarrollo WordPress, mantenimiento y la parte operativa de mantener sitios de negocio en buen estado.",
  "Delivered WordPress website development and maintenance.":
    "Entregué desarrollo y mantenimiento de sitios WordPress.",
  "Built the technical foundation for later CMS and frontend specialization.":
    "Construí la base técnica para la posterior especialización en CMS y frontend.",
  "Core technologies used to build responsive interfaces and custom UI implementations.":
    "Tecnologías base que uso para construir interfaces responsivas e implementaciones UI personalizadas.",
  "JavaScript (ES6+)": "JavaScript (ES6+)",
  "HTML5": "HTML5",
  "CSS3": "CSS3",
  "Tailwind CSS": "Tailwind CSS",
  jQuery: "jQuery",
  "Platforms where I usually translate business and content requirements into live sites.":
    "Plataformas donde normalmente convierto requerimientos de negocio y contenido en sitios publicados.",
  WordPress: "WordPress",
  "Custom Themes": "Temas personalizados",
  Builders: "Builders",
  Shopify: "Shopify",
  "App Integrations": "Integraciones de apps",
  "Performance & SEO": "Rendimiento y SEO",
  "Technical work that improves discoverability, speed, and operational visibility.":
    "Trabajo técnico que mejora visibilidad, velocidad y monitoreo operativo.",
  "Core Web Vitals": "Core Web Vitals",
  "Technical SEO": "SEO técnico",
  GA4: "GA4",
  GTM: "GTM",
  "Google Search Console": "Google Search Console",
  "Collaboration & Delivery": "Colaboracion y entrega",
  "Tools that support shipping, coordination, hosting, and design handoff.":
    "Herramientas que apoyan entrega, coordinación, hosting y handoff de diseño.",
  GitHub: "GitHub",
  Bitbucket: "Bitbucket",
  AWS: "AWS",
  "WP Engine": "WP Engine",
  Figma: "Figma",
  "Adobe XD": "Adobe XD",
  Zeplin: "Zeplin",
  Notion: "Notion",
  ClickUp: "ClickUp",
  Asana: "Asana",
  Monday: "Monday",
  "Why teams trust me": "Por que los equipos confian en mi",
    "Design and development are connected":
    "Diseño y desarrollo están conectados",
  "A Graphic Design degree makes it easier to interpret layouts, collaborate with designers, and ship UI with fewer translation gaps.":
    "Una licenciatura en Diseño Gráfico facilita interpretar layouts, colaborar con diseñadores y entregar UI con menos brechas de traducción.",
  "Delivery style": "Forma de trabajo",
  "Remote-ready collaboration": "Colaboracion lista para remoto",
  "I am comfortable working with distributed teams, clear feedback loops, and project management systems that keep progress visible.":
    "Me siento cómodo trabajando con equipos distribuidos, ciclos de feedback claros y sistemas de gestión que mantienen visible el progreso.",
  "Technical mindset": "Mentalidad tecnica",
  "Performance is part of the build": "El rendimiento es parte del desarrollo",
  "Optimization, structure, and clean implementation are treated as baseline quality, not a later patch.":
    "La optimización, la estructura y una implementación limpia se tratan como calidad base, no como un parche posterior.",
  "Business value": "Valor de negocio",
  "Digital work aligned to business goals":
    "Trabajo digital alineado a objetivos de negocio",
  "I focus on websites and stores that support marketing, commerce, and operational goals instead of shipping features in isolation.":
    "Me enfoco en sitios web y tiendas que apoyan objetivos de marketing, comercio y operacion, en lugar de entregar funcionalidades aisladas.",
  "Education and continuous growth": "Educación y crecimiento continuo",
  "Bachelor in Graphic Design from TecMilenio (2019). That foundation continues to shape how I approach interface detail, hierarchy, and collaboration with design teams.":
    "Licenciatura en Diseño Gráfico por TecMilenio (2019). Esa base sigue marcando cómo abordo el detalle de interfaz, la jerarquía y la colaboración con equipos de diseño.",
  "Spanish: Native": "Español: Nativo",
  "English: Professional working proficiency":
    "Ingles: Competencia profesional de trabajo",
  "Need a frontend or CMS partner who can move from idea to launch?":
    "¿Necesitas un partner de frontend o CMS que pueda llevar una idea hasta lanzamiento?",
  "I can support custom frontend work, WordPress or Shopify delivery, and optimization efforts for teams that value clean execution and reliable collaboration.":
    "Puedo apoyar desarrollo frontend a medida, entrega con WordPress o Shopify y esfuerzos de optimización para equipos que valoran ejecución limpia y colaboración confiable.",
  "Contact from the CV: femiss0693@gmail.com and linkedin.com/in/jose-miss":
    "Contacto del CV: femiss0693@gmail.com y linkedin.com/in/jose-miss",
};

const ABOUT_UI_COPY: Record<
  AboutLanguage,
  {
    switchLabel: string;
    snapshot: string;
    talkOnWhatsApp: string;
    viewLinkedIn: string;
    valueTitle: string;
    valueSubtitle: string;
    experienceTitle: string;
    experienceSubtitle: string;
    stackTitle: string;
    stackSubtitle: string;
    education: string;
    languages: string;
    differentiatorsTitle: string;
    differentiatorsSubtitle: string;
    startOnWhatsApp: string;
    sendEmail: string;
  }
> = {
  en: {
    switchLabel: "Language",
    snapshot: "Snapshot",
    talkOnWhatsApp: "Talk on WhatsApp",
    viewLinkedIn: "View LinkedIn",
    valueTitle: "Where I add the most value",
    valueSubtitle:
      "The strongest overlap in the CV is frontend delivery, CMS execution, and optimization work that supports growth.",
    experienceTitle: "Selected experience",
    experienceSubtitle:
      "A condensed version of the CV focused on the roles and responsibilities that matter most for a web-facing About page.",
    stackTitle: "Skills, stack, and delivery tools",
    stackSubtitle:
      "Grouped for web readability instead of repeating the CV format line by line.",
    education: "Education",
    languages: "Languages",
    differentiatorsTitle: "Differentiators",
    differentiatorsSubtitle:
      "The CV points to a profile that connects visual judgment, implementation discipline, and business-oriented web delivery.",
    startOnWhatsApp: "Start on WhatsApp",
    sendEmail: "Send an email",
  },
  es: {
    switchLabel: "Idioma",
    snapshot: "Resumen",
    talkOnWhatsApp: "Hablar por WhatsApp",
    viewLinkedIn: "Ver LinkedIn",
    valueTitle: "Donde aporto mas valor",
    valueSubtitle:
      "La mayor fortaleza del CV está en entrega frontend, ejecución CMS y trabajo de optimización orientado al crecimiento.",
    experienceTitle: "Experiencia seleccionada",
    experienceSubtitle:
      "Una versión condensada del CV enfocada en los roles y responsabilidades que más importan para una página pública de Conóceme.",
    stackTitle: "Skills, stack y herramientas de entrega",
    stackSubtitle:
      "Agrupado para una lectura web clara, en lugar de repetir el formato del CV línea por línea.",
    education: "Educación",
    languages: "Idiomas",
    differentiatorsTitle: "Diferenciadores",
    differentiatorsSubtitle:
      "El CV muestra un perfil que conecta criterio visual, disciplina de implementacion y entrega web orientada a negocio.",
    startOnWhatsApp: "Iniciar por WhatsApp",
    sendEmail: "Enviar correo",
  },
};

function translateUnknown<T>(value: T): T {
  if (typeof value === "string") {
    return (SPANISH_STRING_MAP[value] ?? value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateUnknown(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, translateUnknown(nestedValue)]),
    ) as T;
  }

  return value;
}

export function getLocalizedAboutContent(
  content: AboutContent,
  language: AboutLanguage,
): AboutContent {
  if (language === "en") {
    return content;
  }

  return translateUnknown(content);
}

export function getAboutUiCopy(language: AboutLanguage) {
  return ABOUT_UI_COPY[language];
}

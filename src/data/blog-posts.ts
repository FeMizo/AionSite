export type BlogBlock = {
  type: "h2" | "h3" | "p" | "quote";
  id?: string;
  text: string;
};

export type BlogHeading = {
  level: 2 | 3;
  id: string;
  text: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  badgeText: string;
  date: string;
  dateISO: string;
  readTime: string;
  keywords: string[];
  headings: BlogHeading[];
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "rediseno-web-cuando-por-que",
    title: "Rediseño de tu sitio web: cuándo hacerlo, por qué importa y cómo empezar",
    excerpt:
      "Tu sitio tiene 3 años sin cambios. Los resultados bajaron. Te contamos los signos de que es hora de rediseñar y cómo hacerlo sin perder tu posicionamiento.",
    image: "/blog/tu-sitio-tiene-3-anios-sin-cambios.webp",
    badgeText: "Estrategia & Transformación",
    date: "24 de abril, 2026",
    dateISO: "2026-04-24",
    readTime: "7 min de lectura",
    keywords: ["rediseño de sitio web", "modernizar página web", "actualizar diseño web", "renovar sitio", "rediseño web sin perder SEO", "mejora visual web", "actualización de sitio web México", "página web desactualizada"],
    headings: [
      { level: 2, id: "cuando-redisenar", text: "Señales de que ya es tiempo de rediseñar" },
      { level: 3, id: "tasa-rebote-alta", text: "Tu tasa de rebote subió" },
      { level: 3, id: "competencia-adelanta", text: "Tu competencia te adelanta visualmente" },
      { level: 3, id: "tecnologia-desactualizada", text: "Tu tecnología está desactualizada" },
      { level: 2, id: "riesgos-rediseno", text: "Los riesgos de un rediseño mal ejecutado" },
      { level: 3, id: "perder-seo", text: "Perder todo tu posicionamiento en Google" },
      { level: 3, id: "experiencia-rota", text: "Romper la experiencia de usuario actual" },
      { level: 2, id: "como-hacer-bien", text: "Cómo rediseñar correctamente" },
      { level: 3, id: "paso-1-auditoria", text: "Paso 1: Auditoría de lo que funciona" },
      { level: 3, id: "paso-2-arquitectura", text: "Paso 2: Planifica la nueva arquitectura" },
      { level: 3, id: "paso-3-redirecciones", text: "Paso 3: Configura redirecciones 301" },
      { level: 2, id: "conclusion-rediseno", text: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "cuando-redisenar", text: "Señales de que ya es tiempo de rediseñar" },
      {
        type: "p",
        text: "Un sitio web es como una tienda física: con el tiempo, la pintura se despinta, los muebles envejecen y los clientes se preguntan si el negocio sigue activo. En web, esto sucede en meses, no en años. Si tu sitio sigue viendo igual que hace 3 años, tu audiencia ya pasó a competidores que lucen más modernos y confiables.",
      },
      { type: "h3", id: "tasa-rebote-alta", text: "Tu tasa de rebote subió" },
      {
        type: "p",
        text: "Cuando más del 60-70% de los visitantes llegan a tu sitio y se van sin interactuar, algo falla. Puede ser el diseño visual, la navegación confusa, o que el contenido no responde lo que buscaban. Un rediseño enfocado en UX puede reducir esa tasa en picada.",
      },
      { type: "h3", id: "competencia-adelanta", text: "Tu competencia te adelanta visualmente" },
      {
        type: "p",
        text: "Visita los sitios de tus competidores directos. Si ves que tienen diseño moderno, navegación clara y propuestas visibles mientras el tuyo luce como si congelara el tiempo en 2020, tienes un problema. Los usuarios forman opiniones en 50 milisegundos. Un sitio anticuado pierde credibilidad antes de que el visitante lea una palabra.",
      },
      {
        type: "quote",
        text: "La última actualización visual de tu sitio fue hace X años. La última actualización en la industria fue la semana pasada.",
      },
      { type: "h3", id: "tecnologia-desactualizada", text: "Tu tecnología está desactualizada" },
      {
        type: "p",
        text: "Si tu sitio corre en WordPress 4.x, jQuery obsoleto o una arquitectura monolítica que no es mobile-friendly, la hora del cambio llegó. Las tecnologías modernas son más rápidas, seguras y escalables. Un cambio de framework puede doblarte la velocidad de carga, lo que directamente impacta SEO y conversiones.",
      },
      { type: "h2", id: "riesgos-rediseno", text: "Los riesgos de un rediseño mal ejecutado" },
      {
        type: "p",
        text: "Aquí está el dilema: un rediseño puede darte un impulso tremendo, o puede hundirte en el rankings de Google. Todo depende de cómo lo hagas.",
      },
      { type: "h3", id: "perder-seo", text: "Perder todo tu posicionamiento en Google" },
      {
        type: "p",
        text: "Si cambias todas las URLs de tus páginas sin configurar redirecciones 301, Google las verá como páginas nuevas. Pierdes el autoridad acumulada de años. Si modificas los meta títulos y descripciones sin estrategia, tu CTR cae. Si la arquitectura cambia sin un plan de migración, el Googlebot se pierde. Hemos visto negocios que tardaron 2 años en recuperarse después de un rediseño mal hecho.",
      },
      { type: "h3", id: "experiencia-rota", text: "Romper la experiencia de usuario actual" },
      {
        type: "p",
        text: "Tus usuarios actuales conocen tu sitio. Saben dónde está el botón de contacto, cómo llegar a tu catálogo, dónde ver testimonios. Un rediseño radical que cambia todo puede confundirlos y mandarlos a competidores. El cambio debe ser una evolución, no una revolución.",
      },
      { type: "h2", id: "como-hacer-bien", text: "Cómo rediseñar correctamente" },
      {
        type: "p",
        text: "Existen procesos que minimizan riesgo y maximizan impacto. Estos son los pasos que aplicamos en cada rediseño.",
      },
      { type: "h3", id: "paso-1-auditoria", text: "Paso 1: Auditoría de lo que funciona" },
      {
        type: "p",
        text: "Antes de cambiar nada, descubre qué está funcionando. Analiza Google Analytics: ¿cuáles son tus páginas con más tráfico? ¿Desde dónde llega ese tráfico? ¿Qué palabras clave te traen visitantes? ¿Cuál es tu tasa de conversión por fuente? Rediseña manteniendo lo que funciona. Mejora o elimina lo que no. Esto evita lanzar al aire lo que ya está generando resultados.",
      },
      { type: "h3", id: "paso-2-arquitectura", text: "Paso 2: Planifica la nueva arquitectura" },
      {
        type: "p",
        text: "Decide si vas a mantener las mismas URLs o si necesitas cambiarlas. Generalmente, es mejor mantenerlas. Si no puedes, planifica cada redirección: página antigua → página nueva, 301 permanente. Revisa la estructura de carpetas, las categorías, los slugs. Un cambio de arquitectura bien planeado dura un par de horas de implementación. Uno mal planeado puede costarte semanas.",
      },
      { type: "h3", id: "paso-3-redirecciones", text: "Paso 3: Configura redirecciones 301" },
      {
        type: "p",
        text: "Las redirecciones 301 le dicen a Google: 'esta página antigua ahora es esta otra'. El buscador transfiere el autoridad de la vieja a la nueva. Sin esto, tienes un desastre SEO. Con esto, el cambio es transparente para Google y los usuarios. Verifica cada redirección después de lanzar: entra a Google Search Console, revisa errores 404 y soluciónalos antes de que se indexen.",
      },
      { type: "h2", id: "conclusion-rediseno", text: "Conclusión" },
      {
        type: "p",
        text: "Un rediseño no es un lujo: es una necesidad si tu sitio dejó de crecer. Pero hacerlo mal es peor que no hacerlo. El proceso correcto es: auditoría → planificación → implementación con redirecciones → seguimiento. Si no tienes el tiempo o conocimiento técnico para hacerlo, es el momento de traer a un profesional. Tu posicionamiento en Google vale mucho más que lo que cuesta hacerlo correctamente.",
      },
    ],
  },
  {
    id: "velocidad-web-posicionamiento",
    title: "Velocidad web: el factor silencioso que está bloqueando tu crecimiento",
    excerpt:
      "Un sitio lento no solo frustra a tus visitantes: Google lo penaliza directamente en rankings. Descubre cómo medir, diagnosticar y mejorar la velocidad de tu sitio en pasos concretos.",
    image: "/blog/velocidad-web.webp",
    badgeText: "Velocidad & Rendimiento",
    date: "22 de abril, 2026",
    dateISO: "2026-04-22",
    readTime: "7 min de lectura",
    keywords: ["velocidad web", "Core Web Vitals", "LCP", "PageSpeed Insights", "optimización web", "SEO técnico", "sitio lento", "WebP", "CDN", "hosting web México"],
    headings: [
      { level: 2, id: "el-problema-de-la-velocidad", text: "El problema silencioso de la velocidad" },
      { level: 3, id: "como-afecta-al-negocio", text: "Cómo afecta a tu negocio" },
      { level: 3, id: "como-medir", text: "Cómo medir tu velocidad actual" },
      { level: 2, id: "causas-mas-comunes", text: "Las causas más comunes de un sitio lento" },
      { level: 3, id: "imagenes-sin-optimizar", text: "Imágenes sin optimizar" },
      { level: 3, id: "hosting-inadecuado", text: "Hosting inadecuado" },
      { level: 3, id: "codigo-innecesario", text: "Código innecesario o redundante" },
      { level: 2, id: "soluciones-practicas", text: "Soluciones prácticas que realmente funcionan" },
      { level: 3, id: "optimizar-imagenes", text: "Optimizar imágenes" },
      { level: 3, id: "cache-y-cdn", text: "Caché y CDN" },
      { level: 2, id: "impacto-en-seo", text: "El impacto directo en tu SEO" },
    ],
    blocks: [
      { type: "h2", id: "el-problema-de-la-velocidad", text: "El problema silencioso de la velocidad" },
      {
        type: "p",
        text: "La mayoría de los dueños de negocios no saben que su sitio es lento hasta que alguien se los dice. Para entonces, ya lleva meses perdiendo clientes en silencio. La velocidad no es un detalle técnico menor: es uno de los factores con mayor impacto en conversión, experiencia de usuario y posicionamiento en Google.",
      },
      { type: "h3", id: "como-afecta-al-negocio", text: "Cómo afecta a tu negocio" },
      {
        type: "p",
        text: "Estudios de Google y Amazon revelan que por cada segundo adicional de carga, la tasa de conversión cae entre un 4% y un 7%. Si tu sitio tarda 5 segundos en cargar, más del 50% de los visitantes ya se fueron antes de ver siquiera tu propuesta de valor. Ese tráfico que estás pagando en anuncios o ganando con SEO simplemente se pierde.",
      },
      {
        type: "quote",
        text: "Un sitio que tarda 3 segundos en cargar pierde el 53% de sus visitas móviles. No hay contenido ni diseño que pueda compensar esa pérdida.",
      },
      { type: "h3", id: "como-medir", text: "Cómo medir tu velocidad actual" },
      {
        type: "p",
        text: "Antes de corregir, hay que medir. Las herramientas gratuitas más confiables son Google PageSpeed Insights, GTmetrix y WebPageTest. Cada una te da un puntaje y, más importante, una lista de los elementos que más están ralentizando tu sitio. Busca el LCP (Largest Contentful Paint): si supera los 2.5 segundos, tienes un problema que Google ya está penalizando.",
      },
      { type: "h2", id: "causas-mas-comunes", text: "Las causas más comunes de un sitio lento" },
      {
        type: "p",
        text: "Después de auditar decenas de sitios, las causas se repiten casi siempre. No hace falta ser desarrollador para entenderlas, pero sí hace falta un profesional para corregirlas correctamente.",
      },
      { type: "h3", id: "imagenes-sin-optimizar", text: "Imágenes sin optimizar" },
      {
        type: "p",
        text: "Es la causa número uno de sitios lentos. Una foto tomada con un smartphone puede pesar 5 MB o más. Si tu sitio carga 10 imágenes así, el usuario tiene que descargar 50 MB antes de ver la página completa. La solución es convertir imágenes a formatos modernos como WebP, reducir su resolución al tamaño real en que se muestran y usar carga diferida (lazy loading) para las que están más abajo en la página.",
      },
      { type: "h3", id: "hosting-inadecuado", text: "Hosting inadecuado" },
      {
        type: "p",
        text: "Un hosting barato compartido puede ser suficiente para un blog personal, pero no para un sitio de negocios. Si el servidor tarda más de 200ms en responder (TTFB: Time to First Byte), todo lo demás que hagas en optimización tendrá un techo bajo. Invertir en un hosting de calidad o en una arquitectura con CDN es lo más eficiente que puedes hacer por tu velocidad.",
      },
      { type: "h3", id: "codigo-innecesario", text: "Código innecesario o redundante" },
      {
        type: "p",
        text: "Los sitios WordPress con decenas de plugins, los temas multipropósito cargados de funciones que nunca usas, o el JavaScript de terceros que carga de forma bloqueante son fuentes frecuentes de lentitud. Cada plugin que instalas agrega peticiones al servidor y código que el navegador debe procesar antes de mostrar la página.",
      },
      { type: "h2", id: "soluciones-practicas", text: "Soluciones prácticas que realmente funcionan" },
      {
        type: "p",
        text: "No existe una solución única para todos los sitios, pero hay mejoras que aplican casi siempre y que generan un impacto medible en pocas horas de trabajo.",
      },
      { type: "h3", id: "optimizar-imagenes", text: "Optimizar imágenes" },
      {
        type: "p",
        text: "Convierte todas las imágenes a WebP y comprime sin pérdida visible de calidad. Implementa lazy loading para que solo carguen las imágenes visibles en pantalla. Define explícitamente el ancho y alto de cada imagen para evitar el Cumulative Layout Shift (CLS), que es otro de los factores que Google mide. Esta sola acción puede reducir el peso de tu página en un 60% o más.",
      },
      { type: "h3", id: "cache-y-cdn", text: "Caché y CDN" },
      {
        type: "p",
        text: "El caché almacena una versión lista para entregar de tu sitio, eliminando el tiempo de procesamiento en cada visita. Un CDN (Content Delivery Network) distribuye esos archivos en servidores alrededor del mundo, de modo que cada usuario los recibe desde el servidor geográficamente más cercano a él. La combinación de ambos puede reducir los tiempos de carga a menos de 1 segundo en la mayoría de conexiones.",
      },
      { type: "h2", id: "impacto-en-seo", text: "El impacto directo en tu SEO" },
      {
        type: "p",
        text: "Desde 2021, Google incorporó los Core Web Vitals como factor oficial de ranking. Esto significa que la velocidad de tu sitio afecta directamente qué tan arriba apareces en los resultados de búsqueda. Un sitio lento compite con desventaja, sin importar cuánto contenido de calidad tenga. Si dos sitios tienen SEO similar pero uno es rápido y el otro lento, Google elige el rápido. La velocidad no es un lujo: es una ventaja competitiva que puedes activar hoy.",
      },
    ],
  },
  {
    id: "diseno-web-que-convierte",
    title: "Diseño web que convierte: los 7 principios que más importan",
    excerpt:
      "Un sitio hermoso no sirve de nada si no genera clientes. Descubre qué elementos de diseño determinan si un visitante se queda o se va en segundos.",
    image: "/blog/diseno-web-que-convierte.webp",
    badgeText: "Diseño & Conversión",
    date: "15 de abril, 2026",
    dateISO: "2026-04-15",
    readTime: "6 min de lectura",
    keywords: ["diseño web que convierte", "tasa de conversión", "CTA", "jerarquía visual", "UX diseño web", "landing page México", "diseño web negocios", "experiencia de usuario"],
    headings: [
      { level: 2, id: "por-que-falla", text: "Por qué falla la mayoría de sitios" },
      { level: 3, id: "primera-impresion", text: "La primera impresión" },
      { level: 3, id: "claridad-vs-creatividad", text: "Claridad vs. creatividad" },
      { level: 2, id: "7-principios", text: "Los 7 principios clave" },
      { level: 3, id: "jerarquia", text: "Jerarquía visual" },
      { level: 3, id: "velocidad", text: "Velocidad de carga" },
      { level: 3, id: "cta", text: "Llamados a acción claros" },
      { level: 2, id: "conclusion", text: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "por-que-falla", text: "Por qué falla la mayoría de sitios" },
      {
        type: "p",
        text: "El error más común en el diseño web no es técnico: es estratégico. La mayoría de sitios están construidos para impresionar al dueño del negocio, no para guiar al visitante hacia una decisión. El resultado es un sitio visualmente interesante que no genera resultados.",
      },
      { type: "h3", id: "primera-impresion", text: "La primera impresión" },
      {
        type: "p",
        text: "Los usuarios forman una opinión sobre un sitio en menos de 50 milisegundos. Antes de leer una sola palabra, ya decidieron si confían en ti o no. El color, la tipografía, el espacio en blanco y la coherencia visual son los que hablan primero.",
      },
      {
        type: "quote",
        text: "No puedes tener una segunda oportunidad de causar una primera impresión. En web, esa impresión dura menos de un segundo.",
      },
      { type: "h3", id: "claridad-vs-creatividad", text: "Claridad vs. creatividad" },
      {
        type: "p",
        text: "La creatividad sin claridad es ruido. Cuando un visitante llega a tu sitio, tiene una pregunta en mente: ¿esto es para mí? Tu diseño debe responder eso en los primeros 3 segundos. Si no lo hace, se va. La creatividad debe estar al servicio de la claridad, nunca al revés.",
      },
      { type: "h2", id: "7-principios", text: "Los 7 principios clave" },
      {
        type: "p",
        text: "Después de trabajar en más de 30 proyectos, estos son los principios que consistentemente generan mejores resultados de conversión.",
      },
      { type: "h3", id: "jerarquia", text: "Jerarquía visual" },
      {
        type: "p",
        text: "El ojo sigue un orden. El título más importante debe ser el más grande. El botón más importante debe tener el mayor contraste. La información más relevante debe estar más arriba. Cuando la jerarquía es correcta, el visitante sabe exactamente a dónde mirar y qué hacer.",
      },
      { type: "h3", id: "velocidad", text: "Velocidad de carga" },
      {
        type: "p",
        text: "Google penaliza los sitios lentos en rankings. Los usuarios los abandonan antes de que carguen. Un retraso de 1 segundo en la carga reduce la conversión hasta un 7%. Optimizar imágenes, código y hosting no es opcional: es fundacional.",
      },
      { type: "h3", id: "cta", text: "Llamados a acción claros" },
      {
        type: "p",
        text: "Cada página debe tener un objetivo y un botón principal que lo lleve ahí. No tres botones. No cinco opciones. Uno. El visitante no debe adivinar qué hacer: el diseño debe decírselo con claridad. La ambigüedad mata la conversión.",
      },
      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "Un buen diseño web no se nota porque todo fluye. El visitante llega, entiende, confía y actúa. Si tu sitio actual no está generando los resultados que esperabas, lo más probable es que alguno de estos principios no esté bien implementado. Cuéntanos tu caso y te ayudamos a identificar qué ajustar.",
      },
    ],
  },
  {
    id: "seo-tecnico-para-negocios",
    title: "SEO técnico en 2026: lo que sí mueve el ranking de tu negocio",
    excerpt:
      "El SEO cambió. Ya no basta con poner palabras clave. Te explicamos qué factores técnicos posicionan hoy y cómo aplicarlos en tu sitio.",
    image: "/blog/seo-tecnico.webp",
    badgeText: "SEO & Visibilidad",
    date: "8 de abril, 2026",
    dateISO: "2026-04-08",
    readTime: "8 min de lectura",
    keywords: ["SEO técnico 2026", "Schema Markup", "Core Web Vitals", "mobile-first indexing", "posicionamiento Google", "sitemap XML", "rich snippets", "SEO para negocios México"],
    headings: [
      { level: 2, id: "seo-2026", text: "El SEO en 2026" },
      { level: 3, id: "core-web-vitals", text: "Core Web Vitals" },
      { level: 3, id: "estructura", text: "Estructura y arquitectura" },
      { level: 2, id: "factores-clave", text: "Factores técnicos que mueven el ranking" },
      { level: 3, id: "schema", text: "Schema Markup" },
      { level: 3, id: "mobile", text: "Mobile-first indexing" },
      { level: 2, id: "checklist", text: "Checklist de implementación" },
    ],
    blocks: [
      { type: "h2", id: "seo-2026", text: "El SEO en 2026" },
      {
        type: "p",
        text: "El SEO ya no se trata de repetir palabras clave en tu texto. Google ha evolucionado para entender intención, contexto y experiencia de usuario. Los sitios que posicionan hoy son los que combinan contenido relevante con una base técnica sólida.",
      },
      { type: "h3", id: "core-web-vitals", text: "Core Web Vitals" },
      {
        type: "p",
        text: "Google mide directamente cómo se siente tu sitio para el usuario. LCP (tiempo de carga del elemento principal), FID (respuesta a interacciones) e CLS (estabilidad visual) son métricas que afectan tu ranking directamente. Un sitio con malos Core Web Vitals nunca llegará a la primera página, sin importar qué tan buen contenido tenga.",
      },
      {
        type: "quote",
        text: "Google no solo analiza tu contenido. Analiza si tu sitio merece ser recomendado a sus usuarios.",
      },
      { type: "h3", id: "estructura", text: "Estructura y arquitectura" },
      {
        type: "p",
        text: "La arquitectura de información determina cómo Googlebot recorre tu sitio y qué páginas considera importantes. URLs limpias, navegación lógica, mapa del sitio actualizado y enlaces internos bien estructurados son la base de cualquier estrategia SEO exitosa.",
      },
      { type: "h2", id: "factores-clave", text: "Factores técnicos que mueven el ranking" },
      {
        type: "p",
        text: "Más allá de los conceptos generales, estos son los elementos técnicos que trabajamos en cada proyecto para mejorar el posicionamiento.",
      },
      { type: "h3", id: "schema", text: "Schema Markup" },
      {
        type: "p",
        text: "El Schema Markup le dice a Google exactamente qué es cada elemento de tu página: un negocio local, un producto, una reseña, un artículo. Los sitios que lo implementan correctamente aparecen con rich snippets en los resultados de búsqueda, lo que aumenta significativamente el CTR.",
      },
      { type: "h3", id: "mobile", text: "Mobile-first indexing" },
      {
        type: "p",
        text: "Google indexa primero la versión móvil de tu sitio. Si tu diseño móvil es deficiente, tu posicionamiento sufre, incluso para búsquedas desde desktop. Diseñar mobile-first no es una tendencia: es el requisito mínimo para competir.",
      },
      { type: "h2", id: "checklist", text: "Checklist de implementación" },
      {
        type: "p",
        text: "Antes de invertir en contenido o campañas, verifica estos puntos técnicos: velocidad de carga menor a 2 segundos, HTTPS activo, sitemap.xml actualizado, robots.txt correcto, metadatos únicos por página, imágenes con alt text y Schema Markup implementado. Si alguno falla, el resto del esfuerzo pierde eficiencia.",
      },
    ],
  },
  {
    id: "cuando-necesitas-sitio-web",
    title: "¿Cuándo realmente necesitas un sitio web para tu negocio?",
    excerpt:
      "Muchos negocios esperan demasiado. Otros invierten antes de tiempo. Te ayudamos a identificar el momento correcto y qué tipo de sitio necesitas.",
    image: "/blog/necesitas-sitio-web.webp",
    badgeText: "Estrategia Digital",
    date: "1 de abril, 2026",
    dateISO: "2026-04-01",
    readTime: "5 min de lectura",
    keywords: ["sitio web para negocio", "cuándo crear página web", "presencia digital", "página de conversión", "tienda en línea México", "sitio corporativo", "diseño web para empresas"],
    headings: [
      { level: 2, id: "el-momento-correcto", text: "El momento correcto" },
      { level: 3, id: "senales", text: "Señales de que ya es tiempo" },
      { level: 3, id: "errores-comunes", text: "Errores comunes al empezar" },
      { level: 2, id: "que-tipo-necesitas", text: "¿Qué tipo de sitio necesitas?" },
      { level: 3, id: "pagina-de-conversion", text: "Página de conversión" },
      { level: 3, id: "sitio-corporativo", text: "Sitio corporativo" },
      { level: 3, id: "ecommerce", text: "Tienda en línea" },
      { level: 2, id: "siguiente-paso", text: "El siguiente paso" },
    ],
    blocks: [
      { type: "h2", id: "el-momento-correcto", text: "El momento correcto" },
      {
        type: "p",
        text: "La pregunta no es si necesitas un sitio web: la necesitas. La pregunta es cuándo y de qué tipo. Empezar demasiado pronto con un sitio sobredimensionado desperdicia presupuesto. Esperar demasiado te hace perder clientes que buscan online antes de comprar.",
      },
      { type: "h3", id: "senales", text: "Señales de que ya es tiempo" },
      {
        type: "p",
        text: "Si ya tienes clientes recurrentes, si alguien te preguntó por tu sitio y no tenías uno, si dependes completamente de redes sociales para conseguir nuevos clientes, o si tu competencia aparece en Google y tú no: ya es tiempo. Cada día sin presencia web es una oportunidad que alguien más está tomando.",
      },
      {
        type: "quote",
        text: "Las redes sociales son prestadas. Tu sitio web es tuyo. Es el único canal digital que nadie te puede quitar.",
      },
      { type: "h3", id: "errores-comunes", text: "Errores comunes al empezar" },
      {
        type: "p",
        text: "El error más costoso es invertir en un sitio complejo cuando aún no tienes claro tu mensaje principal. El segundo error es elegir la solución más barata sin entender las limitaciones que tendrá a mediano plazo. La inversión en web debe ser proporcional al nivel de negocio que tienes hoy y al que quieres tener en 12 meses.",
      },
      { type: "h2", id: "que-tipo-necesitas", text: "¿Qué tipo de sitio necesitas?" },
      {
        type: "p",
        text: "No todos los sitios web sirven para lo mismo. Elegir el tipo correcto desde el inicio te ahorra tiempo, dinero y frustraciones.",
      },
      { type: "h3", id: "pagina-de-conversion", text: "Página de conversión" },
      {
        type: "p",
        text: "Ideal si tienes un servicio o producto principal y quieres generar leads o ventas directas. Una sola página bien diseñada, con propuesta de valor clara y un botón de contacto, puede ser más efectiva que un sitio de 10 páginas sin estrategia.",
      },
      { type: "h3", id: "sitio-corporativo", text: "Sitio corporativo" },
      {
        type: "p",
        text: "Para negocios con múltiples servicios, equipos o que necesitan transmitir credibilidad institucional. Incluye secciones de about, servicios, portafolio, testimonios y contacto. Es la opción más completa para negocios en crecimiento.",
      },
      { type: "h3", id: "ecommerce", text: "Tienda en línea" },
      {
        type: "p",
        text: "Cuando vendes productos físicos o digitales y quieres automatizar el proceso de compra. Requiere mayor inversión inicial pero genera ventas 24/7 sin intervención manual. Solo tiene sentido si tienes catálogo definido y capacidad logística.",
      },
      { type: "h2", id: "siguiente-paso", text: "El siguiente paso" },
      {
        type: "p",
        text: "Si todavía no estás seguro de qué tipo de sitio necesitas, cuéntanos tu negocio y te ayudamos a definirlo sin costo. En 15 minutos podemos darte claridad sobre qué invertir, cuándo y cómo.",
      },
    ],
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

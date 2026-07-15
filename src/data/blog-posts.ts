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
    id: "mantenimiento-web-mensual-no-perder-ventas",
    title: "Mantenimiento web mensual para no perder ventas",
    excerpt:
      "Tu sitio no se rompe de un día a otro: se desgasta. Esto debes revisar cada mes para evitar caídas, errores, mala velocidad y oportunidades perdidas.",
    image: "/blog/mantenimiento-web-mensual-no-perder-ventas.webp",
    badgeText: "Mantenimiento & Rendimiento",
    date: "15 de julio, 2026",
    dateISO: "2026-07-15",
    readTime: "7 min de lectura",
    keywords: [
      "mantenimiento web mensual",
      "mantenimiento de sitio web",
      "optimización web continua",
      "auditoría técnica web",
      "sitio web lento soluciones",
      "actualizar sitio web negocio",
      "mantenimiento web México",
      "rendimiento web",
    ],
    headings: [
      { level: 2, id: "por-que-el-sitio-se-desgasta", text: "Por qué un sitio se desgasta aunque siga en línea" },
      { level: 3, id: "deuda-digital-acumulada", text: "La deuda digital se acumula en silencio" },
      { level: 2, id: "que-revisar-cada-mes", text: "Qué revisar cada mes en tu sitio web" },
      { level: 3, id: "rendimiento-y-core-web-vitals", text: "1. Rendimiento y Core Web Vitals" },
      { level: 3, id: "formularios-y-conversiones", text: "2. Formularios, WhatsApp y conversiones" },
      { level: 3, id: "contenido-y-seo-vivo", text: "3. Contenido, metadatos y SEO vivo" },
      { level: 3, id: "seguridad-y-actualizaciones", text: "4. Seguridad, backups y actualizaciones" },
      { level: 2, id: "senales-de-alerta", text: "Señales de que ya vas tarde con el mantenimiento" },
      { level: 2, id: "rutina-simple", text: "Una rutina mensual simple que sí se cumple" },
      { level: 2, id: "cierre-mantenimiento", text: "El costo real de no revisar tu sitio" },
    ],
    blocks: [
      { type: "h2", id: "por-que-el-sitio-se-desgasta", text: "Por qué un sitio se desgasta aunque siga en línea" },
      {
        type: "p",
        text: "Muchos negocios creen que si su sitio todavía abre, entonces está bien. No funciona así. Un sitio web no falla solo cuando se cae: también falla cuando carga más lento que hace tres meses, cuando el formulario deja de enviar prospectos, cuando una actualización rompe una sección o cuando Google encuentra páginas desactualizadas y empieza a ignorarlas.",
      },
      {
        type: "p",
        text: "El desgaste digital es acumulativo. Cada plugin sin revisar, cada imagen nueva sin optimizar, cada CTA que nadie prueba y cada página que se queda vieja reduce el rendimiento comercial del sitio. No se nota en un día. Se nota cuando pasan semanas sin leads y nadie entiende por qué.",
      },
      { type: "h3", id: "deuda-digital-acumulada", text: "La deuda digital se acumula en silencio" },
      {
        type: "p",
        text: "Igual que un local físico necesita limpieza, inventario y mantenimiento preventivo, tu sitio necesita revisiones periódicas. Si no las haces, empiezas a pagar intereses en forma de rebote, frustración del usuario y oportunidades perdidas. El problema es que casi siempre descubres ese costo demasiado tarde.",
      },
      {
        type: "quote",
        text: "El mantenimiento web no existe para que tu sitio siga vivo. Existe para que siga vendiendo.",
      },
      { type: "h2", id: "que-revisar-cada-mes", text: "Qué revisar cada mes en tu sitio web" },
      {
        type: "p",
        text: "No necesitas una auditoría gigante cada semana. Sí necesitas una rutina mensual clara con pocos puntos críticos. Estos son los cuatro frentes que más impacto tienen en resultados reales.",
      },
      { type: "h3", id: "rendimiento-y-core-web-vitals", text: "1. Rendimiento y Core Web Vitals" },
      {
        type: "p",
        text: "Revisa velocidad en móvil y desktop con PageSpeed Insights o Lighthouse. Si el LCP sube, si aparecen scripts bloqueantes o si las imágenes pesan más de lo debido, el sitio empieza a perder conversiones incluso antes de caer en rankings. La regla práctica es simple: si cada mes no mides, cada mes asumes que todo sigue bien sin evidencia.",
      },
      {
        type: "p",
        text: "También conviene revisar páginas clave por separado: inicio, servicios, landing principal y contacto. Son las que más dinero pierden cuando el rendimiento cae. Un sitio puede verse correcto en general y, aun así, tener su página más importante cargando en cinco segundos.",
      },
      { type: "h3", id: "formularios-y-conversiones", text: "2. Formularios, WhatsApp y conversiones" },
      {
        type: "p",
        text: "Cada mes alguien debe probar que los formularios envían, que los botones de WhatsApp abren el destino correcto y que los correos llegan a la bandeja adecuada. Este tipo de falla es devastadora porque no genera ruido técnico: simplemente deja de entrar negocio. Muchas empresas pasan semanas pensando que hay baja demanda cuando el problema real era un formulario roto.",
      },
      {
        type: "p",
        text: "Haz una prueba completa como usuario real. Llena el formulario, revisa la respuesta automática, confirma la notificación al equipo y valida que el lead quede registrado donde debe. Si el sitio vende, este chequeo no es opcional.",
      },
      { type: "h3", id: "contenido-y-seo-vivo", text: "3. Contenido, metadatos y SEO vivo" },
      {
        type: "p",
        text: "El contenido también envejece. Revisa si tus páginas siguen respondiendo las preguntas actuales del cliente, si los títulos siguen dentro de longitud útil, si las descripciones invitan al clic y si hay enlaces internos hacia tus páginas estratégicas. Un sitio sin mantenimiento editorial se queda congelado mientras la competencia sigue publicando y afinando su estructura.",
      },
      {
        type: "p",
        text: "Actualizar no siempre significa reescribir todo. A veces basta con mejorar una sección, agregar un caso real, refrescar cifras, corregir una promesa vieja o sumar una FAQ que hoy sí responde la intención de búsqueda. Pequeños cambios sostenidos mantienen vivo el posicionamiento.",
      },
      { type: "h3", id: "seguridad-y-actualizaciones", text: "4. Seguridad, backups y actualizaciones" },
      {
        type: "p",
        text: "Un mantenimiento mensual serio incluye validar backups restaurables, revisar certificados, actualizar dependencias o plugins con criterio y detectar errores en consola o en logs básicos. No se trata de actualizar por actualizar. Se trata de reducir superficie de fallo antes de que el usuario la encuentre primero.",
      },
      {
        type: "p",
        text: "Si tu sitio depende de integraciones, agenda una revisión de APIs, formularios externos, mapas, pixels y automatizaciones. La mayoría de los incidentes pequeños empieza ahí: un token caducado, un endpoint que cambió, una integración que nadie monitoreó.",
      },
      { type: "h2", id: "senales-de-alerta", text: "Señales de que ya vas tarde con el mantenimiento" },
      {
        type: "p",
        text: "Hay síntomas que se repiten: el sitio tarda más pero nadie sabe desde cuándo, el tráfico sigue llegando pero ya no convierte igual, aparecen páginas con información vencida, los cambios se hacen con miedo porque nadie sabe qué podría romperse y cada ajuste termina siendo una urgencia. Cuando eso pasa, ya no estás manteniendo: estás apagando incendios.",
      },
      {
        type: "p",
        text: "Otra señal crítica es depender de una sola persona que conoce todo de memoria. El mantenimiento sano deja evidencia, checklist y criterio compartido. Si nadie puede revisar el sitio sin improvisar, el riesgo operativo ya es alto.",
      },
      { type: "h2", id: "rutina-simple", text: "Una rutina mensual simple que sí se cumple" },
      {
        type: "p",
        text: "Una rutina útil puede resolverse en menos de una hora al mes: medir velocidad en páginas clave, enviar un lead de prueba, revisar enlaces y CTAs principales, validar backups, actualizar componentes con respaldo y registrar hallazgos. Lo importante no es que sea sofisticada. Lo importante es que exista y se repita.",
      },
      {
        type: "p",
        text: "Cuando esa rutina se vuelve parte del negocio, tu sitio deja de ser una pieza olvidada y vuelve a convertirse en un activo comercial. Esa diferencia explica por qué algunos sitios mejoran mes a mes mientras otros solo se tocan cuando ya hubo pérdida.",
      },
      { type: "h2", id: "cierre-mantenimiento", text: "El costo real de no revisar tu sitio" },
      {
        type: "p",
        text: "Posponer mantenimiento parece ahorrar tiempo y dinero, pero casi siempre hace lo contrario. Cada mes sin revisión aumenta la probabilidad de perder leads, caer en rendimiento, publicar información obsoleta o depender de una reparación más costosa. En web, lo barato casi siempre sale caro cuando el sitio es parte de tu captación.",
      },
      {
        type: "p",
        text: "Si tu sitio lleva meses sin una revisión real, ese ya es el primer hallazgo. Empieza por un checklist mensual, mide lo esencial y corrige lo que afecta negocio. Si quieres, en AionSite te ayudamos a convertir ese mantenimiento en una rutina clara para que tu sitio siga funcionando como canal de ventas y no solo como tarjeta de presentación.",
      },
    ],
  },
  {
    id: "crear-sitio-web-posiciona-desde-inicio",
    title: "Crear un sitio web que posiciona: 5 errores que mata las chances desde el inicio",
    excerpt:
      "La mayoría invierte en un sitio y espera resultados. Pero si cometes estos errores en la creación, ninguna estrategia SEO los salvará. Te mostramos cómo crear bien desde el principio.",
    image: "/blog/crear-sitio-posiciona.webp",
    badgeText: "Creación & Posicionamiento",
    date: "12 de mayo, 2026",
    dateISO: "2026-05-12",
    readTime: "7 min de lectura",
    keywords: ["crear sitio web", "sitio web que posiciona", "SEO desde cero", "estructura web correcta", "URL amigables SEO", "sitio web profesional", "creación de página web", "diseño web posicionable", "arquitectura web posicionamiento"],
    headings: [
      { level: 2, id: "por-que-falla-sitios-nuevos", text: "Por qué la mayoría de sitios nuevos fracasan" },
      { level: 3, id: "tiempo-es-oro", text: "El tiempo es el factor más valioso" },
      { level: 2, id: "5-errores-fatales", text: "Los 5 errores que matan las chances desde el inicio" },
      { level: 3, id: "error-1-urls", text: "Error 1: URLs mal diseñadas" },
      { level: 3, id: "error-2-sin-estructura", text: "Error 2: Crear sin estructura SEO" },
      { level: 3, id: "error-3-metadata", text: "Error 3: Metadatos incompletos o genéricos" },
      { level: 3, id: "error-4-velocidad", text: "Error 4: Lanzar lento desde el día 1" },
      { level: 3, id: "error-5-contenido", text: "Error 5: Contenido sin intención de posicionamiento" },
      { level: 2, id: "checklist-creacion", text: "Checklist antes de lanzar tu sitio" },
      { level: 2, id: "siguiente-paso-sitio", text: "El siguiente paso" },
    ],
    blocks: [
      { type: "h2", id: "por-que-falla-sitios-nuevos", text: "Por qué la mayoría de sitios nuevos fracasan" },
      {
        type: "p",
        text: "Un negocio nuevo invierte en su sitio web pensando que la gente lo encontrará mágicamente en Google. Después de 6 meses sin tráfico, se dan cuenta de que nadie sabe que existe. El problema no fue la falta de esfuerzo: fue la falta de estrategia desde la fundación.",
      },
      {
        type: "p",
        text: "La diferencia entre un sitio que posiciona y uno que no no es el presupuesto. Es el conocimiento de cómo hacer las cosas correctamente desde el primer día. Si creas mal la arquitectura, los URLs, la estructura de datos desde el inicio, intentar arreglarlo después es como intentar reparar una casa tras construir los cimientos torcidos.",
      },
      { type: "h3", id: "tiempo-es-oro", text: "El tiempo es el factor más valioso" },
      {
        type: "p",
        text: "Cuando lanzas un sitio nuevo, Google lo observa. En los primeros 3-6 meses, Googlebot está analizando activamente tu estructura, tu contenido y tu autoridad. Si en ese período pones las bases correctas, acumulas ventaja. Si pones las bases incorrectas y esperas 6 meses para darte cuenta, luego otros 6 meses para arreglarlo, acabas siendo invisible al mercado cuando finalmente estés listo para posicionar.",
      },
      { type: "h2", id: "5-errores-fatales", text: "Los 5 errores que matan las chances desde el inicio" },
      {
        type: "p",
        text: "Estos son los errores que vemos constantemente en sitios nuevos. No son errores pequeños: son el tipo de decisiones que te perseguirán durante años si no las corriges desde el inicio.",
      },
      { type: "h3", id: "error-1-urls", text: "Error 1: URLs mal diseñadas" },
      {
        type: "p",
        text: "Muchos sitios nuevos usan URLs como: /blog/123, /servicio/456, /articulos/post. Los buscadores no entienden qué trata ese contenido solo por ver un número. Las URLs correctas son descriptivas: /blog/como-posicionar-sitio-web, /servicios/diseno-web-conversiones, /recursos/guia-seo-local. Una URL legible para humanos es legible para Google y, además, te posiciona mejor porque contiene tus palabras clave.",
      },
      {
        type: "quote",
        text: "Tu URL es la primera oportunidad que tienes de decirle a Google de qué trata tu página. No la desaproveches con números o IDs.",
      },
      { type: "h3", id: "error-2-sin-estructura", text: "Error 2: Crear sin estructura SEO" },
      {
        type: "p",
        text: "La estructura de carpetas importa. Si tu sitio tiene servicios pero todos los artículos están en /blog sin subcategorías, pierdes oportunidades de crear autoridad por tópico. Una estructura inteligente sería: /servicios/diseno-web, /servicios/seo-local, /blog/diseno-web/*, /blog/seo-local/*. Esto le dice a Google qué temas dominas y agrupa tu autoridad en esos tópicos, en lugar de dispersarla.",
      },
      { type: "h3", id: "error-3-metadata", text: "Error 3: Metadatos incompletos o genéricos" },
      {
        type: "p",
        text: "Cada página debe tener un título único (máximo 60 caracteres) y una descripción única (máximo 160 caracteres). Muchos sitios nuevos usan títulos genéricos como 'Página de servicios' o descripciones copiadas en todas las páginas. Eso no posiciona. Cada página debe tener metadatos únicos y optimizados que incluyan tu palabra clave principal y comuniquen claramente qué espera encontrar el usuario.",
      },
      { type: "h3", id: "error-4-velocidad", text: "Error 4: Lanzar lento desde el día 1" },
      {
        type: "p",
        text: "Muchos sitios nuevos lanzan sin optimizar imágenes, sin configurar caché o sin elegir un buen hosting. Desde el primer día, tienes un sitio que tarda 5 segundos en cargar. Google nota esto y te penaliza en rankings. Es así de simple: velocidad lenta = menos ranking. Tu sitio debe cargar en menos de 2 segundos desde el día de lanzamiento, no después de 6 meses de optimización.",
      },
      { type: "h3", id: "error-5-contenido", text: "Error 5: Contenido sin intención de posicionamiento" },
      {
        type: "p",
        text: "El contenido genérico sin palabras clave investigadas no posiciona. Si escribes un artículo sobre 'diseño web' sin antes analizar qué búsquedas reales hace tu público, qué competencia existe y cuál es el volumen de búsqueda real, estás creando contenido que nadie buscará. Antes de escribir una sola palabra, debes investigar qué preguntas hace tu cliente ideal en Google y qué competencia existe por esas palabras.",
      },
      { type: "h2", id: "checklist-creacion", text: "Checklist antes de lanzar tu sitio" },
      {
        type: "p",
        text: "Si estás a punto de lanzar un sitio nuevo o rediseñar el existente, verifica estos puntos antes de ir a producción. Esto es no negociable si quieres que tu sitio posicione desde el inicio.",
      },
      {
        type: "p",
        text: "✓ URLs descriptivas y amigables para cada página. ✓ Títulos únicos (máximo 60 caracteres) con palabra clave en cada página. ✓ Descripciones únicas (máximo 160 caracteres) que describan el contenido. ✓ Tiempo de carga menor a 2 segundos. ✓ Imágenes optimizadas en WebP con alt text. ✓ Schema Markup implementado (al menos para tu negocio local). ✓ Sitemap.xml actualizado y enviado a Google Search Console. ✓ Robots.txt correcto. ✓ Versión móvil perfectamente funcional. ✓ Contenido de al menos 500 palabras por página de servicio. ✓ Enlaces internos estratégicos entre páginas relacionadas.",
      },
      { type: "h2", id: "siguiente-paso-sitio", text: "El siguiente paso" },
      {
        type: "p",
        text: "Si ya tienes un sitio lanzado y cometiste algunos de estos errores, no es fin del mundo. Se pueden arreglar. Pero cuanto antes, mejor. Si estás a punto de lanzar un sitio nuevo, usa este checklist y asegúrate de comenzar bien. Los primeros 6 meses de un sitio nuevo son críticos. Invierte en hacerlo correctamente desde el inicio y verás resultados exponencialmente mejores en posicionamiento.",
      },
      {
        type: "p",
        text: "Cuéntanos tu caso: ¿estás a punto de crear un sitio nuevo o necesitas auditar uno existente? Te ayudamos a identificar si comete algunos de estos errores y cómo corregirlos para posicionar más rápido.",
      },
    ],
  },
  {
    id: "tipografia-color-espacio-diseno-web",
    title: "Tipografía, color y espacio: los 3 pilares del diseño web profesional",
    excerpt:
      "El 94% de las primeras impresiones de un sitio dependen del diseño visual. Descubre cómo la tipografía, el color y el espacio blanco transforman tu sitio en uno que genera confianza y ventas.",
    image: "/blog/tipografia-color-espacio.webp",
    badgeText: "Diseño Visual & UX",
    date: "11 de mayo, 2026",
    dateISO: "2026-05-11",
    readTime: "7 min de lectura",
    keywords: ["diseño web profesional", "tipografía web", "paleta de colores web", "espacio blanco diseño", "identidad visual web", "mejora visual sitio web", "UX diseño", "diseño web México", "branding digital", "experiencia de usuario"],
    headings: [
      { level: 2, id: "diseno-visual-ventas", text: "Por qué el diseño visual determina si te compran o no" },
      { level: 3, id: "neurociencia-color", text: "La neurociencia detrás del color" },
      { level: 3, id: "tipografia-voz", text: "La tipografía como voz de tu marca" },
      { level: 2, id: "tres-pilares", text: "Los 3 pilares del diseño web profesional" },
      { level: 3, id: "pilar-tipografia", text: "Pilar 1: Tipografía que comunica" },
      { level: 3, id: "pilar-color", text: "Pilar 2: Color que convierte" },
      { level: 3, id: "pilar-espacio", text: "Pilar 3: Espacio blanco que respira" },
      { level: 2, id: "errores-visuales", text: "Errores visuales que destruyen la confianza" },
      { level: 3, id: "demasiadas-fuentes", text: "Demasiadas fuentes tipográficas" },
      { level: 3, id: "colores-sin-sistema", text: "Colores sin coherencia ni sistema" },
      { level: 2, id: "mejorar-hoy", text: "Cómo mejorar el diseño visual de tu sitio hoy" },
    ],
    blocks: [
      { type: "h2", id: "diseno-visual-ventas", text: "Por qué el diseño visual determina si te compran o no" },
      {
        type: "p",
        text: "Existe un estudio ampliamente citado en diseño UX que afirma que el 94% de las primeras impresiones sobre un sitio web están relacionadas con el diseño visual, no con el contenido. Antes de leer una sola palabra, el cerebro de tu visitante ya tomó una decisión: ¿este sitio parece confiable? ¿es para alguien como yo? ¿vale la pena quedarme? El diseño responde esas preguntas en milisegundos.",
      },
      {
        type: "p",
        text: "Lo que muchos negocios no entienden es que el diseño visual no es decoración. Es comunicación. Cada elección tipográfica, cada color, cada píxel de espacio vacío está transmitiendo un mensaje. La pregunta es si ese mensaje es el que quieres transmitir.",
      },
      { type: "h3", id: "neurociencia-color", text: "La neurociencia detrás del color" },
      {
        type: "p",
        text: "El cerebro procesa el color 60,000 veces más rápido que el texto. Antes de que tu visitante lea tu propuesta de valor, el color de tu fondo, tu botón y tu logo ya activaron asociaciones emocionales. Azul transmite confianza y profesionalismo. Naranja evoca energía y acción. Verde comunica salud y crecimiento. Rojo genera urgencia. No es casualidad que los bancos usen azul y las aplicaciones de salud usen verde. El color es estrategia, no preferencia personal.",
      },
      { type: "h3", id: "tipografia-voz", text: "La tipografía como voz de tu marca" },
      {
        type: "p",
        text: "Una tipografía serif transmite tradición, autoridad y sofisticación — piensa en despachos de abogados o marcas de lujo. Una sans-serif como Inter o Poppins comunica modernidad, accesibilidad y tecnología. Una fuente de display con personalidad dice que la marca se atreve a diferenciarse. El problema es cuando se mezclan tres o cuatro fuentes sin sistema: el resultado es ruido visual que confunde al usuario y destruye la credibilidad.",
      },
      { type: "h2", id: "tres-pilares", text: "Los 3 pilares del diseño web profesional" },
      {
        type: "p",
        text: "Después de rediseñar decenas de sitios, identificamos que los errores visuales siempre se concentran en los mismos tres elementos. Corrígelos y el sitio da un salto de calidad inmediato.",
      },
      { type: "h3", id: "pilar-tipografia", text: "Pilar 1: Tipografía que comunica" },
      {
        type: "p",
        text: "La regla de oro es: máximo dos familias tipográficas en un sitio. Una para títulos, otra para cuerpo de texto. Punto. El tamaño base del cuerpo no debe ser menor a 16px — en móvil, 18px es más cómodo. El contraste entre texto y fondo debe superar una relación de 4.5:1 para cumplir estándares de accesibilidad (WCAG AA). Un texto gris claro sobre fondo blanco puede verse moderno, pero si nadie lo puede leer, el diseño falló.",
      },
      {
        type: "p",
        text: "La escala tipográfica también importa. Los títulos H1, H2 y H3 deben tener tamaños claramente diferenciados para crear jerarquía visual. Cuando todos los textos tienen tamaño similar, el ojo no sabe a dónde ir primero y el visitante escanea sin retener nada.",
      },
      { type: "h3", id: "pilar-color", text: "Pilar 2: Color que convierte" },
      {
        type: "p",
        text: "Un sistema de color profesional tiene tres niveles: un color primario (el de tu marca, el que más aparece), un color secundario (para acentos y variedad), y colores neutros para fondos y texto. Con esos tres elementos, un sitio entero puede mantener coherencia visual perfecta. La mayoría de sitios no siguen este sistema — usan cinco o seis colores sin relación entre sí — y el resultado parece amateur incluso cuando el contenido es excelente.",
      },
      {
        type: "quote",
        text: "El color correcto en el botón correcto puede aumentar la tasa de clics hasta un 34%. El color incorrecto puede hacer que ese botón sea invisible.",
      },
      {
        type: "p",
        text: "El color del botón principal (CTA) merece atención especial. Debe contrastar con el fondo para ser lo primero que ve el ojo. Si tu sitio es principalmente azul y tu botón también es azul, desaparece. El contraste visual no es un capricho: es lo que hace que la gente haga clic.",
      },
      { type: "h3", id: "pilar-espacio", text: "Pilar 3: Espacio blanco que respira" },
      {
        type: "p",
        text: "El espacio blanco — o espacio negativo — es el área vacía entre elementos. Es uno de los recursos más subestimados en diseño web. Los sitios que parecen recargados, agobiantes o confusos casi siempre tienen poco espacio entre secciones, entre párrafos y alrededor de los elementos clave. Apple construyó una de las identidades visuales más reconocidas del mundo basándose en espacio blanco. El espacio no es desperdicio: es claridad.",
      },
      {
        type: "p",
        text: "En términos prácticos: aumenta el padding entre secciones, agrega línea de espacio entre párrafos, deja más aire alrededor de los botones. El contenido respira, la jerarquía se vuelve clara y el visitante se siente menos abrumado. El resultado visual es inmediato.",
      },
      { type: "h2", id: "errores-visuales", text: "Errores visuales que destruyen la confianza" },
      {
        type: "p",
        text: "Más allá de los pilares, hay errores específicos que vemos de forma recurrente y que tienen un impacto directo en la percepción de profesionalismo.",
      },
      { type: "h3", id: "demasiadas-fuentes", text: "Demasiadas fuentes tipográficas" },
      {
        type: "p",
        text: "Tres o más familias tipográficas en un mismo sitio es señal inmediata de que no hubo un sistema de diseño. Cada fuente adicional compite por atención y crea inconsistencia. Si heredaste un sitio con este problema, la solución es elegir dos fuentes compatibles y reemplazar todo lo demás. Es trabajo de un día con el impacto visual de un rediseño completo.",
      },
      { type: "h3", id: "colores-sin-sistema", text: "Colores sin coherencia ni sistema" },
      {
        type: "p",
        text: "Cuando los botones son de tres colores distintos, los encabezados cambian de tono entre páginas y el fondo varía sin razón, el sitio transmite desorden. El usuario interpreta ese desorden como falta de cuidado, y la falta de cuidado como falta de profesionalismo. Unificar la paleta de color en un sistema consistente es uno de los cambios con mayor retorno visual por unidad de esfuerzo.",
      },
      { type: "h2", id: "mejorar-hoy", text: "Cómo mejorar el diseño visual de tu sitio hoy" },
      {
        type: "p",
        text: "No necesitas un rediseño completo para mejorar radicalmente la percepción visual de tu sitio. Empieza con estas tres acciones: (1) Elige dos fuentes y aplícalas de forma consistente en todo el sitio. (2) Define una paleta de tres colores — primario, secundario y neutro — y elimina cualquier color que no pertenezca a ella. (3) Aumenta el espacio entre secciones y alrededor de los elementos principales en un 50%.",
      },
      {
        type: "p",
        text: "Esos tres cambios, aplicados correctamente, transforman la percepción de un sitio de amateur a profesional sin tocar una línea de contenido. Si quieres que revisemos el diseño visual de tu sitio y te digamos exactamente qué cambiar, cuéntanos tu caso y hacemos una auditoría visual sin costo.",
      },
    ],
  },
  {
    id: "optimizacion-conversiones-digital",
    title: "Optimización de conversiones: el ABC de la persuasión digital",
    excerpt:
      "No basta con atraer visitantes. La pregunta real es: ¿cuántos se convierten en clientes? Descubre las técnicas probadas que transforman visitantes en compradores.",
    image: "/blog/optimización-de-conversiones.webp",
    badgeText: "Conversión & CRO",
    date: "12 de mayo, 2026",
    dateISO: "2026-05-12",
    readTime: "8 min de lectura",
    keywords: ["optimización de conversiones", "tasa de conversión", "CRO", "persuasión digital", "analítica web", "A/B testing", "mejora de ventas online", "conversión México", "marketing digital ROI"],
    headings: [
      { level: 2, id: "el-problema", text: "El problema invisible: tráfico que no convierte" },
      { level: 3, id: "costo-visitante", text: "¿Cuánto cuesta cada visitante que no convierte?" },
      { level: 2, id: "abc-conversion", text: "El ABC de la conversión digital" },
      { level: 3, id: "claridad", text: "A: Claridad — el visitante debe entender al instante" },
      { level: 3, id: "beneficio", text: "B: Beneficio — por qué debería actuar ahora" },
      { level: 3, id: "confianza", text: "C: Confianza — que sienta seguridad de su decisión" },
      { level: 2, id: "metricas-que-importan", text: "Las métricas que realmente importan" },
      { level: 3, id: "tasa-rebote", text: "Tasa de rebote: la puerta de salida" },
      { level: 3, id: "tiempo-en-pagina", text: "Tiempo en página: señal de interés" },
      { level: 2, id: "tecnicas-conversion", text: "5 técnicas de conversión que funcionan probadas" },
      { level: 3, id: "urgencia", text: "Urgencia y escasez: motivadores de acción" },
      { level: 3, id: "prueba-social", text: "Prueba social: testimonios y reseñas" },
      { level: 3, id: "formularios-efectivos", text: "Formularios que realmente se completan" },
      { level: 2, id: "proximo-paso", text: "El próximo paso: medir, ajustar, repetir" },
    ],
    blocks: [
      { type: "h2", id: "el-problema", text: "El problema invisible: tráfico que no convierte" },
      {
        type: "p",
        text: "Un negocio llama a nuestra oficina diciendo: 'Tengo 5,000 visitas mensuales pero casi ninguna se convierte en venta'. Es el problema número uno que vemos. Invertiste en SEO, en anuncios pagos, en atraer gente a tu sitio. Pero cuando llegan, algo falla. Se van sin preguntar, sin comprar, sin ni siquiera dejar un email.",
      },
      { type: "p",
        text: "Aquí está la realidad brutal: tráfico sin conversión es dinero quemado. No importa si consigues 100,000 visitas al mes si el 99.5% se va sin hacer nada. Una página que recibe 100 visitas con 5% de conversión es infinitamente más valiosa que una con 10,000 visitas y 0.1% de conversión.",
      },
      { type: "h3", id: "costo-visitante", text: "¿Cuánto cuesta cada visitante que no convierte?" },
      {
        type: "p",
        text: "Si estás pagando $1 por clic en Google Ads y 99 de cada 100 visitantes se van sin actuar, ese visitante realmente te costó $100. Si inviertes en SEO y conseguís 1,000 visitas gratis mensuales pero ninguna convierte, esos 1,000 clics gratis costaron el valor de lo que dejaste de ganar. La conversión no es una métrica vanidad. Es el número que determina si tu sitio web es un activo o un gasto.",
      },
      { type: "h2", id: "abc-conversion", text: "El ABC de la conversión digital" },
      {
        type: "p",
        text: "Después de auditar y optimizar más de 50 sitios web, encontramos que la mayoría falla en los mismos puntos. No es que les falte tráfico. Les falta claridad, beneficio y confianza.",
      },
      { type: "h3", id: "claridad", text: "A: Claridad — el visitante debe entender al instante" },
      {
        type: "p",
        text: "El usuario llega a tu sitio en modo 'escaneo rápido'. Tienen 8 segundos antes de decidir si se quedan o se van. En esos 8 segundos deben entender: ¿qué es esto? ¿es para mí? ¿cuál es el siguiente paso? Si la respuesta a cualquiera de esas preguntas no es clara, se van. El diseño confuso mata la conversión más rápido que cualquier otro factor.",
      },
      {
        type: "quote",
        text: "La claridad es el dinero. La confusión es la pobreza. Tu sitio web debe elegir un bando.",
      },
      { type: "h3", id: "beneficio", text: "B: Beneficio — por qué debería actuar ahora" },
      {
        type: "p",
        text: "No basta con decir qué vendes. Debes explicar por qué vale la pena. 'Diseño web para negocios' es descripción. 'Aumenta tus ventas 40% en 90 días con un sitio que realmente convierte' es promesa. El visitante no compra lo que haces: compra el resultado que le prometes. Tu sitio debe dejar claro cuál es ese resultado en cada sección.",
      },
      { type: "h3", id: "confianza", text: "C: Confianza — que sienta seguridad de su decisión" },
      {
        type: "p",
        text: "Incluso si el visitante entiende y quiere actuar, la desconfianza detiene la conversión. Será porque tu sitio parece poco profesional, o porque no muestra garantías, o porque no tiene testimonios, o porque el formulario pide demasiados datos. Cada elemento de desconfianza es una barrera. Tu trabajo es eliminar esas barreras una por una.",
      },
      { type: "h2", id: "metricas-que-importan", text: "Las métricas que realmente importan" },
      {
        type: "p",
        text: "Google Analytics es poderoso pero abrumador. Millones de datos. ¿Cuál mirar? Si vas a revisar analítica, que sea para responder una sola pregunta: ¿por qué no convierte?",
      },
      { type: "h3", id: "tasa-rebote", text: "Tasa de rebote: la puerta de salida" },
      {
        type: "p",
        text: "Si más del 70% de visitantes llega a tu página de inicio y se va sin hacer nada, está lloviendo sobre mojado. O el mensaje principal no es claro, o la propuesta de valor no es convincente, o tu diseño visual no genera confianza. Una tasa de rebote alta en la homepage es síntoma de que algo falla arriba, en los primeros 3 segundos.",
      },
      { type: "h3", id: "tiempo-en-pagina", text: "Tiempo en página: señal de interés" },
      {
        type: "p",
        text: "Si la gente pasa menos de 30 segundos en tu página, no la están leyendo. Si pasan 3-5 minutos, probablemente esté leyendo y considerando. Si pasan 8+ minutos, algo te está reteniendo. Pero ojo: tiempo largo no siempre significa interés. A veces significa confusión. Por eso esta métrica funciona mejor en combinación con otras.",
      },
      { type: "h2", id: "tecnicas-conversion", text: "5 técnicas de conversión que funcionan probadas" },
      {
        type: "p",
        text: "Teoría es buena, pero la práctica es lo que genera resultados. Estas 5 técnicas han aumentado conversiones en sitios reales:",
      },
      { type: "h3", id: "urgencia", text: "Urgencia y escasez: motivadores de acción" },
      {
        type: "p",
        text: "Los humans procrastinan. Un botón que dice 'contacta cuando quieras' genera cero urgencia. Uno que dice 'agendamos tu consultoría gratuita de 30 minutos (solo 3 espacios disponibles esta semana)' genera urgencia. No es manipulación: es realidad. Ofrecés algo, estableces límites, y de repente el visitante actúa.",
      },
      { type: "h3", id: "prueba-social", text: "Prueba social: testimonios y reseñas" },
      {
        type: "p",
        text: "Las reseñas de clientes reales convencen más que tu discurso. Si tenés 5 testimonios positivos visibles, la conversión sube. Si tenés fotos de clientes reales, sube más. Si tenés números ('Más de 200 negocios nos confían la transformación de su web'), la confianza se dispara. Busca testimonios de clientes satisfechos y ponlos donde los vea todo el mundo.",
      },
      { type: "h3", id: "formularios-efectivos", text: "Formularios que realmente se completan" },
      {
        type: "p",
        text: "Si tu formulario pide 15 datos, nadie lo completará. Si pide nombre y email solamente, la mayoría lo hará. Comienza simple. Consigue el lead primero. Pide más datos después, en el email de seguimiento. Menos campos = más conversiones. Es así de simple.",
      },
      { type: "h2", id: "proximo-paso", text: "El próximo paso: medir, ajustar, repetir" },
      {
        type: "p",
        text: "La optimización de conversiones no es un proyecto de 'una sola vez'. Es un proceso continuo: mides, identificas qué falla, ajustas, mides de nuevo. Pequeñas mejoras en cada elemento suman. Un aumento de 10% en tasa de rebote, otro 10% en formularios, otro 5% en testimonios visibles... y de repente tu tasa de conversión pasó de 1% a 1.7%, lo que significa 70% más ingresos con el mismo tráfico.",
      },
      {
        type: "p",
        text: "Si tu sitio hoy recibe tráfico pero no convierte, no necesitas más tráfico. Necesitas optimizar lo que ya tienes. Cuéntanos cuál es tu tasa de conversión actual y te ayudamos a identificar los puntos débiles.",
      },
    ],
  },
  {
    id: "seo-local-para-negocios",
    title: "SEO local: cómo aparecer primero cuando tus clientes te buscan en Google",
    excerpt:
      "El 76% de las personas que buscan un negocio local lo visitan ese mismo día. Si tu empresa no aparece en los primeros resultados, estás perdiendo clientes a diario. Aquí te explicamos cómo cambiar eso.",
    image: "/blog/local-seo.webp",
    badgeText: "Posicionamiento SEO",
    date: "5 de mayo, 2026",
    dateISO: "2026-05-05",
    readTime: "7 min de lectura",
    keywords: [
      "SEO local",
      "posicionamiento Google",
      "Google My Business",
      "búsqueda local México",
      "aparecer en Google",
      "SEO para negocios",
      "posicionamiento web",
      "marketing digital local",
    ],
    headings: [
      { level: 2, id: "que-es-seo-local", text: "¿Qué es el SEO local y por qué importa?" },
      { level: 3, id: "perfil-google", text: "Tu perfil de Google Business: la base de todo" },
      { level: 2, id: "factores-clave", text: "Los 5 factores que Google más valora en búsquedas locales" },
      { level: 3, id: "palabras-clave-locales", text: "Palabras clave con intención local" },
      { level: 3, id: "resenas", text: "Reseñas: el activo más subestimado" },
      { level: 2, id: "errores-comunes", text: "Errores que frenan tu posicionamiento local" },
      { level: 2, id: "plan-accion", text: "Plan de acción en 30 días" },
    ],
    blocks: [
      {
        type: "p",
        text: "Cuando alguien escribe 'plomero cerca de mí' o 'agencia de diseño web en Monterrey', Google muestra resultados muy distintos a los de una búsqueda genérica. Este sistema, conocido como SEO local, determina qué negocios aparecen primero en ese momento crítico de decisión de compra.",
      },
      { type: "h2", id: "que-es-seo-local", text: "¿Qué es el SEO local y por qué importa?" },
      {
        type: "p",
        text: "El SEO local es el conjunto de estrategias que mejoran la visibilidad de tu negocio en búsquedas geográficamente relevantes. A diferencia del SEO tradicional, aquí compites solo contra negocios de tu zona, lo que hace que los resultados sean más rápidos y directamente ligados a ventas reales.",
      },
      {
        type: "p",
        text: "Según datos de Google, el 76% de las personas que hacen una búsqueda local visitan un negocio en las siguientes 24 horas, y el 28% de esas búsquedas resultan en una compra. No estar en esos primeros lugares no es una opción si quieres crecer.",
      },
      { type: "h3", id: "perfil-google", text: "Tu perfil de Google Business: la base de todo" },
      {
        type: "p",
        text: "Google Business Profile (antes Google My Business) es el punto de partida. Un perfil completo y verificado con fotos actualizadas, horarios correctos, categorías precisas y descripción optimizada puede duplicar los clics hacia tu sitio web en cuestión de semanas. Si aún no lo tienes reclamado, es lo primero que debes hacer hoy.",
      },
      { type: "h2", id: "factores-clave", text: "Los 5 factores que Google más valora en búsquedas locales" },
      {
        type: "p",
        text: "El algoritmo de búsqueda local de Google evalúa principalmente: (1) Relevancia — qué tan bien coincide tu negocio con lo que el usuario busca. (2) Proximidad — la distancia entre el usuario y tu negocio. (3) Prominencia — qué tan conocido y valorado es tu negocio online. (4) Consistencia de NAP — que tu Nombre, Dirección y Teléfono sean idénticos en todos los directorios. (5) Señales de tu sitio web — que tu página refuerce la información local con textos, metadatos y estructuras de datos correctas.",
      },
      { type: "h3", id: "palabras-clave-locales", text: "Palabras clave con intención local" },
      {
        type: "p",
        text: "No basta con optimizar para 'diseño web'. Necesitas frases como 'diseño web en Guadalajara', 'agencia web para restaurantes CDMX' o 'crear tienda en línea Monterrey'. Estas búsquedas tienen menor volumen pero muchísima más intención de compra. Incluirlas en los títulos de tus páginas, en los textos y en las etiquetas alt de imágenes marca una diferencia notable.",
      },
      { type: "h3", id: "resenas", text: "Reseñas: el activo más subestimado" },
      {
        type: "p",
        text: "Las reseñas afectan directamente tu posición en el mapa de Google. No solo importa el número, sino la frecuencia con que llegan y la calidad de las respuestas que das. Un negocio que responde a cada reseña — buena o mala — transmite confianza tanto a futuros clientes como al propio algoritmo. Implementa un proceso simple para pedirle reseñas a clientes satisfechos justo después de completar un servicio.",
      },
      { type: "h2", id: "errores-comunes", text: "Errores que frenan tu posicionamiento local" },
      {
        type: "p",
        text: "Los errores más frecuentes que vemos en negocios mexicanos son: datos NAP inconsistentes entre el sitio web y los directorios, fotos de baja calidad o inexistentes en el perfil de Google, ausencia de páginas de servicio por ciudad, no responder a reseñas negativas, y sitios web sin versión móvil optimizada. Cada uno de estos frena tu visibilidad de forma silenciosa.",
      },
      { type: "h2", id: "plan-accion", text: "Plan de acción en 30 días" },
      {
        type: "p",
        text: "Semana 1: Verifica y completa tu perfil de Google Business. Semana 2: Audita la consistencia de tu información en directorios como Yelp, Facebook y páginas amarillas locales. Semana 3: Publica al menos 3 páginas de servicio optimizadas con ciudad y especialidad. Semana 4: Activa un flujo para obtener reseñas y responde a todas las existentes. En 60 días, la mayoría de negocios locales ya ven resultados tangibles en visibilidad y visitas.",
      },
      {
        type: "p",
        text: "El SEO local no es un gasto, es la inversión con el retorno más medible en marketing digital. Si tu negocio depende de clientes de tu ciudad o región, aparecer primero en Google no es opcional — es la diferencia entre crecer o estancarse.",
      },
    ],
  },
  {
    id: "seo-local-google-maps-negocio",
    title: "SEO local: domina Google Maps en tu ciudad",
    excerpt:
      "El 46% de búsquedas en Google tienen intención local. Si no apareces en el mapa cuando buscan lo que ofreces, estás regalando clientes a tu competencia.",
    image: "/blog/seo-local.webp",
    badgeText: "SEO Local & Visibilidad",
    date: "27 de abril, 2026",
    dateISO: "2026-04-27",
    readTime: "7 min de lectura",
    keywords: ["SEO local", "Google Maps negocio", "Google Business Profile", "posicionamiento local", "aparecer en Google Maps", "búsquedas locales", "SEO para negocios México", "reseñas Google", "NAP consistencia", "pack local Google"],
    headings: [
      { level: 2, id: "que-es-seo-local", text: "Qué es el SEO local y por qué importa" },
      { level: 3, id: "el-pack-local", text: "El pack local de Google" },
      { level: 3, id: "intención-local", text: "Búsquedas con intención local" },
      { level: 2, id: "google-business-profile", text: "Google Business Profile: tu base de operaciones" },
      { level: 3, id: "perfil-completo", text: "Un perfil 100% completo marca la diferencia" },
      { level: 3, id: "categorias-correctas", text: "Elige las categorías correctas" },
      { level: 2, id: "resenas-y-reputacion", text: "Reseñas: el factor que más mueve el ranking local" },
      { level: 3, id: "como-conseguir-resenas", text: "Cómo conseguir más reseñas sin violar las reglas" },
      { level: 3, id: "responder-resenas", text: "Responder reseñas también posiciona" },
      { level: 2, id: "nap-consistencia", text: "NAP: la consistencia que Google premia" },
      { level: 2, id: "sitio-web-seo-local", text: "Tu sitio web como aliado del SEO local" },
      { level: 2, id: "conclusion-local", text: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-es-seo-local", text: "Qué es el SEO local y por qué importa" },
      {
        type: "p",
        text: "El SEO local es el conjunto de técnicas que hacen que tu negocio aparezca en los resultados de búsqueda cuando alguien busca un producto o servicio cerca de su ubicación. No se trata solo de 'salir en Google': se trata de aparecer en el momento exacto en que alguien está listo para comprar o visitar. 'Restaurante cerca de mí', 'dentista en Guadalajara', 'diseño web Ciudad de México' — estas son búsquedas con intención inmediata, y el negocio que aparece primero se lleva la mayoría de los clics.",
      },
      { type: "h3", id: "el-pack-local", text: "El pack local de Google" },
      {
        type: "p",
        text: "Cuando buscas algo con intención local, Google muestra un bloque especial con un mapa y tres fichas de negocios antes de los resultados orgánicos normales. A esto se le llama el 'pack local' o 'local 3-pack'. Aparecer aquí es más valioso que estar en el primer lugar orgánico: recibe el 44% de los clics totales de la página. Si tu negocio no está en ese bloque, prácticamente eres invisible para las búsquedas locales.",
      },
      { type: "h3", id: "intención-local", text: "Búsquedas con intención local" },
      {
        type: "p",
        text: "No todas las búsquedas locales incluyen el nombre de una ciudad. Google determina la intención geográfica del usuario automáticamente. Si alguien en Monterrey busca 'agencia de diseño web', Google interpreta que busca una agencia en Monterrey y muestra resultados cercanos. Por eso, optimizar para SEO local no solo aplica a negocios físicos: cualquier empresa que sirva a clientes en una ciudad o región específica se beneficia de esta estrategia.",
      },
      { type: "h2", id: "google-business-profile", text: "Google Business Profile: tu base de operaciones" },
      {
        type: "p",
        text: "Google Business Profile (antes Google My Business) es la herramienta gratuita que controla cómo aparece tu negocio en Google Maps y en el panel lateral de búsqueda. Es el punto de partida absoluto del SEO local. Sin un perfil activo y optimizado, es casi imposible aparecer en el pack local, sin importar cuánto inviertas en el resto.",
      },
      { type: "h3", id: "perfil-completo", text: "Un perfil 100% completo marca la diferencia" },
      {
        type: "p",
        text: "Google prioriza los perfiles completos sobre los incompletos. Nombre exacto del negocio, dirección verificada, teléfono actualizado, horario de atención, sitio web, descripción del negocio, fotos de alta calidad y productos o servicios listados. Cada campo que completas es una señal para Google de que eres un negocio legítimo y activo. Los perfiles con fotos reciben 35% más clics a su sitio y 42% más solicitudes de ruta que los que no tienen.",
      },
      { type: "h3", id: "categorias-correctas", text: "Elige las categorías correctas" },
      {
        type: "p",
        text: "La categoría principal es uno de los factores más importantes para el pack local. Sé específico: 'Agencia de diseño web' posiciona mejor que solo 'Agencia de marketing'. Puedes agregar categorías secundarias para servicios adicionales, pero la principal debe representar exactamente lo que haces. Investiga qué categoría usan los competidores que aparecen primero que tú y asegúrate de estar en la misma o una más específica.",
      },
      { type: "h2", id: "resenas-y-reputacion", text: "Reseñas: el factor que más mueve el ranking local" },
      {
        type: "p",
        text: "Las reseñas son el factor más influyente en el SEO local después de la proximidad geográfica. Google considera la cantidad de reseñas, el puntaje promedio, la frecuencia con que llegan y si el negocio responde a ellas. Un negocio con 50 reseñas de 4.8 estrellas casi siempre supera a uno con 5 reseñas perfectas.",
      },
      {
        type: "quote",
        text: "El 88% de los consumidores confía en las reseñas en línea tanto como en recomendaciones personales. Una buena reputación digital no es opcional: es tu mejor vendedor.",
      },
      { type: "h3", id: "como-conseguir-resenas", text: "Cómo conseguir más reseñas sin violar las reglas" },
      {
        type: "p",
        text: "Google prohíbe comprar o incentivar reseñas con descuentos o regalos. Lo que sí puedes hacer es pedirlas de forma directa a clientes satisfechos. El método más efectivo: envía un mensaje personalizado después de completar un servicio con un link directo a tu perfil. Crea un shortlink o código QR que lleve a la página de reseñas y colócalo en tu recepción, facturas o tarjetas de presentación. La clave es reducir la fricción al máximo: cuantos menos pasos tenga que hacer el cliente, más probable es que lo haga.",
      },
      { type: "h3", id: "responder-resenas", text: "Responder reseñas también posiciona" },
      {
        type: "p",
        text: "Responder a las reseñas —positivas y negativas— le dice a Google que eres un negocio activo y comprometido con sus clientes. Las respuestas a reseñas negativas son especialmente poderosas: un negocio que responde profesionalmente a una crítica genera más confianza que uno con solo reseñas perfectas. Responde siempre en las primeras 48 horas y nunca de forma defensiva.",
      },
      { type: "h2", id: "nap-consistencia", text: "NAP: la consistencia que Google premia" },
      {
        type: "p",
        text: "NAP significa Name, Address, Phone — nombre, dirección y teléfono. Google verifica tu información cruzándola en múltiples fuentes: tu sitio web, directorios de negocios, redes sociales y menciones en internet. Si en algún lugar tu dirección dice 'Av. Insurgentes 456' y en otro dice 'Insurgentes Sur 456', Google ve esa inconsistencia como una señal de desconfianza. Audita todas tus menciones en línea y asegúrate de que el NAP sea exactamente igual en todos lados.",
      },
      { type: "h2", id: "sitio-web-seo-local", text: "Tu sitio web como aliado del SEO local" },
      {
        type: "p",
        text: "El perfil de Google no trabaja solo. Tu sitio web debe reforzar las señales locales. Incluye tu ciudad y región en los títulos de las páginas principales, en las meta descripciones y de forma natural en el contenido. Agrega el Schema Markup de negocio local con tu dirección, teléfono y horario para que Google pueda leerlo de forma estructurada. Crea una página de contacto con un mapa embebido de Google Maps. Si atiendes varias ciudades, considera páginas dedicadas para cada una con contenido específico de esa zona.",
      },
      { type: "h2", id: "conclusion-local", text: "Conclusión" },
      {
        type: "p",
        text: "El SEO local es uno de los canales con mejor retorno de inversión para negocios que dependen de clientes en una zona geográfica. La inversión inicial es relativamente baja y los resultados son duraderos. El punto de partida es siempre el mismo: verificar y optimizar tu Google Business Profile, construir reputación con reseñas reales y asegurarte de que tu sitio web envíe señales locales coherentes. Si ya tienes presencia en Google pero no apareces donde quisieras, probablemente uno de estos puntos está fallando. Cuéntanos tu situación y hacemos el diagnóstico.",
      },
    ],
  },
  {
    id: "rediseno-web-cuando-por-que",
    title: "Rediseño web: cuándo hacerlo y cómo empezar",
    excerpt:
      "Tu sitio tiene 3 años sin cambios. Los resultados bajaron. Te contamos los signos de que es hora de rediseñar y cómo hacerlo sin perder tu posicionamiento.",
    image: "/blog/tu-sitio-tiene-3 anios-sin-cambios.webp",
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
    title: "Velocidad web: mejora tu sitio paso a paso",
    excerpt:
      "Un sitio lento frustra visitantes y Google lo penaliza en rankings. Aprende a medir, diagnosticar y mejorar la velocidad de tu sitio.",
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
    title: "Diseño web que convierte: 7 principios clave",
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
    title: "SEO técnico 2026: qué mueve tu ranking",
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
    title: "¿Cuándo necesitas un sitio web profesional?",
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

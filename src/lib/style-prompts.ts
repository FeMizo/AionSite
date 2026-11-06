import { styleDirections } from "../data/style-directions";
import examples from "../../examples/aionsite/catalog.json";
import { resolvePageHref, sitePages } from "./site-pages";

const treatments: Record<string, { composition: string; sections: string }> = {
  future: { composition: "Composición centrada, tipografía expresiva, contraste oscuro y movimiento selectivo para guiar la lectura.", sections: "Hero con jerarquía tipográfica; servicios; proyectos; proceso; CTA de cotización." },
  luma: { composition: "Composición editorial cálida, serif expresiva, grandes imágenes y espacios amplios. Adapta la paleta a la marca; no copies el negocio de maquillaje del ejemplo.", sections: "Hero con imagen dominante; propuesta comercial; imagen y texto; evidencia; cierre de contacto." },
  arkkhe: { composition: "Titulares de gran escala, alineaciones asimétricas, contraste marcado y ritmo cinematográfico con pausas de lectura.", sections: "Hero tipográfico; banner comercial; servicios; proyecto destacado; proceso y CTA." },
  specialui: { composition: "Lenguaje técnico oscuro, retícula precisa, etiquetas breves y acentos de color. No inventes indicadores, métricas ni dashboards.", sections: "Hero; índice de soluciones; evidencia real; explicación del proceso; contacto." },
  "spatial-ui": { composition: "Profundidad moderada, perspectiva y capas con jerarquía clara. No simules modelos 3D inexistentes ni ocultes información tras efectos.", sections: "Hero espacial; presentación de oferta; imagen con detalle; proyectos; CTA." },
  claymorphism: { composition: "Volúmenes suaves, radios generosos, sombras táctiles y controles legibles; una identidad amigable adaptada al negocio.", sections: "Hero; oferta concreta; servicios; evidencia; proceso; CTA de contacto." },
  skeuomorphism: { composition: "Detalles táctiles, materiales y controles inspirados en objetos físicos, con estados y acciones claramente reconocibles.", sections: "Hero; soluciones; demostración visual; proyectos; proceso y cierre comercial." },
};

const proposalSections: Record<number, string> = {
  1: "Hero Fade, soluciones, portafolio en perspectiva, imagen y texto, CTA. El laboratorio de efectos permanece como anexo.",
  2: "Hero centrado, banner comercial, collage, soluciones expandibles, proyecto destacado, proceso con imagen y CTA circular.",
  3: "Hero Cards, recorrido por scroll, imagen y CTAs; alternativa móvil nativa y recorrido vertical al reducir movimiento.",
  4: "Hero escultórico con alcance en capas, banner, alcance Flip, exposición asimétrica, proceso editorial y CTA.",
  5: "Portada cinematográfica, índice de servicios, portafolio Creative, imagen con acordeón y CTA.",
  6: "Hero editorial, galería escalonada de proyectos, selector de contenido, banner comercial, proceso y cierre tipográfico.",
  7: "Hero arquitectónico vectorial, capítulos interactivos, proyecto asimétrico, proceso lineal y CTA.",
};

export function getStylePrompts() {
  const styles = styleDirections.map((style) => {
    const id = style.route.split("/").filter(Boolean).at(-1)!;
    const page = sitePages.find((item) => item.id === id);
    return { id, name: style.name, route: resolvePageHref(style.route), source: page ? `Página original ${page.sourcePath}; consulta su código en app/ y el registro src/data/site-pages.json.` : "Consulta el código original enlazado desde app/estilos/page.tsx.", ...(treatments[id] ?? { composition: style.description, sections: "Observa las secciones reales de esta base y selecciona las que respondan al objetivo del cliente." }) };
  });
  const proposals = examples.proposals.map((item) => ({
    id: item.id, name: `Propuesta ${item.number} · ${item.title}`, route: resolvePageHref(item.viewPath),
    source: `Código original: examples/aionsite/${item.entry}. Revisión ${item.revision}. Consulta examples/aionsite/catalog.json.`,
    composition: item.description, sections: proposalSections[item.number] ?? item.tags.join(", "),
  }));
  return [...styles, ...proposals].map((item) => ({ id: item.id, name: item.name, prompt: `$aionsite-demo

#brief
Base interna: ${item.name}
Vista de referencia: ${item.route}
${item.source}

NEGOCIO
Nombre: [completar]
Sector y servicios: [completar]
Cliente ideal: [completar]
Objetivo del sitio: [completar]
Plataforma: [WordPress / WooCommerce, Shopify, código personalizado o necesito asesoría]
Sitio actual: [URL o no existe]
Recursos disponibles: [logo, fotos, textos y proyectos reales]

DIRECCIÓN VISUAL
${item.composition}
Secciones que puedes adaptar: ${item.sections}

PROCESO
Lee el brief y el código original; observa la referencia en escritorio y móvil, incluyendo sus interacciones. Usa esta base para diseñar una página completa con el contenido del cliente. Puedes combinar otras secciones de /estilos/ cuando aporten al objetivo, conservando una única identidad visual. Registra fuentes y decisiones en data/composition-plan.json.
Adapta marca, paleta, tipografía, textos, imágenes y enlaces. No copies datos del negocio de la muestra ni inventes testimonios, precios, métricas o integraciones. Usa movimiento con propósito; evita convertir toda la página en sliders. Verifica móvil, teclado, contraste, enlaces y movimiento reducido.
Conserva los originales y crea una propuesta independiente. Muestra una propuesta navegable y espera mi elección o ajustes antes de construir el sitio final. No publiques ni envíes mensajes.
Si uso solo referencias internas, no afirmes una ejecución nueva de Cloner. Si agrego una URL del cliente bajo #scrapling, extrae sus datos conservando fuentes y comunica cualquier fallo.
` }));
}

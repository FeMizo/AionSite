import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const slug = "antes-de-cotizar-tu-web";

const slides = [
  { n: "01", kicker: "GUÍA PRÁCTICA", title: ["ANTES DE COTIZAR", "TU PÁGINA WEB"], body: ["Responde tres preguntas y evita", "decisiones improvisadas."], layout: "portrait-right", accent: "#48A7FF" },
  { n: "02", kicker: "PREGUNTA 01", title: ["¿QUÉ ACCIÓN", "DEBE LOGRAR?"], body: ["Define si buscas mensajes, reservas,", "ventas o solicitudes."], layout: "card-left", icon: "01", accent: "#8E7CFF" },
  { n: "03", kicker: "PREGUNTA 02", title: ["¿QUÉ CONTENIDO", "YA TIENES?"], body: ["Reúne textos, fotos, servicios", "y respuestas frecuentes."], layout: "card-right", icon: "02", accent: "#48A7FF" },
  { n: "04", kicker: "PREGUNTA 03", title: ["¿QUIÉN LA", "ACTUALIZARÁ?"], body: ["Decide si necesitas autonomía, soporte", "o mantenimiento continuo."], layout: "card-left", icon: "03", accent: "#8E7CFF" },
  { n: "05", kicker: "SIGUIENTE PASO", title: ["LLEGA CON", "RESPUESTAS CLARAS"], body: ["Una buena cotización empieza", "con objetivos bien definidos."], layout: "portrait-left", cta: "ESCRÍBENOS POR WHATSAPP", accent: "#48A7FF" },
];

const esc = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));

function positions(slide) {
  if (slide.layout === "portrait-right") return { tx: 70, ty: 315, tw: 560, photo: { x: 650, y: 185, w: 360, h: 760 } };
  if (slide.layout === "portrait-left") return { tx: 535, ty: 310, tw: 475, photo: { x: 70, y: 185, w: 390, h: 760 } };
  if (slide.layout === "card-right") return { tx: 535, ty: 315, tw: 475, card: { x: 70, y: 175, w: 390, h: 770 } };
  return { tx: 70, ty: 315, tw: 500, card: { x: 620, y: 175, w: 390, h: 770 } };
}

function svg(slide) {
  const p = positions(slide);
  const titleSize = slide.layout === "portrait-left" ? 36 : 54;
  return Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.62" stop-color="#071B40"/><stop offset="1" stop-color="#17103D"/></linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${slide.accent}" stop-opacity="0.2"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.03"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000" flood-opacity="0.58"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="970" cy="70" r="320" fill="${slide.accent}" opacity="0.11"/><circle cx="70" cy="1040" r="330" fill="#715DFF" opacity="0.08"/>
    ${p.card ? `<rect x="${p.card.x}" y="${p.card.y}" width="${p.card.w}" height="${p.card.h}" rx="58" fill="url(#glass)" stroke="${slide.accent}" stroke-opacity="0.55" stroke-width="3" filter="url(#shadow)"/>
      <circle cx="${p.card.x + p.card.w / 2}" cy="${p.card.y + 210}" r="118" fill="#03091B" stroke="${slide.accent}" stroke-width="3"/>
      <text x="${p.card.x + p.card.w / 2}" y="${p.card.y + 245}" text-anchor="middle" font-family="Arial, sans-serif" font-size="104" font-weight="800" fill="${slide.accent}">${slide.icon}</text>
      <path d="M ${p.card.x + 90} ${p.card.y + 500} H ${p.card.x + p.card.w - 90}" stroke="${slide.accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      <circle cx="${p.card.x + 105}" cy="${p.card.y + 600}" r="18" fill="${slide.accent}"/><rect x="${p.card.x + 145}" y="${p.card.y + 582}" width="160" height="36" rx="18" fill="#FFFFFF" opacity="0.15"/>
      <circle cx="${p.card.x + 105}" cy="${p.card.y + 680}" r="18" fill="${slide.accent}" opacity="0.7"/><rect x="${p.card.x + 145}" y="${p.card.y + 662}" width="205" height="36" rx="18" fill="#FFFFFF" opacity="0.1"/>` : ""}
    <rect x="${p.tx - 24}" y="${p.ty - 102}" width="${p.tw}" height="${slide.cta ? 500 : 420}" rx="38" fill="#03091B" fill-opacity="0.96" stroke="#FFF" stroke-opacity="0.09"/>
    <rect x="${p.tx}" y="${p.ty - 72}" width="250" height="52" rx="26" fill="${slide.accent}" opacity="0.18"/>
    <text x="${p.tx + 125}" y="${p.ty - 38}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.8" fill="${slide.accent}">${esc(slide.kicker)}</text>
    <text x="${p.tx}" y="${p.ty + 52}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="#FFF"><tspan x="${p.tx}">${esc(slide.title[0])}</tspan><tspan x="${p.tx}" dy="72" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${p.tx}" y="${p.ty + 228}" font-family="Arial, sans-serif" font-size="25" fill="#D9E7FF"><tspan x="${p.tx}">${esc(slide.body[0])}</tspan><tspan x="${p.tx}" dy="40">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="${p.tx}" y="${p.ty + 318}" width="420" height="74" rx="24" fill="${slide.accent}"/><text x="${p.tx + 210}" y="${p.ty + 365}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#FFF">${esc(slide.cta)}</text>` : ""}
    <text x="1010" y="1010" text-anchor="end" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFF">${slide.cta ? "aionsite.com.mx" : `${slide.n} / 05`}</text>
  </svg>`);
}

const logo = await sharp(logoPath).resize({ width: 230 }).png().toBuffer();
const portraitRaw = await sharp(portraitPath).resize(420, 820, { fit: "cover", position: "top" }).png().toBuffer();

for (const slide of slides) {
  let base = sharp(svg(slide));
  const p = positions(slide);
  if (p.photo) {
    const photo = await sharp(portraitRaw).resize(p.photo.w, p.photo.h, { fit: "cover", position: "top" }).png().toBuffer();
    const mask = Buffer.from(`<svg width="${p.photo.w}" height="${p.photo.h}"><rect width="${p.photo.w}" height="${p.photo.h}" rx="54" fill="#fff"/></svg>`);
    const rounded = await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    const frame = Buffer.from(`<svg width="${p.photo.w + 28}" height="${p.photo.h + 28}"><rect x="2" y="2" width="${p.photo.w + 24}" height="${p.photo.h + 24}" rx="66" fill="#081630" stroke="${slide.accent}" stroke-width="4"/></svg>`);
    base = base.composite([{ input: frame, left: p.photo.x - 14, top: p.photo.y - 14 }, { input: rounded, left: p.photo.x, top: p.photo.y }]);
  }
  const rendered = await base.png().toBuffer();
  await sharp(rendered).composite([{ input: logo, left: 70, top: 48 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

console.log(slides.map((slide) => `${slug}-${slide.n}.png`).join("\n"));

import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const sourcePath = path.join(root, "public", "portfolio", "lobbypm.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "la-confianza-se-disena";

const slides = [
  { n: "01", kicker: "AUTORIDAD DIGITAL", title: ["LA CONFIANZA", "SE DISEÑA"], body: ["Una web profesional reduce dudas", "antes del primer mensaje."], layout: "left", accent: "#48A7FF" },
  { n: "02", kicker: "PROBLEMA", title: ["LO BONITO", "NO BASTA"], body: ["Sin contexto, el visitante interpreta", "demasiado por su cuenta."], layout: "bottom", accent: "#8E7CFF" },
  { n: "03", kicker: "CLARIDAD", title: ["TU PROPUESTA", "EN SEGUNDOS"], body: ["Servicio, ciudad y beneficio deben", "verse desde el inicio."], layout: "right", accent: "#48A7FF" },
  { n: "04", kicker: "EJEMPLO DEMOSTRATIVO", title: ["RESUME LO", "QUE RESPALDA"], body: ["Experiencia, cobertura y atención", "ayudan a comparar con claridad."], layout: "top", accent: "#8E7CFF" },
  { n: "05", kicker: "CONCLUSIÓN", title: ["DISEÑA PARA", "DAR CONFIANZA"], body: ["Cada sección debe acercar al cliente", "a una decisión."], layout: "left", cta: "ESCRÍBENOS POR WHATSAPP", accent: "#48A7FF" },
];

const esc = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));

function geometry(layout) {
  if (layout === "left") return { image: { x: 495, y: 120, w: 515, h: 840 }, text: { x: 70, y: 300, w: 450 } };
  if (layout === "right") return { image: { x: 70, y: 120, w: 500, h: 840 }, text: { x: 620, y: 310, w: 390 } };
  if (layout === "top") return { image: { x: 465, y: 410, w: 545, h: 550 }, text: { x: 70, y: 175, w: 900 } };
  return { image: { x: 430, y: 90, w: 580, h: 615 }, text: { x: 70, y: 735, w: 900 } };
}

function svg(slide) {
  const { image, text } = geometry(slide.layout);
  const side = slide.layout === "left" || slide.layout === "right";
  const titleSize = slide.layout === "right" ? 38 : side ? 42 : 64;
  return Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.62" stop-color="#071B40"/><stop offset="1" stop-color="#17103D"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000" flood-opacity="0.55"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="990" cy="80" r="300" fill="${slide.accent}" opacity="0.11"/><circle cx="70" cy="1030" r="310" fill="#715DFF" opacity="0.08"/>
    <rect x="${image.x - 14}" y="${image.y - 14}" width="${image.w + 28}" height="${image.h + 28}" rx="42" fill="#0A1534" stroke="${slide.accent}" stroke-opacity="0.55" stroke-width="3" filter="url(#shadow)"/>
    <rect x="${text.x - 24}" y="${text.y - 92}" width="${text.w}" height="${slide.cta ? 455 : 390}" rx="34" fill="#03091B" fill-opacity="0.96" stroke="#FFF" stroke-opacity="0.09"/>
    <rect x="${text.x}" y="${text.y - 66}" width="${slide.kicker.length > 17 ? 320 : 245}" height="50" rx="25" fill="${slide.accent}" opacity="0.18"/>
    <text x="${text.x + (slide.kicker.length > 17 ? 160 : 122)}" y="${text.y - 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.8" fill="${slide.accent}">${esc(slide.kicker)}</text>
    <text x="${text.x}" y="${text.y + 50}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="#FFF"><tspan x="${text.x}">${esc(slide.title[0])}</tspan><tspan x="${text.x}" dy="70" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${text.x}" y="${text.y + 220}" font-family="Arial, sans-serif" font-size="${slide.layout === "right" ? 22 : 25}" fill="#D9E7FF"><tspan x="${text.x}">${esc(slide.body[0])}</tspan><tspan x="${text.x}" dy="38">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="${text.x}" y="${text.y + 300}" width="390" height="72" rx="24" fill="${slide.accent}"/><text x="${text.x + 195}" y="${text.y + 345}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#FFF">${esc(slide.cta)}</text>` : ""}
    <text x="1010" y="1010" text-anchor="end" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFF">${slide.cta ? "aionsite.com.mx" : `${slide.n} / 05`}</text>
  </svg>`);
}

const logo = await sharp(logoPath).resize({ width: 230 }).png().toBuffer();

for (const slide of slides) {
  const { image } = geometry(slide.layout);
  const screenshot = await sharp(sourcePath).resize(image.w, image.h, { fit: "contain", background: "#07152F" }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${image.w}" height="${image.h}"><rect width="${image.w}" height="${image.h}" rx="28" fill="#fff"/></svg>`);
  const rounded = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const base = await sharp(svg(slide)).composite([{ input: rounded, left: image.x, top: image.y }]).png().toBuffer();
  await sharp(base).composite([{ input: logo, left: 70, top: 48 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

console.log(slides.map((slide) => `${slug}-${slide.n}.png`).join("\n"));

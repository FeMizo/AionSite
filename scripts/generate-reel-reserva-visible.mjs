import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const screenshotPath = path.join(root, "public", "portfolio", "restaurante.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "haz-visible-como-reservar";

const scenes = [
  { suffix: "cover", badge: "REEL DE DEMOSTRACIÓN", title: ["HAZ VISIBLE", "CÓMO RESERVAR"], body: ["Una acción clara convierte interés", "en una decisión sencilla."], accent: "#49A7FF" },
  { suffix: "storyboard-01", badge: "0-2 S · HOOK", title: ["¿CÓMO RESERVA", "TU CLIENTE?"], body: ["La respuesta debe aparecer", "desde el primer vistazo."], accent: "#8B7CFF" },
  { suffix: "storyboard-02", badge: "2-8 S · DEMOSTRACIÓN", title: ["UNA ACCIÓN", "PRINCIPAL"], body: ["El mensaje y el botón guían", "sin competir por atención."], accent: "#49A7FF" },
  { suffix: "storyboard-03", badge: "8-15 S · RECORRIDO", title: ["MENOS RUIDO,", "MÁS CLARIDAD"], body: ["Menú, galería y contacto apoyan", "la decisión del visitante."], accent: "#8B7CFF" },
  { suffix: "storyboard-04", badge: "15-20 S · CIERRE", title: ["FACILITA EL", "SIGUIENTE PASO"], body: ["Tu web puede convertir interés", "en conversaciones reales."], cta: "ESCRÍBENOS POR WHATSAPP", accent: "#49A7FF" },
];

const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
}[char]));

const overlay = (scene) => Buffer.from(`
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.64" stop-color="#071A3D"/><stop offset="1" stop-color="#17103D"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1F4B"/><stop offset="1" stop-color="#080D25"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#000" flood-opacity="0.55"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="930" cy="260" r="350" fill="${scene.accent}" opacity="0.1"/>
  <circle cx="90" cy="1660" r="430" fill="#705CFF" opacity="0.07"/>
  <rect x="54" y="170" width="972" height="1030" rx="58" fill="url(#panel)" stroke="${scene.accent}" stroke-opacity="0.42" stroke-width="3" filter="url(#shadow)"/>
  <rect x="84" y="202" width="912" height="966" rx="42" fill="#030817"/>
  <rect x="84" y="202" width="912" height="82" rx="42" fill="#111D3D"/>
  <circle cx="132" cy="243" r="10" fill="${scene.accent}"/><circle cx="168" cy="243" r="10" fill="#FFF" opacity="0.38"/><circle cx="204" cy="243" r="10" fill="#FFF" opacity="0.2"/>
  <rect x="78" y="1260" width="430" height="68" rx="34" fill="${scene.accent}" opacity="0.18"/>
  <text x="293" y="1303" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.8" fill="${scene.accent}">${escapeXml(scene.badge)}</text>
  <text x="78" y="1448" font-family="Arial, sans-serif" font-size="78" font-weight="800" fill="#FFF"><tspan x="78">${escapeXml(scene.title[0])}</tspan><tspan x="78" dy="92" fill="${scene.accent}">${escapeXml(scene.title[1])}</tspan></text>
  <text x="82" y="1660" font-family="Arial, sans-serif" font-size="34" fill="#D9E7FF"><tspan x="82">${escapeXml(scene.body[0])}</tspan><tspan x="82" dy="48">${escapeXml(scene.body[1])}</tspan></text>
  ${scene.cta ? `<rect x="78" y="1780" width="535" height="86" rx="26" fill="${scene.accent}"/><text x="345" y="1834" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#FFF">${escapeXml(scene.cta)}</text>` : ""}
  <text x="1002" y="1848" text-anchor="end" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#FFF">aionsite.com.mx</text>
</svg>`);

const screenshot = await sharp(screenshotPath).resize(860, 780, { fit: "contain", background: "#050918" }).png().toBuffer();
const mask = Buffer.from('<svg width="860" height="780"><rect width="860" height="780" rx="32" fill="#fff"/></svg>');
const framed = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 270 }).png().toBuffer();

for (const scene of scenes) {
  const frame = await sharp(overlay(scene)).composite([{ input: framed, left: 110, top: 330 }]).png().toBuffer();
  await sharp(frame).composite([{ input: logo, left: 78, top: 60 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${scene.suffix}.png`));
}

console.log(scenes.map((scene) => `${slug}-${scene.suffix}.png`).join("\n"));

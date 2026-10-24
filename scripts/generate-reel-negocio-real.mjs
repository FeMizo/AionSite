import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const screenshotPath = path.join(root, "public", "portfolio", "molotes.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "tu-web-debe-parecer-tu-negocio";

const scenes = [
  { suffix: "cover", badge: "REEL DE DESCUBRIMIENTO", title: ["TU WEB DEBE", "PARECER TU NEGOCIO"], body: ["La confianza crece cuando tu", "identidad se siente auténtica."], accent: "#4AA8FF" },
  { suffix: "storyboard-01", badge: "0-2 S · HOOK", title: ["NO COPIES", "A LOS GRANDES"], body: ["Tu ventaja está en mostrar", "lo que te hace cercano."], accent: "#8A7CFF" },
  { suffix: "storyboard-02", badge: "2-8 S · PROBLEMA", title: ["UNA PLANTILLA", "NO BASTA"], body: ["Si todo parece genérico, también", "tu propuesta pierde personalidad."], accent: "#4AA8FF" },
  { suffix: "storyboard-03", badge: "8-15 S · CAMBIO", title: ["MUESTRA TU", "DIFERENCIA"], body: ["Producto, historia y trato crean", "una experiencia propia y memorable."], accent: "#8A7CFF" },
  { suffix: "storyboard-04", badge: "15-20 S · CIERRE", title: ["HAZTE FÁCIL", "DE RECORDAR"], body: ["Tu web debe sentirse tan", "auténtica como tu negocio."], cta: "ESCRÍBENOS POR WHATSAPP", accent: "#4AA8FF" },
];

const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
}[char]));

const overlay = (scene) => Buffer.from(`
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.58" stop-color="#071A3D"/><stop offset="1" stop-color="#17103D"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1F4B"/><stop offset="1" stop-color="#080D25"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#000" flood-opacity="0.55"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="900" cy="250" r="370" fill="${scene.accent}" opacity="0.11"/>
  <circle cx="90" cy="1650" r="430" fill="#705CFF" opacity="0.08"/>
  <rect x="54" y="170" width="972" height="1030" rx="58" fill="url(#panel)" stroke="${scene.accent}" stroke-opacity="0.42" stroke-width="3" filter="url(#shadow)"/>
  <rect x="84" y="202" width="912" height="966" rx="42" fill="#030817"/>
  <rect x="84" y="202" width="912" height="82" rx="42" fill="#111D3D"/>
  <circle cx="132" cy="243" r="10" fill="${scene.accent}"/><circle cx="168" cy="243" r="10" fill="#FFF" opacity="0.38"/><circle cx="204" cy="243" r="10" fill="#FFF" opacity="0.2"/>
  <rect x="78" y="1260" width="470" height="64" rx="32" fill="${scene.accent}" opacity="0.18"/>
  <text x="313" y="1302" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="2" fill="${scene.accent}">${escapeXml(scene.badge)}</text>
  <text x="78" y="1448" font-family="Arial, sans-serif" font-size="70" font-weight="800" fill="#FFF"><tspan x="78">${escapeXml(scene.title[0])}</tspan><tspan x="78" dy="88" fill="${scene.accent}">${escapeXml(scene.title[1])}</tspan></text>
  <text x="82" y="1660" font-family="Arial, sans-serif" font-size="34" fill="#D9E7FF"><tspan x="82">${escapeXml(scene.body[0])}</tspan><tspan x="82" dy="48">${escapeXml(scene.body[1])}</tspan></text>
  ${scene.cta ? `<rect x="78" y="1790" width="520" height="82" rx="24" fill="${scene.accent}"/><text x="338" y="1842" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#FFF">${escapeXml(scene.cta)}</text>` : ""}
  <text x="1002" y="1850" text-anchor="end" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#FFF">aionsite.com.mx</text>
</svg>`);

const screenshot = await sharp(screenshotPath).resize(860, 780, { fit: "cover", position: "top", background: "#F4F0EB" }).png().toBuffer();
const mask = Buffer.from('<svg width="860" height="780"><rect width="860" height="780" rx="32" fill="#fff"/></svg>');
const framed = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 270 }).png().toBuffer();

for (const scene of scenes) {
  const frame = await sharp(overlay(scene)).composite([{ input: framed, left: 110, top: 330 }]).png().toBuffer();
  await sharp(frame).composite([{ input: logo, left: 78, top: 60 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${scene.suffix}.png`));
}

console.log(scenes.map((scene) => `${slug}-${scene.suffix}.png`).join("\n"));

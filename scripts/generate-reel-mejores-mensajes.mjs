import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const screenshotPath = path.join(outDir, "mejores-mensajes-empiezan-antes-source.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "mejores-mensajes-empiezan-antes";

const scenes = [
  { suffix: "cover", badge: "REEL DE DESCUBRIMIENTO", title: ["MEJORES MENSAJES", "EMPIEZAN ANTES"], body: ["Tu web responde dudas", "antes de abrir WhatsApp."], accent: "#48A7FF" },
  { suffix: "storyboard-01", badge: "0-2 S · HOOK", title: ["¿QUÉ SABE ANTES", "DE ESCRIBIR?"], body: ["Una conversación mejora cuando", "el visitante llega informado."], accent: "#8E7CFF" },
  { suffix: "storyboard-02", badge: "2-8 S · PROBLEMA", title: ["UN CHAT", "SIN CONTEXTO"], body: ["Cada duda básica alarga", "la conversación y la decisión."], accent: "#48A7FF" },
  { suffix: "storyboard-03", badge: "8-15 S · CAMBIO", title: ["TU WEB PREPARA", "EL CHAT"], body: ["Servicios, alcance y proceso", "aclaran qué puede esperar."], accent: "#8E7CFF" },
  { suffix: "storyboard-04", badge: "15-20 S · CIERRE", title: ["CONVERSACIONES", "MÁS CLARAS"], body: ["Quien escribe ya entiende", "tu propuesta y siguiente paso."], cta: "ESCRÍBENOS POR WHATSAPP", accent: "#48A7FF" },
];

const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
}[char]));

const overlay = (scene) => Buffer.from(`
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.62" stop-color="#071B40"/><stop offset="1" stop-color="#17103D"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#000" flood-opacity="0.55"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="930" cy="250" r="360" fill="${scene.accent}" opacity="0.1"/>
  <circle cx="80" cy="1660" r="430" fill="#705CFF" opacity="0.08"/>
  <rect x="54" y="170" width="972" height="1030" rx="58" fill="#081630" stroke="${scene.accent}" stroke-opacity="0.46" stroke-width="3" filter="url(#shadow)"/>
  <rect x="84" y="202" width="912" height="966" rx="42" fill="#030817"/>
  <rect x="84" y="202" width="912" height="82" rx="42" fill="#111D3D"/>
  <circle cx="132" cy="243" r="10" fill="${scene.accent}"/><circle cx="168" cy="243" r="10" fill="#FFF" opacity="0.38"/><circle cx="204" cy="243" r="10" fill="#FFF" opacity="0.2"/>
  <rect x="78" y="1260" width="460" height="68" rx="34" fill="${scene.accent}" opacity="0.18"/>
  <text x="308" y="1303" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="1.6" fill="${scene.accent}">${escapeXml(scene.badge)}</text>
  <text x="78" y="1448" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#FFF"><tspan x="78">${escapeXml(scene.title[0])}</tspan><tspan x="78" dy="88" fill="${scene.accent}">${escapeXml(scene.title[1])}</tspan></text>
  <text x="82" y="1655" font-family="Arial, sans-serif" font-size="34" fill="#D9E7FF"><tspan x="82">${escapeXml(scene.body[0])}</tspan><tspan x="82" dy="48">${escapeXml(scene.body[1])}</tspan></text>
  ${scene.cta ? `<rect x="78" y="1780" width="535" height="86" rx="26" fill="${scene.accent}"/><text x="345" y="1834" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#FFF">${escapeXml(scene.cta)}</text>` : ""}
  <text x="1002" y="1848" text-anchor="end" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#FFF">aionsite.com.mx</text>
</svg>`);

const screenshot = await sharp(screenshotPath).resize(860, 780, { fit: "cover", position: "top", background: "#050918" }).png().toBuffer();
const mask = Buffer.from('<svg width="860" height="780"><rect width="860" height="780" rx="32" fill="#fff"/></svg>');
const framed = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 270 }).png().toBuffer();

for (const scene of scenes) {
  const frame = await sharp(overlay(scene)).composite([{ input: framed, left: 110, top: 330 }]).png().toBuffer();
  await sharp(frame).composite([{ input: logo, left: 78, top: 60 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${scene.suffix}.png`));
}

console.log(scenes.map((scene) => `${slug}-${scene.suffix}.png`).join("\n"));

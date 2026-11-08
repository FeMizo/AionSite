import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "presencia-que-vende-story.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/fino.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const portrait = await sharp(portraitPath)
  .resize(600, 1180, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.9, saturation: 0.92 })
  .png()
  .toBuffer();

const portraitMask = Buffer.from(`<svg width="600" height="1180"><defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".18" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><rect width="600" height="1180" rx="64" fill="url(#fade)"/></svg>`);
const maskedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 235 }).png().toBuffer();

const canvas = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#01040D"/><stop offset=".55" stop-color="#071A3B"/><stop offset="1" stop-color="#180B34"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#08142C" stop-opacity=".98"/><stop offset="1" stop-color="#08142C" stop-opacity=".78"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#2997FF" stop-opacity=".46"/><stop offset="1" stop-color="#2997FF" stop-opacity="0"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="32" stdDeviation="38" flood-color="#000" flood-opacity=".7"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="820" cy="750" r="700" fill="url(#glow)"/>
  <rect x="560" y="255" width="450" height="1180" rx="64" fill="#061127" stroke="#5EB8FF" stroke-opacity=".28" stroke-width="3" filter="url(#shadow)"/>
  <path d="M0 1400 C320 1260 670 1510 1080 1290 V1920 H0Z" fill="#02040D" opacity=".88"/>
  <rect x="120" y="390" width="580" height="760" rx="50" fill="url(#panel)" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="2" filter="url(#shadow)"/>
  <rect x="165" y="445" width="285" height="58" rx="29" fill="#2997FF" fill-opacity=".18"/>
  <text x="307" y="482" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="2.4" fill="#68BCFF">DESCUBRIMIENTO</text>
  <text x="165" y="610" font-family="Arial, sans-serif" font-size="65" font-weight="900" fill="#FFFFFF"><tspan x="165">TU NEGOCIO</tspan><tspan x="165" dy="76" fill="#63B7FF">MERECE</tspan><tspan x="165" dy="76" fill="#63B7FF">PRESENCIA</tspan></text>
  <text x="165" y="880" font-family="Arial, sans-serif" font-size="29" fill="#DCEAFF"><tspan x="165">Convierte una buena idea en una</tspan><tspan x="165" dy="44">marca fácil de elegir.</tspan></text>
  <rect x="165" y="990" width="395" height="92" rx="30" fill="#238FFF"/>
  <text x="362" y="1048" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="1" fill="#FFFFFF">DESCUBRE TUS OPCIONES</text>
  <rect x="120" y="1450" width="840" height="180" rx="42" fill="#071226" stroke="#5CB7FF" stroke-opacity=".35" stroke-width="2"/>
  <text x="168" y="1515" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="2" fill="#AFC9E8">PÁGINAS WEB · SEO · MANTENIMIENTO</text>
  <text x="168" y="1580" font-family="Arial, sans-serif" font-size="29" font-weight="800" fill="#FFFFFF">aionsite.com.mx/#paquetes</text>
</svg>`);

await sharp(canvas).composite([
  { input: maskedPortrait, left: 600, top: 255 },
  { input: logo, left: 120, top: 255 },
]).png({ compressionLevel: 9 }).toFile(output);

console.log(output);

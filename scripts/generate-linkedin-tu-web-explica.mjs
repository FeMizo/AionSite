import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "public", "social", "tu-web-explica-tu-valor-linkedin.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const background = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".58" stop-color="#081B3E"/><stop offset="1" stop-color="#16113B"/></linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#48A7FF"/><stop offset="1" stop-color="#8E7CFF"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity=".55"/></filter>
  </defs>
  <rect width="1200" height="1200" fill="url(#bg)"/>
  <circle cx="1090" cy="150" r="360" fill="#48A7FF" opacity=".11"/><circle cx="110" cy="1080" r="320" fill="#8E7CFF" opacity=".09"/>
  <path d="M64 1000 C330 880 470 1110 720 970 S1050 850 1200 930" fill="none" stroke="url(#line)" stroke-width="3" opacity=".35"/>
  <rect x="64" y="170" width="650" height="820" rx="48" fill="#07142E" stroke="#48A7FF" stroke-opacity=".28" stroke-width="2" filter="url(#shadow)"/>
  <rect x="96" y="218" width="250" height="50" rx="25" fill="#48A7FF" opacity=".16"/>
  <text x="221" y="251" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" letter-spacing="2" fill="#48A7FF">PRESENCIA DIGITAL</text>
  <text x="96" y="374" font-family="Arial" font-size="72" font-weight="800" fill="#FFFFFF"><tspan x="96">TU WEB DEBE</tspan><tspan x="96" dy="82">EXPLICAR TU</tspan><tspan x="96" dy="82" fill="#48A7FF">VALOR</tspan></text>
  <text x="96" y="665" font-family="Arial" font-size="31" fill="#D9E7FF"><tspan x="96">Diseño claro para que tus clientes</tspan><tspan x="96" dy="46">entiendan, confíen y te contacten.</tspan></text>
  <rect x="96" y="765" width="250" height="64" rx="20" fill="#101F43" stroke="#48A7FF" stroke-opacity=".5"/><text x="221" y="806" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">Páginas web</text>
  <rect x="364" y="765" width="250" height="64" rx="20" fill="#101F43" stroke="#8E7CFF" stroke-opacity=".5"/><text x="489" y="806" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">SEO y soporte</text>
  <rect x="96" y="872" width="430" height="76" rx="24" fill="url(#line)"/><text x="311" y="920" text-anchor="middle" font-family="Arial" font-size="25" font-weight="800" fill="#FFFFFF">HABLEMOS DE TU PROYECTO</text>
  <text x="64" y="1112" font-family="Arial" font-size="27" font-weight="700" fill="#FFFFFF">+52 938 157 39 88</text>
  <text x="1136" y="1112" text-anchor="end" font-family="Arial" font-size="27" font-weight="700" fill="#FFFFFF">aionsite.com.mx</text>
</svg>`);

const portrait = await sharp(portraitPath).resize(520, 720, { fit: "cover", position: "top" }).png().toBuffer();
const mask = Buffer.from('<svg width="520" height="720"><rect width="520" height="720" rx="58" fill="#fff"/></svg>');
const framedPortrait = await sharp(portrait).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 250 }).png().toBuffer();

await sharp(background)
  .composite([
    { input: framedPortrait, left: 730, top: 230 },
    { input: logo, left: 64, top: 60 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(out);

import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "haz-visible-tu-negocio-story.png");
const screenshotPath = path.join(root, "public", "portfolio", "restaurante.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const background = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".5" stop-color="#081A3C"/><stop offset="1" stop-color="#190B35"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#238FFF" stop-opacity=".55"/><stop offset="1" stop-color="#238FFF" stop-opacity="0"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000" flood-opacity=".72"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="890" cy="780" r="650" fill="url(#glow)"/>
  <path d="M0 1420 C330 1270 730 1480 1080 1300 V1920 H0Z" fill="#020513" opacity=".9"/>
  <rect x="120" y="275" width="840" height="390" rx="44" fill="#050B1D" fill-opacity=".92" stroke="#5CB7FF" stroke-opacity=".25"/>
  <text x="168" y="360" font-family="Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="3" fill="#66BAFF">PRESENCIA DIGITAL</text>
  <text x="168" y="445" font-family="Arial, sans-serif" font-size="70" font-weight="900" fill="#FFFFFF"><tspan x="168">HAZ VISIBLE</tspan><tspan x="168" dy="78" fill="#63B7FF">TU NEGOCIO</tspan></text>
  <text x="168" y="595" font-family="Arial, sans-serif" font-size="29" fill="#DAE9FF">Una web clara convierte búsquedas en oportunidades reales.</text>
  <g filter="url(#shadow)">
    <rect x="390" y="730" width="570" height="670" rx="54" fill="#050B1D" stroke="#FFFFFF" stroke-opacity=".14" stroke-width="3"/>
    <rect x="425" y="770" width="500" height="585" rx="28" fill="#F8FAFC"/>
  </g>
  <rect x="120" y="1415" width="840" height="215" rx="42" fill="#071226" stroke="#5CB7FF" stroke-opacity=".35" stroke-width="2"/>
  <text x="168" y="1470" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="2" fill="#AFC9E8">PÁGINAS WEB · SEO · MANTENIMIENTO</text>
  <rect x="168" y="1500" width="360" height="82" rx="28" fill="#238FFF"/>
  <text x="348" y="1552" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="1.1" fill="#FFFFFF">CONOCE AIONSITE</text>
  <text x="580" y="1552" font-family="Arial, sans-serif" font-size="27" font-weight="700" fill="#FFFFFF">aionsite.com.mx</text>
</svg>`);

const screenshot = await sharp(screenshotPath).resize(500, 585, { fit: "cover", position: "top" }).png().toBuffer();
const screenshotMask = Buffer.from(`<svg width="500" height="585"><rect width="500" height="585" rx="28" fill="#fff"/></svg>`);
const roundedScreenshot = await sharp(screenshot).composite([{ input: screenshotMask, blend: "dest-in" }]).png().toBuffer();

const portrait = await sharp(portraitPath).resize(430, 650, { fit: "cover", position: "top" }).png().toBuffer();
const portraitMask = Buffer.from(`<svg width="430" height="650"><defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="430" height="650" rx="70" fill="url(#fade)"/></svg>`);
const roundedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 230 }).png().toBuffer();

await sharp(background).composite([
  { input: roundedScreenshot, left: 425, top: 770 },
  { input: roundedPortrait, left: 80, top: 790 },
  { input: logo, left: 120, top: 205 },
]).png({ compressionLevel: 9 }).toFile(output);

console.log(output);

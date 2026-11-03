import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "tu-web-debe-demostrar-story.png");
const screenshotPath = path.join(root, "public", "portfolio", "atmedica.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const background = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="0.58" stop-color="#071A3B"/><stop offset="1" stop-color="#170D39"/></linearGradient>
    <radialGradient id="light"><stop stop-color="#249DFF" stop-opacity=".45"/><stop offset="1" stop-color="#249DFF" stop-opacity="0"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="30" stdDeviation="35" flood-color="#000" flood-opacity=".65"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="870" cy="500" r="560" fill="url(#light)"/>
  <circle cx="90" cy="1660" r="460" fill="#765BFF" opacity=".12"/>
  <path d="M0 1320 C310 1190 500 1440 1080 1200 V1920 H0Z" fill="#020513" opacity=".82"/>
  <rect x="120" y="310" width="840" height="655" rx="52" fill="#050B1D" stroke="#4BAAFF" stroke-opacity=".48" stroke-width="3" filter="url(#shadow)"/>
  <rect x="150" y="340" width="780" height="585" rx="28" fill="#F7F8FA"/>
  <rect x="430" y="965" width="220" height="34" rx="17" fill="#86BFFF" opacity=".6"/>
  <rect x="365" y="995" width="350" height="24" rx="12" fill="#0B1530"/>
  <rect x="120" y="1045" width="520" height="540" rx="42" fill="#040A1B" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".1"/>
  <rect x="158" y="1090" width="260" height="52" rx="26" fill="#4BAAFF" fill-opacity=".16"/>
  <text x="288" y="1123" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.4" fill="#60B5FF">DEMOSTRACIÓN REAL</text>
  <text x="158" y="1215" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="#FFFFFF"><tspan x="158">TU WEB</tspan><tspan x="158" dy="66" fill="#63B7FF">DEMUESTRA</tspan><tspan x="158" dy="66" fill="#63B7FF">VALOR</tspan></text>
  <text x="158" y="1440" font-family="Arial, sans-serif" font-size="27" fill="#D9E8FF"><tspan x="158">Muestra servicios claros antes de</tspan><tspan x="158" dy="42">pedir una cotización.</tspan></text>
  <rect x="158" y="1515" width="340" height="78" rx="26" fill="#238FFF"/>
  <text x="328" y="1564" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1.2" fill="#FFFFFF">VISITA AIONSITE</text>
  <text x="120" y="1650" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.6" fill="#AFC9E8">DISEÑO WEB · SEO · MANTENIMIENTO</text>
  <text x="120" y="1700" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="#FFFFFF">aionsite.com.mx</text>
</svg>`);

const screenshot = await sharp(screenshotPath)
  .resize(780, 585, { fit: "cover", position: "top" })
  .png()
  .toBuffer();
const screenshotMask = Buffer.from(`<svg width="780" height="585"><rect width="780" height="585" rx="28" fill="#fff"/></svg>`);
const roundedScreenshot = await sharp(screenshot).composite([{ input: screenshotMask, blend: "dest-in" }]).png().toBuffer();

const portrait = await sharp(portraitPath)
  .resize(500, 620, { fit: "cover", position: "top" })
  .png()
  .toBuffer();
const portraitMask = Buffer.from(`<svg width="500" height="620"><defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="500" height="620" rx="70" fill="url(#fade)"/></svg>`);
const roundedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 240 }).png().toBuffer();

await sharp(background)
  .composite([
    { input: roundedScreenshot, left: 150, top: 340 },
    { input: roundedPortrait, left: 580, top: 1040 },
    { input: logo, left: 120, top: 255 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);

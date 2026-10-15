import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const backgroundPath = "C:/Users/mizo_/.codex/generated_images/019faacd-d554-7e30-8694-658b0d266007/exec-2006390b-1043-47e6-ac41-89efd074dd91.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const outputPath = path.join(root, "public", "social", "tu-web-explica-tu-valor-linkedin.png");

const background = await sharp(backgroundPath)
  .resize(1200, 1200, { fit: "cover" })
  .modulate({ brightness: 0.84, saturation: 0.94 })
  .png()
  .toBuffer();

const textLayer = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#020617" stop-opacity=".96"/><stop offset=".52" stop-color="#020617" stop-opacity=".76"/><stop offset=".72" stop-color="#020617" stop-opacity="0"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity=".65"/></filter>
  </defs>
  <rect width="1200" height="1200" fill="url(#shade)"/>
  <rect x="66" y="208" width="276" height="54" rx="27" fill="#0C57A8" fill-opacity=".72" stroke="#4DA8FF" stroke-opacity=".7"/>
  <text x="204" y="243" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" letter-spacing="2" fill="#FFFFFF">PRESENCIA DIGITAL</text>
  <text x="66" y="374" font-family="Arial" font-size="72" font-weight="800" fill="#FFFFFF" filter="url(#shadow)"><tspan x="66">TU WEB DEBE</tspan><tspan x="66" dy="84">EXPLICAR TU</tspan><tspan x="66" dy="84" fill="#4DA8FF">VALOR</tspan></text>
  <text x="66" y="686" font-family="Arial" font-size="31" fill="#E7F1FF"><tspan x="66">Diseño profesional para generar</tspan><tspan x="66" dy="45">confianza y nuevas conversaciones.</tspan></text>
  <text x="66" y="827" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">PÁGINAS WEB  ·  SEO  ·  MANTENIMIENTO</text>
  <rect x="66" y="882" width="470" height="82" rx="25" fill="#318DE9"/>
  <text x="301" y="934" text-anchor="middle" font-family="Arial" font-size="25" font-weight="800" fill="#FFFFFF">HABLEMOS DE TU PROYECTO</text>
  <text x="66" y="1086" font-family="Arial" font-size="26" font-weight="700" fill="#FFFFFF">+52 938 157 39 88</text>
  <text x="1134" y="1086" text-anchor="end" font-family="Arial" font-size="26" font-weight="700" fill="#FFFFFF">aionsite.com.mx</text>
</svg>`);

const logo = await sharp(logoPath).resize({ width: 260 }).png().toBuffer();

await sharp(background)
  .composite([
    { input: textLayer, left: 0, top: 0 },
    { input: logo, left: 66, top: 64 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(outputPath);

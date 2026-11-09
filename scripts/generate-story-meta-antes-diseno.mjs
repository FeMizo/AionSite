import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "define-meta-antes-diseno-story.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/anime.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const portrait = await sharp(portraitPath)
  .resize(560, 950, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.82, saturation: 0.82 })
  .png()
  .toBuffer();
const portraitMask = Buffer.from(`<svg width="560" height="950"><defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff"/><stop offset=".84" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".16" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><rect width="560" height="950" rx="64" fill="url(#v)"/><rect width="560" height="950" rx="64" fill="url(#h)" style="mix-blend-mode:multiply"/></svg>`);
const maskedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 235 }).png().toBuffer();

const base = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".55" stop-color="#071A3B"/><stop offset="1" stop-color="#170B35"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#258FFF" stop-opacity=".52"/><stop offset="1" stop-color="#258FFF" stop-opacity="0"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000" flood-opacity=".72"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="790" cy="930" r="690" fill="url(#glow)"/>
  <path d="M0 1440 C330 1260 680 1510 1080 1320 V1920 H0Z" fill="#02040D" opacity=".9"/>
  <rect x="120" y="365" width="840" height="585" rx="52" fill="#061127" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="2" filter="url(#shadow)"/>
  <rect x="165" y="420" width="250" height="58" rx="29" fill="#2997FF" fill-opacity=".18"/>
  <text x="290" y="457" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="2.2" fill="#67BAFF">ANTES DEL DISEÑO</text>
  <text x="165" y="585" font-family="Arial, sans-serif" font-size="67" font-weight="900" fill="#FFFFFF"><tspan x="165">DEFINE UNA</tspan><tspan x="165" dy="78" fill="#63B7FF">META CLARA</tspan></text>
  <text x="165" y="790" font-family="Arial, sans-serif" font-size="30" fill="#DCEAFF"><tspan x="165">¿Vender, recibir mensajes o</tspan><tspan x="165" dy="45">explicar tu servicio?</tspan></text>
  <rect x="165" y="855" width="340" height="82" rx="28" fill="#238FFF"/>
  <text x="335" y="907" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1" fill="#FFFFFF">CONOCE EL PROCESO</text>
  <rect x="120" y="1325" width="400" height="250" rx="42" fill="#071226" stroke="#5CB7FF" stroke-opacity=".35" stroke-width="2"/>
  <text x="168" y="1390" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="1.8" fill="#AFC9E8"><tspan x="168">CLARIDAD ANTES</tspan><tspan x="168" dy="34">QUE DECORACIÓN</tspan></text>
  <text x="168" y="1510" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#FFFFFF">aionsite.com.mx/#paquetes</text>
</svg>`);

await sharp(base).composite([
  { input: maskedPortrait, left: 520, top: 900 },
  { input: logo, left: 120, top: 255 },
]).png({ compressionLevel: 9 }).toFile(output);

console.log(output);

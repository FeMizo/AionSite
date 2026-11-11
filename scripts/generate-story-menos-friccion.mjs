import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "una-accion-menos-friccion-story.png");
const screenshotPath = path.join(root, "public", "portfolio", "sg.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const desktop = await sharp(screenshotPath).resize(800, 500, { fit: "cover", position: "top" }).png().toBuffer();
const desktopMask = Buffer.from(`<svg width="800" height="500"><rect width="800" height="500" rx="28" fill="#fff"/></svg>`);
const roundedDesktop = await sharp(desktop).composite([{ input: desktopMask, blend: "dest-in" }]).png().toBuffer();

const mobile = await sharp(screenshotPath).resize(340, 650, { fit: "cover", position: "northwest" }).png().toBuffer();
const mobileMask = Buffer.from(`<svg width="340" height="650"><rect width="340" height="650" rx="42" fill="#fff"/></svg>`);
const roundedMobile = await sharp(mobile).composite([{ input: mobileMask, blend: "dest-in" }]).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 235 }).png().toBuffer();

const background = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".55" stop-color="#071A3C"/><stop offset="1" stop-color="#170B35"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#2997FF" stop-opacity=".48"/><stop offset="1" stop-color="#2997FF" stop-opacity="0"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="30" stdDeviation="36" flood-color="#000" flood-opacity=".72"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="820" cy="950" r="700" fill="url(#glow)"/>
  <path d="M0 1480 C310 1310 690 1540 1080 1360 V1920 H0Z" fill="#02040D" opacity=".9"/>
  <rect x="120" y="330" width="840" height="370" rx="50" fill="#061127" fill-opacity=".96" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="2" filter="url(#shadow)"/>
  <rect x="165" y="385" width="260" height="58" rx="29" fill="#2997FF" fill-opacity=".18"/>
  <text x="295" y="422" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="2.2" fill="#67BAFF">DEMOSTRACIÓN</text>
  <text x="165" y="535" font-family="Arial, sans-serif" font-size="62" font-weight="900" fill="#FFFFFF"><tspan x="165">UNA ACCIÓN,</tspan><tspan x="165" dy="74" fill="#63B7FF">MENOS FRICCIÓN</tspan></text>
  <text x="165" y="655" font-family="Arial, sans-serif" font-size="28" fill="#DCEAFF">La misma ruta clara funciona en escritorio y móvil.</text>
  <g filter="url(#shadow)">
    <rect x="120" y="755" width="840" height="560" rx="44" fill="#061127" stroke="#5CB7FF" stroke-opacity=".38" stroke-width="3"/>
    <rect x="700" y="890" width="380" height="730" rx="54" fill="#071226" stroke="#9A82FF" stroke-opacity=".7" stroke-width="3"/>
  </g>
  <rect x="120" y="1370" width="520" height="250" rx="42" fill="#071226" stroke="#5CB7FF" stroke-opacity=".35" stroke-width="2"/>
  <text x="165" y="1435" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="#AFC9E8">UNA DECISIÓN VISIBLE</text>
  <text x="165" y="1490" font-family="Arial, sans-serif" font-size="27" fill="#DCEAFF"><tspan x="165">Menos pasos ayudan a</tspan><tspan x="165" dy="40">elegir más rápido.</tspan></text>
  <rect x="165" y="1535" width="350" height="82" rx="28" fill="#238FFF"/>
  <text x="340" y="1587" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="1" fill="#FFFFFF">MIRA EL ENFOQUE</text>
</svg>`);

await sharp(background).composite([
  { input: roundedDesktop, left: 140, top: 785 },
  { input: roundedMobile, left: 720, top: 920 },
  { input: logo, left: 120, top: 235 },
]).png({ compressionLevel: 9 }).toFile(output);

console.log(output);

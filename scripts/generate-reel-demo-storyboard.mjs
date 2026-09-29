import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const projectImage = path.join(root, "public", "portfolio", "molotes.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "de-visita-a-contacto";

const scenes = [
  {
    suffix: "cover",
    eyebrow: "DEMOSTRACION WEB",
    title: ["DE VISITA", "A CONTACTO"],
    body: ["Así guiamos una web para facilitar", "el siguiente paso."],
    accent: "#48A7FF",
  },
  {
    suffix: "storyboard-01",
    eyebrow: "ESCENA 1 · 0–2 S",
    title: ["PRIMERO:", "CLARIDAD"],
    body: ["La propuesta debe entenderse antes", "de pedir cualquier acción."],
    accent: "#8E7CFF",
  },
  {
    suffix: "storyboard-02",
    eyebrow: "ESCENA 2 · 2–10 S",
    title: ["DESPUÉS:", "UNA RUTA"],
    body: ["Servicios, proyecto y contacto avanzan", "en un orden natural."],
    accent: "#48A7FF",
  },
  {
    suffix: "storyboard-03",
    eyebrow: "ESCENA 3 · 10–18 S",
    title: ["CIERRA CON", "CONFIANZA"],
    body: ["Una llamada clara reduce dudas y", "facilita escribir por WhatsApp."],
    accent: "#8E7CFF",
  },
  {
    suffix: "storyboard-04",
    eyebrow: "CIERRE · 18–22 S",
    title: ["REVISA TU", "RECORRIDO"],
    body: ["Cada sección debe acercar a tu cliente", "a una decisión clara."],
    cta: "ESCRÍBENOS POR WHATSAPP",
    accent: "#48A7FF",
  },
];

const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
}[char]));

const makeOverlay = (scene) => Buffer.from(`
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset="0.58" stop-color="#071737"/>
      <stop offset="1" stop-color="#140F38"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1B43"/>
      <stop offset="1" stop-color="#080D25"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000" flood-opacity="0.55"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="970" cy="150" r="330" fill="${scene.accent}" opacity="0.10"/>
  <circle cx="90" cy="1550" r="360" fill="#6D5AFF" opacity="0.08"/>
  <rect x="72" y="166" width="936" height="1180" rx="54" fill="url(#card)" stroke="${scene.accent}" stroke-opacity="0.35" stroke-width="3" filter="url(#shadow)"/>
  <rect x="96" y="190" width="888" height="1128" rx="34" fill="#050A18" stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="2"/>
  <rect x="96" y="190" width="888" height="76" rx="34" fill="#101B39"/>
  <circle cx="142" cy="228" r="9" fill="${scene.accent}"/>
  <circle cx="174" cy="228" r="9" fill="#FFFFFF" opacity="0.35"/>
  <circle cx="206" cy="228" r="9" fill="#FFFFFF" opacity="0.18"/>
  <rect x="116" y="1382" width="340" height="48" rx="24" fill="${scene.accent}" opacity="0.16"/>
  <text x="286" y="1414" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="${scene.accent}">${escapeXml(scene.eyebrow)}</text>
  <text x="76" y="1532" font-family="Arial, sans-serif" font-size="78" font-weight="800" fill="#FFFFFF">
    <tspan x="76">${escapeXml(scene.title[0])}</tspan>
    <tspan x="76" dy="88" fill="${scene.accent}">${escapeXml(scene.title[1])}</tspan>
  </text>
  <text x="76" y="1742" font-family="Arial, sans-serif" font-size="32" fill="#D8E7FF">
    <tspan x="76">${escapeXml(scene.body[0])}</tspan>
    <tspan x="76" dy="46">${escapeXml(scene.body[1])}</tspan>
  </text>
  ${scene.cta ? `<rect x="76" y="1830" width="480" height="68" rx="18" fill="${scene.accent}"/><text x="316" y="1873" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">${escapeXml(scene.cta)}</text>` : ""}
  <text x="1004" y="1878" text-anchor="end" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="#FFFFFF">aionsite.com.mx</text>
</svg>`);

const logo = await sharp(logoPath).resize({ width: 260 }).png().toBuffer();

for (const scene of scenes) {
  const screenshot = await sharp(projectImage)
    .resize(840, 1000, { fit: "contain", background: "#F9F6F0" })
    .png()
    .toBuffer();
  const roundedMask = Buffer.from('<svg width="840" height="1000"><rect width="840" height="1000" rx="28" fill="#fff"/></svg>');
  const roundedScreenshot = await sharp(screenshot)
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const frame = await sharp(makeOverlay(scene))
    .composite([{ input: roundedScreenshot, left: 120, top: 290 }])
    .png()
    .toBuffer();

  await sharp(frame)
    .composite([{ input: logo, left: 76, top: 68 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, `${slug}-${scene.suffix}.png`));
}

console.log(scenes.map((scene) => `${slug}-${scene.suffix}.png`).join("\n"));

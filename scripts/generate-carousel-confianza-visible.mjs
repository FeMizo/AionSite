import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const sourcePath = path.join(root, "public", "portfolio", "randmcnally.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "la-confianza-empieza-clara";

const slides = [
  { n: "01", label: "AUTORIDAD DIGITAL", title: ["LA CONFIANZA", "EMPIEZA CLARA"], body: ["Una portada precisa reduce dudas", "antes del primer contacto."], side: "left", accent: "#55B7FF" },
  { n: "02", label: "PROBLEMA", title: ["CUANDO TODO", "COMPITE"], body: ["Demasiadas promesas ocultan", "la decisión que realmente importa."], side: "right", accent: "#9A82FF" },
  { n: "03", label: "CAMBIO CONCRETO", title: ["ORDENA TU", "MENSAJE"], body: ["Primero explica valor; después", "muestra el siguiente paso."], side: "left", accent: "#55B7FF" },
  { n: "04", label: "EJEMPLO DEMOSTRATIVO", title: ["UN RECORRIDO", "SIN FRICCIÓN"], body: ["Contexto, opciones y acción", "siguen una jerarquía visible."], side: "full", accent: "#9A82FF" },
  { n: "05", label: "CONCLUSIÓN", title: ["HAZ FÁCIL", "CONFIAR"], body: ["La claridad visible prepara", "conversaciones mejor enfocadas."], side: "right", accent: "#55B7FF", cta: "CONOCE AIONSITE" },
];

const esc = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));

function frame(slide) {
  if (slide.side === "full") return { x: 70, y: 110, w: 940, h: 560 };
  if (slide.side === "left") return { x: 520, y: 620, w: 490, h: 330 };
  return { x: 70, y: 620, w: 490, h: 330 };
}

function textBlock(slide) {
  if (slide.side === "full") return { x: 110, y: 735, w: 860, titleSize: 62 };
  if (slide.side === "left") return { x: 70, y: 330, w: 410, titleSize: 51 };
  return { x: 610, y: 330, w: 400, titleSize: 49 };
}

function background(slide) {
  const f = frame(slide);
  const t = textBlock(slide);
  return Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".58" stop-color="#071A3C"/><stop offset="1" stop-color="#170E3A"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="${slide.accent}" stop-opacity=".34"/><stop offset="1" stop-color="${slide.accent}" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity=".62"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="${slide.side === "right" ? 900 : 170}" cy="${slide.side === "full" ? 970 : 120}" r="430" fill="url(#glow)"/>
    <path d="M0 1010 C280 920 610 1060 1080 900 V1080 H0Z" fill="#020513" opacity=".74"/>
    <text x="70" y="1010" font-family="Arial, sans-serif" font-size="160" font-weight="800" fill="#FFFFFF" opacity=".035">${slide.n}</text>
    <rect x="${f.x - 12}" y="${f.y - 12}" width="${f.w + 24}" height="${f.h + 24}" rx="42" fill="#08142C" stroke="${slide.accent}" stroke-opacity=".62" stroke-width="3" filter="url(#shadow)"/>
    <rect x="${t.x}" y="${t.y - 105}" width="${slide.side === "full" ? 340 : 300}" height="52" rx="26" fill="${slide.accent}" fill-opacity=".18"/>
    <text x="${t.x + (slide.side === "full" ? 170 : 150)}" y="${t.y - 71}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="2.2" fill="${slide.accent}">${esc(slide.label)}</text>
    <text x="${t.x}" y="${t.y + 10}" font-family="Arial, sans-serif" font-size="${t.titleSize}" font-weight="800" fill="#FFFFFF"><tspan x="${t.x}">${esc(slide.title[0])}</tspan><tspan x="${t.x}" dy="68" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${t.x}" y="${t.y + 185}" font-family="Arial, sans-serif" font-size="${slide.side === "full" ? 27 : 23}" fill="#D8E8FF"><tspan x="${t.x}">${esc(slide.body[0])}</tspan><tspan x="${t.x}" dy="39">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="${t.x}" y="${t.y + 280}" width="${slide.side === "right" ? 360 : 390}" height="76" rx="26" fill="${slide.accent}"/><text x="${t.x + (slide.side === "right" ? 180 : 195)}" y="${t.y + 328}" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="800" letter-spacing="1.2" fill="#FFFFFF">${esc(slide.cta)}</text>` : ""}
    <text x="1010" y="1010" text-anchor="end" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#FFFFFF">${slide.cta ? "aionsite.com.mx" : `${slide.n} / 05`}</text>
  </svg>`);
}

const logo = await sharp(logoPath).resize({ width: 220 }).png().toBuffer();
for (const slide of slides) {
  const f = frame(slide);
  const screenshot = await sharp(sourcePath)
    .extract({ left: 0, top: 0, width: 1425, height: 420 })
    .resize(f.w, f.h, { fit: slide.side === "full" ? "cover" : "contain", position: "centre", background: "#061020" })
    .png()
    .toBuffer();
  const mask = Buffer.from(`<svg width="${f.w}" height="${f.h}"><rect width="${f.w}" height="${f.h}" rx="30" fill="#fff"/></svg>`);
  const rounded = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  await sharp(background(slide))
    .composite([{ input: rounded, left: f.x, top: f.y }, { input: logo, left: 70, top: 50 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

console.log(slides.map((slide) => `${slug}-${slide.n}.png`).join("\n"));

import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const screenshotPath = path.join(root, "public", "portfolio", "fateh.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "ordena-tus-servicios";

const slides = [
  { n: "01", label: "GUÍA PRÁCTICA", title: ["ORDENA TUS", "SERVICIOS"], body: ["Cada opción debe ayudar a elegir", "sin comparar información de más."], side: "right", accent: "#4DA8FF" },
  { n: "02", label: "EL PROBLEMA", title: ["TODO PARECE", "IGUAL"], body: ["El visitante no distingue qué", "solución necesita primero."], side: "left", accent: "#8E7CFF" },
  { n: "03", label: "EL CAMBIO", title: ["AGRUPA POR", "NECESIDAD"], body: ["Relaciona cada servicio con un", "problema concreto del cliente."], side: "right", accent: "#4DA8FF" },
  { n: "04", label: "LA DECISIÓN", title: ["MARCA EL", "SIGUIENTE PASO"], body: ["Un botón claro convierte interés", "en una conversación útil."], side: "left", accent: "#8E7CFF" },
  { n: "05", label: "CONCLUSIÓN", title: ["HAZ FÁCIL", "ELEGIRTE"], body: ["Ordena tu oferta y guía", "hacia una sola acción."], side: "left", accent: "#4DA8FF", cta: "ESCRÍBENOS POR WHATSAPP" },
];

const esc = (v) => v.replace(/[<>&'\"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);
const screenshot = await sharp(screenshotPath).resize(500, 420, { fit: "cover", position: "top" }).png().toBuffer();
const portrait = await sharp(portraitPath).resize(310, 390, { fit: "cover", position: "top" }).png().toBuffer();
const logo = await sharp(logoPath).resize({ width: 235 }).png().toBuffer();
const shotMask = Buffer.from('<svg width="500" height="420"><rect width="500" height="420" rx="34" fill="#fff"/></svg>');
const portraitMask = Buffer.from('<svg width="310" height="390"><rect width="310" height="390" rx="38" fill="#fff"/></svg>');
const roundedShot = await sharp(screenshot).composite([{ input: shotMask, blend: "dest-in" }]).png().toBuffer();
const roundedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();

for (const slide of slides) {
  const left = slide.side === "left";
  const textX = left ? 72 : 642;
  const imageX = left ? 500 : 88;
  const overlay = Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".58" stop-color="#081B3E"/><stop offset="1" stop-color="#17113C"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#000" flood-opacity=".6"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/><circle cx="${left ? 970 : 110}" cy="110" r="300" fill="${slide.accent}" opacity=".11"/><circle cx="${left ? 90 : 990}" cy="980" r="250" fill="#6D5AFF" opacity=".08"/>
    <rect x="${imageX - 25}" y="180" width="535" height="530" rx="48" fill="#071229" stroke="${slide.accent}" stroke-opacity=".45" stroke-width="3" filter="url(#shadow)"/>
    <rect x="${textX}" y="192" width="330" height="54" rx="27" fill="${slide.accent}" opacity=".2"/><text x="${textX + 165}" y="227" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" letter-spacing="2" fill="${slide.accent}">${esc(slide.label)}</text>
    <text x="${textX}" y="352" font-family="Arial" font-size="46" font-weight="800" fill="#fff"><tspan x="${textX}">${esc(slide.title[0])}</tspan><tspan x="${textX}" dy="62" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${textX}" y="514" font-family="Arial" font-size="24" fill="#DFECFF"><tspan x="${textX}">${esc(slide.body[0])}</tspan><tspan x="${textX}" dy="36">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="72" y="842" width="425" height="74" rx="23" fill="${slide.accent}"/><text x="284" y="889" text-anchor="middle" font-family="Arial" font-size="23" font-weight="800" fill="#fff">${esc(slide.cta)}</text>` : ""}
    <text x="72" y="1002" font-family="Arial" font-size="24" font-weight="700" fill="#fff">aionsite.com.mx</text><text x="1008" y="92" text-anchor="end" font-family="Arial" font-size="22" font-weight="700" fill="#CFE3FF">${slide.n}/05</text>
  </svg>`);

  const composites = [{ input: overlay, left: 0, top: 0 }, { input: logo, left: 72, top: 62 }];
  if (slide.n === "05") {
    composites.push({ input: roundedShot, left: 500, top: 270 });
    composites.push({ input: roundedPortrait, left: 680, top: 610 });
  } else {
    composites.push({ input: roundedShot, left: imageX, top: 270 });
  }
  await sharp({ create: { width: 1080, height: 1080, channels: 4, background: "#020617" } })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

console.log(slides.map((s) => `${slug}-${s.n}.png`).join("\n"));

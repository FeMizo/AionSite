import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const sourcePath = path.join(root, "public", "portfolio", "brisa-carmen.png");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "tu-portada-debe-responder";

const slides = [
  { n: "01", label: "GUÍA PRÁCTICA", title: ["TU PORTADA", "DEBE RESPONDER"], body: ["Cinco respuestas reducen dudas", "y acercan nuevos contactos."], layout: "hero", accent: "#55B7FF" },
  { n: "02", label: "PRIMERA RESPUESTA", title: ["¿QUÉ HACES", "EXACTAMENTE?"], body: ["Nombra tu servicio principal", "sin frases ambiguas ni adornos."], layout: "right", accent: "#9A82FF" },
  { n: "03", label: "SEGUNDA RESPUESTA", title: ["¿PARA QUIÉN", "FUNCIONA?"], body: ["Habla al emprendedor que", "necesita una solución concreta."], layout: "band", accent: "#55B7FF" },
  { n: "04", label: "TERCERA RESPUESTA", title: ["¿POR QUÉ", "CONFIAR?"], body: ["Muestra proceso, ejemplos y", "formas claras de trabajar."], layout: "left", accent: "#9A82FF" },
  { n: "05", label: "CONCLUSIÓN", title: ["¿QUÉ SIGUE", "AHORA?"], body: ["Indica una sola acción para", "iniciar la conversación."], layout: "portrait", accent: "#55B7FF", cta: "REVISA TU PORTADA" },
];

const esc = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));

function background(slide) {
  const hero = slide.layout === "hero";
  const band = slide.layout === "band";
  const portrait = slide.layout === "portrait";
  const tx = slide.layout === "right" ? 90 : slide.layout === "left" ? 585 : 90;
  const ty = hero ? 300 : band ? 665 : portrait ? 315 : 335;
  const titleSize = hero ? 66 : 53;
  return Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".58" stop-color="#071A3C"/><stop offset="1" stop-color="#170E3A"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="${slide.accent}" stop-opacity=".34"/><stop offset="1" stop-color="${slide.accent}" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity=".66"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="${slide.layout === "right" ? 190 : 890}" cy="${band ? 160 : 900}" r="450" fill="url(#glow)"/>
    <path d="M0 1010 C310 905 690 1060 1080 890 V1080 H0Z" fill="#020513" opacity=".8"/>
    ${hero ? `<rect x="70" y="220" width="940" height="650" rx="50" fill="#041027" fill-opacity=".82" stroke="#FFFFFF" stroke-opacity=".14" stroke-width="2" filter="url(#shadow)"/>` : ""}
    ${band ? `<rect x="70" y="590" width="940" height="390" rx="48" fill="#051128" fill-opacity=".96" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="2"/>` : ""}
    ${portrait ? `<rect x="70" y="245" width="560" height="680" rx="48" fill="#051128" fill-opacity=".96" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="2"/>` : ""}
    <rect x="${tx}" y="${ty - 100}" width="300" height="52" rx="26" fill="${slide.accent}" fill-opacity=".18"/>
    <text x="${tx + 150}" y="${ty - 66}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="2.1" fill="${slide.accent}">${esc(slide.label)}</text>
    <text x="${tx}" y="${ty + 10}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="900" fill="#FFFFFF"><tspan x="${tx}">${esc(slide.title[0])}</tspan><tspan x="${tx}" dy="70" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${tx}" y="${ty + 190}" font-family="Arial, sans-serif" font-size="25" fill="#D8E8FF"><tspan x="${tx}">${esc(slide.body[0])}</tspan><tspan x="${tx}" dy="40">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="${tx}" y="${ty + 285}" width="355" height="78" rx="27" fill="${slide.accent}"/><text x="${tx + 177}" y="${ty + 335}" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="800" letter-spacing="1" fill="#FFFFFF">${esc(slide.cta)}</text>` : ""}
    <text x="70" y="1010" font-family="Arial, sans-serif" font-size="118" font-weight="900" fill="#FFFFFF" opacity=".04">${slide.n}</text>
    <text x="1010" y="1010" text-anchor="end" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#FFFFFF">${slide.cta ? "aionsite.com.mx" : `${slide.n} / 05`}</text>
  </svg>`);
}

const logo = await sharp(logoPath).resize({ width: 220 }).png().toBuffer();
const portrait = await sharp(portraitPath).resize(430, 650, { fit: "cover", position: "top" }).png().toBuffer();
const portraitMask = Buffer.from(`<svg width="430" height="650"><defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".75" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="430" height="650" rx="54" fill="url(#fade)"/></svg>`);
const roundedPortrait = await sharp(portrait).composite([{ input: portraitMask, blend: "dest-in" }]).png().toBuffer();

for (const slide of slides) {
  const composites = [{ input: logo, left: 70, top: 52 }];
  if (slide.layout === "hero") {
    const image = await sharp(sourcePath).resize(940, 650, { fit: "cover", position: "top" }).blur(1).png().toBuffer();
    const mask = Buffer.from(`<svg width="940" height="650"><rect width="940" height="650" rx="50" fill="#fff" opacity=".42"/></svg>`);
    composites.unshift({ input: await sharp(image).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer(), left: 70, top: 220 });
  } else if (slide.layout === "band") {
    const image = await sharp(sourcePath).resize(940, 430, { fit: "cover", position: "top" }).png().toBuffer();
    const mask = Buffer.from(`<svg width="940" height="430"><rect width="940" height="430" rx="44" fill="#fff"/></svg>`);
    composites.unshift({ input: await sharp(image).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer(), left: 70, top: 120 });
  } else if (slide.layout === "right" || slide.layout === "left") {
    const image = await sharp(sourcePath).resize(440, 690, { fit: "cover", position: "top" }).png().toBuffer();
    const mask = Buffer.from(`<svg width="440" height="690"><rect width="440" height="690" rx="44" fill="#fff"/></svg>`);
    composites.unshift({ input: await sharp(image).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer(), left: slide.layout === "right" ? 570 : 70, top: 235 });
  } else {
    composites.unshift({ input: roundedPortrait, left: 620, top: 255 });
  }
  await sharp(background(slide)).composite(composites).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

console.log(slides.map((slide) => `${slug}-${slide.n}.png`).join("\n"));

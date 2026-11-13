import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "public", "social");
const screenshot = path.join(root, "public", "portfolio", "lobbypm.png");
const portrait = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logo = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "tu-experiencia-debe-verse";
const slides = [
  ["01", "AUTORIDAD VISIBLE", "TU EXPERIENCIA", "DEBE VERSE", "Una marca sólida muestra trabajo real antes de pedir confianza."],
  ["02", "EL PROBLEMA", "PROMETER NO ES", "DEMOSTRAR", "Sin ejemplos concretos, cada afirmación sigue siendo una promesa."],
  ["03", "EL CAMBIO", "MUESTRA CÓMO", "RESUELVES", "Explica decisiones, proceso y contexto sin inventar resultados."],
  ["04", "EJEMPLO REAL", "UN PROYECTO", "DA CONTEXTO", "Diseño, jerarquía y recorrido revelan criterio profesional visible."],
  ["05", "CONCLUSIÓN", "RESPALDA CADA", "AFIRMACIÓN", "Tu portafolio convierte experiencia en evidencia que otros pueden revisar."],
];
const esc = s => s.replace(/[<>&'\"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]));
const brand = await sharp(logo).resize({width:210}).png().toBuffer();
const shot = await sharp(screenshot).resize(820,540,{fit:"cover",position:"top"}).png().toBuffer();
const face = await sharp(portrait).resize(430,620,{fit:"cover",position:"top"}).png().toBuffer();

for (const [n,label,a,b,body] of slides) {
  const final = n === "05";
  const photo = final ? face : shot;
  const photoLeft = final ? 600 : 130;
  const photoTop = final ? 300 : (n === "01" ? 130 : 120);
  const photoW = final ? 430 : 820;
  const photoH = final ? 620 : 540;
  const panelY = n === "01" ? 650 : final ? 250 : 610;
  const textX = final ? 90 : 110;
  const svg = Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#020611"/><stop offset=".58" stop-color="#071A3C"/><stop offset="1" stop-color="#1C1044"/></linearGradient><filter id="s"><feDropShadow dy="24" stdDeviation="28" flood-opacity=".62"/></filter></defs>
  <rect width="1080" height="1080" fill="url(#bg)"/><circle cx="930" cy="130" r="330" fill="#236CFF" opacity=".15"/><circle cx="100" cy="980" r="280" fill="#8065FF" opacity=".13"/>
  <rect x="${photoLeft-18}" y="${photoTop-18}" width="${photoW+36}" height="${photoH+36}" rx="44" fill="#0A1833" stroke="#70B8FF" stroke-opacity=".4" filter="url(#s)"/>
  ${!final ? `<rect x="70" y="${panelY}" width="940" height="370" rx="44" fill="#030A19" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".13"/>` : `<rect x="60" y="250" width="570" height="660" rx="44" fill="#030A19" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".13"/>`}
  <rect x="${textX}" y="${panelY+45}" width="270" height="48" rx="24" fill="#58B5FF" fill-opacity=".18"/><text x="${textX+135}" y="${panelY+76}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" letter-spacing="2" fill="#70C4FF">${esc(label)}</text>
  <text x="${textX}" y="${panelY+155}" font-family="Arial" font-size="53" font-weight="900" fill="#FFFFFF"><tspan x="${textX}">${esc(a)}</tspan><tspan x="${textX}" dy="62" fill="#9B87FF">${esc(b)}</tspan></text>
  <text x="${textX}" y="${panelY+300}" font-family="Arial" font-size="24" fill="#D9E8FF">${final ? `<tspan x="${textX}">Tu portafolio convierte experiencia</tspan><tspan x="${textX}" dy="36">en evidencia que otros pueden revisar.</tspan>` : esc(body)}</text>
  ${final ? `<rect x="90" y="785" width="390" height="82" rx="28" fill="#238BFF"/><text x="285" y="837" text-anchor="middle" font-family="Arial" font-size="21" font-weight="800" fill="#FFFFFF">REVISA LOS PROYECTOS</text>` : ""}
  <text x="70" y="1020" font-family="Arial" font-size="19" font-weight="700" fill="#FFFFFF">${n} / 05</text><text x="1010" y="1020" text-anchor="end" font-family="Arial" font-size="19" fill="#BFD5F7">aionsite.com.mx</text>
  </svg>`);
  const mask = Buffer.from(`<svg width="${photoW}" height="${photoH}"><rect width="${photoW}" height="${photoH}" rx="28" fill="white"/></svg>`);
  const rounded = await sharp(photo).composite([{input:mask,blend:"dest-in"}]).png().toBuffer();
  await sharp(svg).composite([{input:rounded,left:photoLeft,top:photoTop},{input:brand,left:70,top:45}]).png().toFile(path.join(out,`${slug}-${n}.png`));
}

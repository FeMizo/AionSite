import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const projectImage = path.join(root, "public", "portfolio", "atmedica.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "contacto-visible-en-tu-web";

const scenes = [
  { suffix: "cover", eyebrow: "DEMOSTRACION WEB", title: ["¿ENCUENTRAN", "COMO CONTACTARTE?"], body: ["Un contacto visible convierte interés", "en una conversación real."], accent: "#48A7FF" },
  { suffix: "storyboard-01", eyebrow: "ESCENA 1 · 0–2 S", title: ["MUESTRA EL", "PROBLEMA"], body: ["La visita entiende tu servicio,", "pero no encuentra el siguiente paso."], accent: "#8E7CFF" },
  { suffix: "storyboard-02", eyebrow: "ESCENA 2 · 2–9 S", title: ["HAZ VISIBLE", "LA ACCION"], body: ["Un botón claro aparece cerca", "de la decisión principal."], accent: "#48A7FF" },
  { suffix: "storyboard-03", eyebrow: "ESCENA 3 · 9–16 S", title: ["REDUCE LA", "FRICCION"], body: ["WhatsApp abre con contexto y", "facilita iniciar la conversación."], accent: "#8E7CFF" },
  { suffix: "storyboard-04", eyebrow: "CIERRE · 16–21 S", title: ["REVISA TU", "CONTACTO"], body: ["Comprueba que sea visible desde", "cada sección importante."], cta: "ESCRIBENOS POR WHATSAPP", accent: "#48A7FF" },
];

const xml = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]);

const overlay = (scene) => Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".58" stop-color="#071737"/><stop offset="1" stop-color="#140F38"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity=".6"/></filter></defs>
  <rect width="1080" height="1920" fill="url(#bg)"/><circle cx="940" cy="180" r="330" fill="${scene.accent}" opacity=".11"/><circle cx="80" cy="1510" r="350" fill="#6D5AFF" opacity=".08"/>
  <rect x="70" y="170" width="940" height="1140" rx="54" fill="#08132F" stroke="${scene.accent}" stroke-opacity=".4" stroke-width="3" filter="url(#shadow)"/>
  <rect x="96" y="196" width="888" height="1088" rx="34" fill="#050A18"/><rect x="96" y="196" width="888" height="72" rx="34" fill="#101B39"/>
  <circle cx="142" cy="232" r="9" fill="${scene.accent}"/><circle cx="174" cy="232" r="9" fill="#fff" opacity=".35"/><circle cx="206" cy="232" r="9" fill="#fff" opacity=".18"/>
  <rect x="76" y="1374" width="390" height="56" rx="28" fill="${scene.accent}" opacity=".18"/><text x="271" y="1410" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" letter-spacing="2" fill="${scene.accent}">${xml(scene.eyebrow)}</text>
  <text x="76" y="1530" font-family="Arial" font-size="76" font-weight="800" fill="#fff"><tspan x="76">${xml(scene.title[0])}</tspan><tspan x="76" dy="88" fill="${scene.accent}">${xml(scene.title[1])}</tspan></text>
  <text x="76" y="1738" font-family="Arial" font-size="32" fill="#D8E7FF"><tspan x="76">${xml(scene.body[0])}</tspan><tspan x="76" dy="46">${xml(scene.body[1])}</tspan></text>
  ${scene.cta ? `<rect x="76" y="1824" width="470" height="72" rx="22" fill="${scene.accent}"/><text x="311" y="1869" text-anchor="middle" font-family="Arial" font-size="23" font-weight="800" fill="#fff">${xml(scene.cta)}</text>` : ""}
  <text x="1004" y="1874" text-anchor="end" font-family="Arial" font-size="25" font-weight="700" fill="#fff">aionsite.com.mx</text>
</svg>`);

const logo = await sharp(logoPath).resize({ width: 260 }).png().toBuffer();
const screenshot = await sharp(projectImage).resize(840, 950, { fit: "contain", background: "#F7FAFF" }).png().toBuffer();
const mask = Buffer.from('<svg width="840" height="950"><rect width="840" height="950" rx="28" fill="#fff"/></svg>');
const rounded = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();

for (const scene of scenes) {
  const frame = await sharp(overlay(scene)).composite([{ input: rounded, left: 120, top: 300 }]).png().toBuffer();
  await sharp(frame).composite([{ input: logo, left: 76, top: 66 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${scene.suffix}.png`));
}

console.log(scenes.map((scene) => `${slug}-${scene.suffix}.png`).join("\n"));

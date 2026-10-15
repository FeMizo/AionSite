import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const backgroundPath = "C:/Users/mizo_/.codex/generated_images/019faacd-d554-7e30-8694-658b0d266007/exec-7c78a48b-6cac-4110-82f8-5a44bd32bb56.png";
const outputPath = path.join(root, "public", "social", "felipe-miss-abierto-oportunidades-linkedin.png");

const background = await sharp(backgroundPath)
  .resize(1200, 1200, { fit: "cover" })
  .modulate({ brightness: 0.86, saturation: 0.9 })
  .png()
  .toBuffer();

const layer = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="1" y1="0" x2="0" y2="0"><stop stop-color="#020817" stop-opacity=".96"/><stop offset=".56" stop-color="#031027" stop-opacity=".78"/><stop offset=".78" stop-color="#031027" stop-opacity="0"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity=".6"/></filter>
  </defs>
  <rect width="1200" height="1200" fill="url(#shade)"/>
  <rect x="700" y="130" width="340" height="56" rx="28" fill="#176BC1" fill-opacity=".78" stroke="#60B3FF" stroke-opacity=".7"/>
  <text x="870" y="166" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" letter-spacing="2" fill="#FFFFFF">ABIERTO A OPORTUNIDADES</text>
  <text x="700" y="310" font-family="Arial" font-size="67" font-weight="800" fill="#FFFFFF" filter="url(#shadow)"><tspan x="700">LISTO PARA</tspan><tspan x="700" dy="80">SUMAR A UN</tspan><tspan x="700" dy="80" fill="#54A9FF">GRAN EQUIPO</tspan></text>
  <text x="700" y="608" font-family="Arial" font-size="29" fill="#E8F2FF"><tspan x="700">Experiencia digital para convertir</tspan><tspan x="700" dy="43">ideas en soluciones que funcionan.</tspan></text>
  <text x="700" y="758" font-family="Arial" font-size="23" font-weight="700" fill="#FFFFFF"><tspan x="700">DESARROLLO WEB</tspan><tspan x="700" dy="42">SEO TÉCNICO</tspan><tspan x="700" dy="42">AUTOMATIZACIÓN</tspan></text>
  <rect x="700" y="918" width="390" height="78" rx="24" fill="#2E8EEB"/>
  <text x="895" y="967" text-anchor="middle" font-family="Arial" font-size="26" font-weight="800" fill="#FFFFFF">CONECTEMOS</text>
  <text x="700" y="1086" font-family="Arial" font-size="29" font-weight="800" fill="#FFFFFF">FELIPE MISS</text>
  <text x="1090" y="1086" text-anchor="end" font-family="Arial" font-size="23" font-weight="700" fill="#D6E8FF">MÉXICO</text>
</svg>`);

await sharp(background)
  .composite([{ input: layer, left: 0, top: 0 }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(outputPath);

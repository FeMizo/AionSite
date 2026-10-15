import sharp from "sharp";

const source = "C:/Users/mizo_/.codex/generated_images/019faacd-d554-7e30-8694-658b0d266007/exec-6f4aef9d-bb74-40c0-94f4-23d0fab7bcd5.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const output = "C:/Users/mizo_/Documents/Trabajo/Personal/AionSite/public/social/hablemos-de-tu-proyecto-linkedin-facebook.png";

const overlay = Buffer.from(`
<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#020617" stop-opacity="0.05"/>
      <stop offset="0.48" stop-color="#020617" stop-opacity="0.58"/>
      <stop offset="1" stop-color="#020617" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="cta" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#168BFF"/>
      <stop offset="1" stop-color="#735CFF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#shade)"/>
  <rect x="664" y="108" width="448" height="54" rx="27" fill="#12356F"/>
  <text x="888" y="143" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="2" fill="#9BD2FF">DISEÑO WEB PARA NEGOCIOS</text>
  <text x="664" y="280" font-family="Arial, sans-serif" font-size="65" font-weight="800" fill="#FFFFFF">
    <tspan x="664">¿TU NEGOCIO</tspan>
    <tspan x="664" dy="76">YA TIENE</tspan>
    <tspan x="664" dy="76" fill="#42A5FF">UNA WEB?</tspan>
  </text>
  <text x="664" y="560" font-family="Arial, sans-serif" font-size="28" fill="#DCEBFF">
    <tspan x="664">Te ayudo a crear, mejorar y posicionar</tspan>
    <tspan x="664" dy="42">un sitio que represente tu negocio.</tspan>
  </text>
  <g font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">
    <circle cx="678" cy="700" r="7" fill="#42A5FF"/><text x="702" y="708">Páginas web</text>
    <circle cx="678" cy="756" r="7" fill="#7B6CFF"/><text x="702" y="764">Mantenimiento</text>
    <circle cx="678" cy="812" r="7" fill="#42A5FF"/><text x="702" y="820">SEO</text>
  </g>
  <rect x="664" y="880" width="360" height="68" rx="18" fill="url(#cta)"/>
  <text x="844" y="923" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="800" fill="#FFFFFF">HABLEMOS DE TU PROYECTO</text>
  <text x="664" y="1024" font-family="Arial, sans-serif" font-size="27" font-weight="800" fill="#FFFFFF">+52 938 157 39 88</text>
  <text x="664" y="1070" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="#8DC9FF">aionsite.com.mx</text>
</svg>`);

const logo = await sharp(logoPath).resize({ width: 245 }).png().toBuffer();
const base = await sharp(source)
  .resize(1200, 1200, { fit: "cover", position: "centre" })
  .flop()
  .png()
  .toBuffer();
const composed = await sharp(base).composite([{ input: overlay }]).png().toBuffer();

await sharp(composed)
  .composite([{ input: logo, left: 664, top: 34 }])
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);

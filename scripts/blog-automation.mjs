import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const blogPostsPath = path.join(rootDir, "src", "data", "blog-posts.ts");
const topicsPath = path.join(rootDir, "content", "blog-topics.json");
const publicBlogDir = path.join(rootDir, "public", "blog");
const draftsDir = path.join(rootDir, "content", "generated");

const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const allowedBlockTypes = new Set(["h2", "h3", "p", "quote"]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function formatSpanishDate(date) {
  return `${date.getUTCDate()} de ${monthNames[date.getUTCMonth()]}, ${date.getUTCFullYear()}`;
}

function extractPostIds(source) {
  return [...source.matchAll(/^ {4}id:\s*"([^"]+)",$/gm)].map((match) => match[1]);
}

function extractFirstArrayDate(source) {
  const match = source.match(/\bdateISO:\s*"(\d{4}-\d{2}-\d{2})"/);
  return match?.[1];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function getNextPublishDate(source) {
  const firstDate = extractFirstArrayDate(source);
  const today = new Date();
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  if (!firstDate) return todayUtc;

  const latest = new Date(`${firstDate}T00:00:00.000Z`);
  const candidate = addDays(latest, 2);
  return candidate > todayUtc ? candidate : todayUtc;
}

function selectTopic(topics, existingIds) {
  return topics.find((topic) => !existingIds.has(slugify(topic.topic)));
}

function buildTextPrompt(topic, publishDate) {
  return [
    "Eres estratega SEO y copywriter senior para AionSite, una agencia web en Mexico.",
    "Escribe un blog en espanol mexicano, claro, practico y orientado a negocio.",
    "Devuelve exclusivamente JSON valido, sin markdown ni texto adicional.",
    "",
    "Contrato JSON:",
    "{",
    '  "id": "slug-url-seguro",',
    '  "title": "maximo 60 caracteres",',
    '  "excerpt": "maximo 160 caracteres, sirve como meta description",',
    '  "badgeText": "categoria corta",',
    '  "readTime": "7 min de lectura",',
    '  "keywords": ["..."],',
    '  "headings": [{ "level": 2, "id": "slug", "text": "..." }],',
    '  "blocks": [{ "type": "h2", "id": "slug", "text": "..." }]',
    "}",
    "",
    "Reglas estrictas:",
    "- Usa solo block.type: h2, h3, p, quote.",
    "- Cada h2/h3 en blocks debe existir tambien en headings con el mismo id, level y text.",
    "- Incluye 6 a 9 headings y 900 a 1300 palabras.",
    "- No uses bullets con caracteres especiales; escribe parrafos normales.",
    "- Evita claims inventados, cifras no verificables y nombres de marcas salvo que sean necesarios.",
    "- Termina con un llamado a contactar a AionSite, sin sonar agresivo.",
    `- Fecha de publicacion ISO: ${publishDate.toISOString().slice(0, 10)}.`,
    "",
    `Tema: ${topic.topic}`,
    `Keyword principal: ${topic.primaryKeyword}`,
    `Audiencia: ${topic.audience}`,
    `Angulo: ${topic.angle}`,
    `Badge sugerido: ${topic.badgeText}`,
  ].join("\n");
}

function buildFallbackPost(topic, publishDate) {
  const id = slugify(topic.topic);
  const headings = [
    { level: 2, id: "por-que-importa", text: "Por que importa esta decision" },
    { level: 2, id: "errores-comunes", text: "Errores comunes que conviene evitar" },
    { level: 3, id: "pensar-solo-en-precio", text: "Pensar solo en el precio inicial" },
    { level: 3, id: "ignorar-mantenimiento", text: "Ignorar el mantenimiento real" },
    { level: 2, id: "como-evaluarlo", text: "Como evaluarlo con criterio" },
    { level: 2, id: "siguiente-paso", text: "El siguiente paso" },
  ];

  return {
    id,
    title: topic.topic.slice(0, 58),
    excerpt: `Guia practica sobre ${topic.primaryKeyword} para tomar mejores decisiones web sin perder velocidad, SEO ni oportunidades de conversion.`.slice(0, 158),
    badgeText: topic.badgeText,
    readTime: "7 min de lectura",
    keywords: [
      topic.primaryKeyword,
      "diseno web Mexico",
      "SEO tecnico",
      "conversion web",
      "AionSite",
    ],
    headings,
    blocks: [
      { type: "h2", id: "por-que-importa", text: "Por que importa esta decision" },
      {
        type: "p",
        text: `Elegir bien cuando trabajas ${topic.primaryKeyword} no es una decision cosmetica. Impacta la velocidad, la estructura SEO, la facilidad de mantenimiento y la forma en que tus prospectos entienden tu oferta.`,
      },
      {
        type: "p",
        text: "Un sitio puede verse correcto y aun asi estar limitado por una mala base tecnica, contenidos poco claros o procesos manuales que hacen lento cada cambio. La mejor decision es la que conecta objetivo comercial, presupuesto y capacidad operativa.",
      },
      { type: "h2", id: "errores-comunes", text: "Errores comunes que conviene evitar" },
      { type: "h3", id: "pensar-solo-en-precio", text: "Pensar solo en el precio inicial" },
      {
        type: "p",
        text: "El costo inicial importa, pero no cuenta toda la historia. Una solucion barata puede salir cara si despues exige rehacer contenido, corregir velocidad, limpiar plugins o reconstruir paginas que no posicionan.",
      },
      { type: "h3", id: "ignorar-mantenimiento", text: "Ignorar el mantenimiento real" },
      {
        type: "p",
        text: "Cada sitio necesita actualizaciones, ajustes de contenido, medicion y mejoras. Si el flujo para cambiar una pagina es confuso, el negocio termina dejando el sitio abandonado justo cuando deberia estar aprendiendo del mercado.",
      },
      {
        type: "quote",
        text: "Un sitio web no debe ser solo una entrega: debe ser una herramienta que puedas mejorar con datos.",
      },
      { type: "h2", id: "como-evaluarlo", text: "Como evaluarlo con criterio" },
      {
        type: "p",
        text: "Evalua la decision por cinco frentes: velocidad, SEO tecnico, claridad del contenido, facilidad para publicar cambios y capacidad de convertir visitas en contactos. Si una opcion falla en dos o mas frentes, probablemente no es la base adecuada.",
      },
      {
        type: "p",
        text: "Tambien conviene revisar quien mantendra el sitio. Un negocio con equipo interno puede manejar una plataforma mas flexible; uno que necesita rapidez y soporte deberia priorizar simplicidad, estabilidad y procesos claros.",
      },
      { type: "h2", id: "siguiente-paso", text: "El siguiente paso" },
      {
        type: "p",
        text: "Si no estas seguro de cual camino tomar, AionSite puede ayudarte a auditar tu situacion actual y convertirla en un plan concreto: que construir, que evitar y que publicar primero para generar resultados medibles.",
      },
    ],
  };
}

async function callOpenAiJson(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required to generate blog content.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
      input: prompt,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OpenAI text generation failed: ${JSON.stringify(payload)}`);
  }

  const text =
    payload.output_text ||
    payload.output?.flatMap((item) => item.content || [])
      .map((item) => item.text)
      .filter(Boolean)
      .join("\n");

  if (!text) throw new Error("OpenAI response did not include output text.");
  return parseJsonObject(text);
}

function parseJsonObject(text) {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("OpenAI response did not contain a JSON object.");
    }
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

function normalizePost(rawPost, topic, publishDate, existingIds) {
  const id = slugify(rawPost.id || topic.topic);
  if (!id) throw new Error("Generated post is missing a valid id.");
  if (existingIds.has(id)) throw new Error(`Post id already exists: ${id}`);

  const dateISO = publishDate.toISOString().slice(0, 10);
  const image = `/blog/${id}.webp`;
  const blocks = (rawPost.blocks || [])
    .map((block) => ({
      type: block.type === "intro" || block.type === "cta" ? "p" : block.type,
      id: block.id ? slugify(block.id) : undefined,
      text: String(block.text || "").trim(),
    }))
    .filter((block) => allowedBlockTypes.has(block.type) && block.text);

  const headingsFromBlocks = blocks
    .filter((block) => block.type === "h2" || block.type === "h3")
    .map((block) => ({
      level: block.type === "h2" ? 2 : 3,
      id: block.id || slugify(block.text),
      text: block.text,
    }));

  const normalizedBlocks = blocks.map((block) => {
    if (block.type === "h2" || block.type === "h3") {
      return { ...block, id: block.id || slugify(block.text) };
    }
    return block.id ? block : { type: block.type, text: block.text };
  });

  return {
    id,
    title: String(rawPost.title || topic.topic).trim(),
    excerpt: String(rawPost.excerpt || "").trim(),
    image,
    badgeText: String(rawPost.badgeText || topic.badgeText || "Estrategia Web").trim(),
    date: formatSpanishDate(publishDate),
    dateISO,
    readTime: String(rawPost.readTime || "7 min de lectura").trim(),
    keywords: [...new Set([topic.primaryKeyword, ...(rawPost.keywords || [])].map((item) => String(item).trim()).filter(Boolean))],
    headings: headingsFromBlocks,
    blocks: normalizedBlocks,
  };
}

function validatePost(post, { requireImageFile = false } = {}) {
  const errors = [];
  if (post.title.length > 60) errors.push(`Title is ${post.title.length} characters; max is 60.`);
  if (post.excerpt.length > 160) errors.push(`Excerpt is ${post.excerpt.length} characters; max is 160.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) errors.push(`Invalid slug: ${post.id}`);
  if (post.image !== `/blog/${post.id}.webp`) errors.push(`Image must be /blog/${post.id}.webp.`);
  if (!post.headings.length) errors.push("Post must include headings.");
  if (!post.blocks.length) errors.push("Post must include blocks.");

  const headingKeys = new Set(post.headings.map((heading) => `${heading.level}:${heading.id}:${heading.text}`));
  for (const block of post.blocks) {
    if (!allowedBlockTypes.has(block.type)) errors.push(`Unsupported block type: ${block.type}`);
    if ((block.type === "h2" || block.type === "h3") && !block.id) errors.push(`Heading block missing id: ${block.text}`);
    if (block.type === "h2" && !headingKeys.has(`2:${block.id}:${block.text}`)) errors.push(`Missing h2 in headings: ${block.id}`);
    if (block.type === "h3" && !headingKeys.has(`3:${block.id}:${block.text}`)) errors.push(`Missing h3 in headings: ${block.id}`);
  }

  if (requireImageFile) {
    const imagePath = path.join(rootDir, "public", post.image.replace(/^\//, ""));
    if (!existsSync(imagePath)) errors.push(`Image file does not exist: ${imagePath}`);
  }

  if (errors.length) {
    throw new Error(`Blog post validation failed:\n- ${errors.join("\n- ")}`);
  }
}

function toTsObject(value, indent = 2) {
  return JSON.stringify(value, null, indent).replace(/"([^"]+)":/g, "$1:");
}

function insertPost(source, post) {
  const marker = "export const blogPosts: BlogPost[] = [";
  const index = source.indexOf(marker);
  if (index === -1) throw new Error("Could not find blogPosts array marker.");

  const insertAt = index + marker.length;
  const postSource = `\n  ${toTsObject(post, 2).replace(/\n/g, "\n  ")},`;
  return `${source.slice(0, insertAt)}${postSource}${source.slice(insertAt)}`;
}

function buildImagePrompt(post, topic) {
  return [
    "Editorial tech illustration for a premium web agency blog.",
    `Article topic: ${topic.topic}.`,
    `Primary keyword: ${topic.primaryKeyword}.`,
    "Scene: modern digital workspace with abstract website layouts, search signals, performance dashboards, and conversion paths.",
    "Style: polished 3D/editorial illustration, premium agency look, deep navy background, balanced cyan and warm accent details, crisp lighting.",
    "Composition: landscape blog hero, centered subject with clean negative space, suitable for a 1200x800 crop.",
    "Constraints: no text, no logos, no watermark, no brand marks, no UI text.",
  ].join(" ");
}

async function generateImage(post, topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required to generate blog images.");
  }

  mkdirSync(publicBlogDir, { recursive: true });
  const prompt = buildImagePrompt(post, topic);
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
      prompt,
      size: process.env.OPENAI_IMAGE_SIZE || "1536x1024",
      quality: process.env.OPENAI_IMAGE_QUALITY || "medium",
      output_format: "webp",
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OpenAI image generation failed: ${JSON.stringify(payload)}`);
  }

  const base64 = payload.data?.[0]?.b64_json;
  if (!base64) throw new Error("OpenAI image response did not include b64_json.");

  const imagePath = path.join(publicBlogDir, `${post.id}.webp`);
  writeFileSync(imagePath, Buffer.from(base64, "base64"));
  return { imagePath, prompt };
}

async function generate() {
  const source = readFileSync(blogPostsPath, "utf8");
  const existingIds = new Set(extractPostIds(source));
  const topics = readJson(topicsPath);
  const topic = selectTopic(topics, existingIds);
  if (!topic) {
    console.log("No unpublished blog topics remain.");
    return;
  }

  const publishDate = getNextPublishDate(source);
  const prompt = buildTextPrompt(topic, publishDate);
  const allowFallback = process.argv.includes("--allow-fallback");
  const rawPost = allowFallback ? buildFallbackPost(topic, publishDate) : await callOpenAiJson(prompt);
  const post = normalizePost(rawPost, topic, publishDate, existingIds);
  validatePost(post);

  const { imagePath, prompt: imagePrompt } = allowFallback
    ? { imagePath: null, prompt: buildImagePrompt(post, topic) }
    : await generateImage(post, topic);

  if (!allowFallback) validatePost(post, { requireImageFile: true });

  mkdirSync(draftsDir, { recursive: true });
  writeFileSync(path.join(draftsDir, `${post.id}.json`), `${JSON.stringify(post, null, 2)}\n`);
  writeFileSync(path.join(draftsDir, `${post.id}-image-prompt.txt`), `${imagePrompt}\n`);

  const updated = insertPost(source, post);
  writeFileSync(blogPostsPath, updated);

  console.log(`Generated blog post: ${post.id}`);
  console.log(`Draft: content/generated/${post.id}.json`);
  console.log(`Image: ${imagePath ? path.relative(rootDir, imagePath) : "not generated in fallback mode"}`);
}

function validateGeneratedDrafts() {
  const source = readFileSync(blogPostsPath, "utf8");
  const ids = extractPostIds(source);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) throw new Error(`Duplicate blog ids: ${[...new Set(duplicates)].join(", ")}`);

  if (!existsSync(draftsDir)) {
    console.log("No generated drafts found; validating id uniqueness only.");
    return;
  }

  const draftFiles = readdirSync(draftsDir).filter((file) => file.endsWith(".json"));
  for (const file of draftFiles) {
    const post = readJson(path.join(draftsDir, file));
    validatePost(post, { requireImageFile: true });
    if (!ids.includes(post.id)) {
      throw new Error(`Generated draft is not present in blogPosts: ${post.id}`);
    }
  }

  console.log(`Validated ${draftFiles.length} generated draft(s).`);
}

const command = process.argv[2];

if (command === "generate") {
  generate().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else if (command === "validate") {
  try {
    validateGeneratedDrafts();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
} else {
  console.error("Usage: node scripts/blog-automation.mjs <generate|validate>");
  process.exit(1);
}

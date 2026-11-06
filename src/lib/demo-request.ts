export type DemoRequest = {
  name: string;
  business: string;
  service: string;
  platform?: string;
  website: string;
  goal: string;
  references: string;
  notes: string;
};

export const emptyDemoRequest: DemoRequest = {
  name: "", business: "", service: "Sitio web", platform: "Necesito asesoría", website: "", goal: "", references: "", notes: "",
};

const clean = (value: string) => value.replace(/[\r\n\t]+/g, " ").trim();

export function normalizeDemoUrl(value: string) {
  const text = value.trim();
  const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(text) ? text : `https://${text}`);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) {
    throw new Error("Usa enlaces públicos http o https, sin contraseñas ni puertos.");
  }
  const host = url.hostname.toLowerCase();
  if (!host.includes('.') || host.endsWith('.local') || host.endsWith('.internal') || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    throw new Error("Usa el dominio público del sitio web.");
  }
  return url.href;
}

export function validateDemoRequest(value: DemoRequest): DemoRequest {
  const request = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clean(item)])) as DemoRequest;
  if (!request.name || !request.business || !request.goal) throw new Error("Completa tu nombre, negocio y objetivo.");
  request.platform = request.platform || 'Necesito asesoría';
  if (!['WordPress / WooCommerce', 'Shopify', 'Código personalizado', 'Necesito asesoría'].includes(request.platform)) throw new Error('Selecciona una plataforma válida.');
  for (const [key, max] of Object.entries({ name: 80, business: 100, service: 60, website: 250, goal: 1000, notes: 500 })) {
    if ((request[key as keyof DemoRequest] || '').length > max) throw new Error(`El campo ${key} es demasiado largo.`);
  }
  request.website = value.website.trim() ? normalizeDemoUrl(value.website) : "";
  const references = value.references.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (references.length > 5) throw new Error("Agrega hasta cinco referencias, una por línea.");
  request.references = [...new Set(references.map(normalizeDemoUrl))].join("\n");
  if (request.references.length > 1000) throw new Error("Los enlaces de referencia son demasiado largos.");
  return request;
}

export function formatDemoWhatsApp(value: DemoRequest) {
  const request = validateDemoRequest(value);
  return [
    "Solicitud de sitio · AionSite",
    `Nombre: ${request.name}`,
    `Negocio: ${request.business}`,
    `Servicio: ${request.service}`,
    `Plataforma: ${request.platform}`,
    `Sitio actual: ${request.website || 'Sin sitio web'}`,
    `Objetivo: ${request.goal}`,
    `Referencias: ${request.references.split('\n').filter(Boolean).join(' | ') || 'Por definir'}`,
    `Notas: ${request.notes || 'Sin notas adicionales'}`,
  ].join("\n");
}

export function parseDemoWhatsApp(message: string): DemoRequest {
  const read = (label: string) => message.match(new RegExp(`^${label}: (.*)$`, 'm'))?.[1]?.trim() || "";
  if (!message.trim().startsWith("Solicitud de sitio · AionSite")) throw new Error("Pega la solicitud completa enviada desde el formulario de AionSite.");
  const website = read("Sitio actual");
  const references = read("Referencias");
  return validateDemoRequest({
    name: read("Nombre"), business: read("Negocio"), service: read("Servicio"),
    platform: read("Plataforma") || 'Necesito asesoría',
    website: website === 'Sin sitio web' ? '' : website,
    goal: read("Objetivo"), references: references === 'Por definir' ? '' : references.split(' | ').join('\n'),
    notes: read("Notas") === 'Sin notas adicionales' ? '' : read("Notas"),
  });
}

export function formatDemoCommand(value: DemoRequest) {
  const request = validateDemoRequest(value);
  const brief = [
    `Nombre: ${request.name}`, `Negocio: ${request.business}`, `Servicio: ${request.service}`,
    `Plataforma: ${request.platform}`,
    `Objetivo: ${request.goal}`, `Notas: ${request.notes || 'Sin notas adicionales'}`,
    "Criterio UI/UX: define audiencia, acción principal, jerarquía y recorrido móvil. Deriva decisiones concretas de las referencias y usa contenido y recursos reales del cliente; evita composiciones genéricas, métricas o productos inventados.",
    "Criterio de desarrollo: respeta la plataforma elegida; identifica componentes, estados, accesibilidad, rendimiento y límites de integración. Si la plataforma no está definida, déjala pendiente. No confundas una imagen conceptual con un sitio probado.",
    "Prepara dos propuestas visuales. Espera mi elección antes de desarrollar. No publiques ni envíes mensajes.",
  ];
  return ['$aionsite-demo', '', '#scrapling', request.website, '', '#cloner', request.references, '', '#brief', ...brief].join('\n');
}

export function demoRequestFilename(value: DemoRequest) {
  const slug = value.business.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64) || 'negocio';
  return `solicitud-${slug}.txt`;
}

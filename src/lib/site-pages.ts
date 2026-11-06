import data from "@/src/data/site-pages.json";

export type SitePage = { id: string; name: string; displayName: string; title: string; sourcePath: string; path: string; aliases: string[]; parentId?: string | null };
export const sitePages = data as SitePage[];

export function normalizePagePath(value: string) {
  const clean = value.trim();
  if (clean === "/") return "/";
  if (clean.length > 90 || !/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\/?$/.test(clean)) throw new Error("Usa una URL como /estilos/mi-estilo/, sin espacios, parámetros ni dominios.");
  if (/^\/(admin|api|demos|_next|404|500|sitemap|robots)(\/|$)/.test(clean)) throw new Error("Esa URL está reservada.");
  return `/${clean.split('/').filter(Boolean).join('/')}/`;
}

function pageMatch(pathname: string, pages = sitePages) {
  return pages.flatMap((page) => [page.sourcePath, page.path, ...page.aliases].map((base) => ({ page, base })))
    .filter(({ base }) => base === '/' ? pathname === '/' : pathname === base.replace(/\/$/, '') || pathname.startsWith(base))
    .sort((a, b) => b.base.length - a.base.length)[0];
}

function matchingPage(pathname: string, pages = sitePages) {
  return pageMatch(pathname, pages)?.page;
}

export function getSitePage(id: string) {
  const page = sitePages.find((entry) => entry.id === id);
  if (!page) throw new Error(`Página desconocida: ${id}`);
  return page;
}

export function resolvePageHref(href: string, pages = sitePages) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const url = new URL(href, 'https://aionsite.invalid');
  const match = pageMatch(url.pathname, pages);
  if (!match) return href;
  const { page, base } = match;
  const suffix = base === '/' ? '' : url.pathname.slice(base.replace(/\/$/, '').length).replace(/^\//, '');
  return `${page.path}${suffix}${url.search}${url.hash}`;
}

export function resolvePageNavigation(items: {name: string; href: string}[]) {
  return items.map((item) => {
    const page = item.href.startsWith('/') && !item.href.includes('#') ? matchingPage(new URL(item.href, 'https://aionsite.invalid').pathname) : undefined;
    return { ...item, name: page?.displayName || item.name, href: resolvePageHref(item.href) };
  });
}

export function managedRoute(pathname: string, pages = sitePages) {
  const page = matchingPage(pathname, pages);
  if (!page || page.path === '/') return null;
  const canonical = resolvePageHref(pathname, pages);
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (canonical !== pathname && canonical !== normalized) return { action: 'redirect' as const, path: canonical };
  if (page.path !== page.sourcePath && normalized.startsWith(page.path)) return { action: 'rewrite' as const, path: page.sourcePath + normalized.slice(page.path.length) };
  return null;
}

export function validateSitePages(input: unknown, current: SitePage[]) {
  if (!Array.isArray(input) || input.length !== current.length) throw new Error("La lista debe conservar todas las páginas existentes.");
  const result: SitePage[] = current.map((original) => {
    const page = input.find((entry) => entry && typeof entry === 'object' && entry.id === original.id);
    if (!page) throw new Error(`Falta la página ${original.name}.`);
    for (const key of ['name', 'displayName', 'title', 'path']) if (typeof page[key] !== 'string') throw new Error('Hay campos inválidos.');
    const name = page.name.trim();
    const displayName = page.displayName.trim();
    const title = page.title.trim();
    if (!name || !displayName || name.length > 80 || displayName.length > 60 || title.length > 160 || /[<>\r\n]/.test(name + displayName + title)) throw new Error('Revisa los nombres y títulos de las páginas.');
    const path = normalizePagePath(page.path);
    const parentId = page.parentId === undefined ? original.parentId ?? null : page.parentId;
    if (parentId !== null && (typeof parentId !== 'string' || !current.some(entry => entry.id === parentId))) throw new Error('Selecciona una página padre existente.');
    if (parentId === original.id || (original.sourcePath === '/' && parentId !== null)) throw new Error('Revisa la página padre: Inicio debe ser raíz y ninguna página puede ser su propia hija.');
    if (original.sourcePath === '/' && path !== '/') throw new Error('La página de inicio debe conservar la URL /.');
    return { ...original, name, displayName, title, path, parentId, aliases: [...new Set([...original.aliases, ...(original.path !== path ? [original.path] : [])])].filter((alias) => alias !== path && alias !== original.sourcePath) };
  });
  const owners = new Map<string, string>();
  for (const page of result) {
    const visited = new Set<string>();
    let cursor: SitePage | undefined = page;
    while (cursor) {
      if (visited.has(cursor.id)) throw new Error('La jerarquía contiene un ciclo entre páginas padre e hijas.');
      visited.add(cursor.id);
      cursor = result.find(entry => entry.id === cursor?.parentId);
    }
  }
  for (const page of result) for (const candidate of [page.path, page.sourcePath, ...page.aliases]) {
    if (owners.has(candidate) && owners.get(candidate) !== page.id) throw new Error(`La URL ${candidate} ya pertenece a otra página.`);
    owners.set(candidate, page.id);
  }
  return result;
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { sitePages, validateSitePages, type SitePage } from "@/src/lib/site-pages";

const inputStyle = 'mt-2 w-full min-w-0 rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-300';

export function PagesDashboard() {
  const [pages, setPages] = useState<SitePage[]>(sitePages);
  const [version, setVersion] = useState('');
  const [selected, setSelected] = useState('quote');
  const [status, setStatus] = useState('Cargando configuración guardada…');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const page = pages.find((entry) => entry.id === selected) || pages[0];
  function descendants(id: string): string[] {
    return pages.filter(entry => entry.parentId === id).flatMap(entry => [entry.id, ...descendants(entry.id)]);
  }
  const unavailableParents = new Set([page.id, ...descendants(page.id)]);
  const query = search.trim().toLocaleLowerCase('es');
  function matches(entry: SitePage): boolean {
    return `${entry.name} ${entry.displayName} ${entry.path}`.toLocaleLowerCase('es').includes(query) || pages.some(child => child.parentId === entry.id && matches(child));
  }
  function renderPages(parentId: string | null = null, depth = 0): React.ReactNode {
    return pages.filter(entry => (entry.parentId ?? null) === parentId && (!query || matches(entry))).map(entry => {
      const children = pages.filter(child => child.parentId === entry.id);
      const expanded = !!query || !collapsed.includes(entry.id);
      return <li key={entry.id} className="min-w-0">
        <div className="flex min-w-0 items-center gap-1">
          {children.length > 0 ? <button type="button" aria-label={`${expanded ? 'Contraer' : 'Expandir'} ${entry.name}`} aria-expanded={expanded} onClick={() => setCollapsed(current => current.includes(entry.id) ? current.filter(id => id !== entry.id) : [...current, entry.id])} className="h-9 w-8 shrink-0 rounded-lg text-slate-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300">{expanded ? '−' : '+'}</button> : <span className="w-8 shrink-0" aria-hidden="true"/>}
          <button type="button" aria-current={entry.id === selected ? 'page' : undefined} onClick={() => setSelected(entry.id)} className={`min-w-0 flex-1 rounded-xl border px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 ${entry.id === selected ? 'border-blue-400/50 bg-blue-500/15 text-white' : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5'}`}>
            <span className="block break-words text-sm font-medium">{entry.name}</span>
            <span className="mt-1 block break-all text-xs text-slate-400">{entry.path}</span>
            {children.length > 0 && <span className="mt-1 block text-xs text-blue-200">{children.length} {children.length === 1 ? 'página hija' : 'páginas hijas'}</span>}
          </button>
        </div>
        {children.length > 0 && expanded && <ul className={`mt-1 space-y-1 border-l border-white/15 ${depth < 2 ? 'ml-4 pl-2' : 'ml-1 pl-1'}`}>{renderPages(entry.id, depth + 1)}</ul>}
      </li>;
    });
  }

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/pages', {cache:'no-store'}).then(async (response) => {
      if (!response.ok) throw new Error('El guardado requiere Admin en un servidor local autenticado. En el sitio estático puedes exportar tu configuración.');
      const data = await response.json();
      if (!cancelled) {setPages(data.pages);setVersion(data.version);setStatus('Configuración cargada.');}
    }).catch((error) => {if (!cancelled) setStatus(error.message);});
    return () => {cancelled = true;};
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {if(dirty) {event.preventDefault();event.returnValue='';}};
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function update(key: 'name'|'displayName'|'title'|'path'|'parentId', value: string) {
    setPages((current) => current.map((entry) => entry.id === page.id ? {...entry,[key]:key === 'parentId' ? value || null : value} : entry));
    setDirty(true);setStatus('Cambios pendientes de guardar.');
  }

  async function save() {
    setSaving(true);
    try {
      const normalized = validateSitePages(pages, sitePages);
      if (!version) throw new Error('No hay conexión de guardado. Exporta la configuración o abre Admin en tu servidor local.');
      const response = await fetch('/api/admin/pages', {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({pages:normalized,version})});
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo guardar.');
      setPages(data.pages);setVersion(data.version);setDirty(false);setStatus('Guardado en archivo. En desarrollo, recarga para ver los cambios. Para producción, compila y publica.');
    } catch(error) {setStatus(error instanceof Error ? error.message : 'No se pudo guardar.');}
    finally {setSaving(false);}
  }

  function download() {
    try {
      const config = validateSitePages(pages, sitePages);
      const url = URL.createObjectURL(new Blob([JSON.stringify(config,null,2)], {type:'application/json'}));
      const link=document.createElement('a');link.href=url;link.download='site-pages.json';link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus('Archivo exportado. Conserva los cambios en src/data/site-pages.json para la siguiente compilación.');
    } catch(error) {setStatus(error instanceof Error ? error.message : 'Revisa los cambios.');}
  }

  return <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
    <section className="min-w-0 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <h3 className="text-lg font-semibold text-white">Páginas del sitio</h3>
      <label htmlFor="managed-page-search" className="mt-5 block text-sm text-slate-300">Buscar página o URL</label>
      <input id="managed-page-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Nombre o /dirección/" className={inputStyle}/>
      <nav aria-label="Jerarquía de páginas" className="mt-4 max-h-[36rem] overflow-y-auto rounded-xl border border-white/10 p-2"><ul className="space-y-1">{renderPages()}</ul>{!pages.some(matches) && <p className="p-3 text-sm text-slate-400">No hay páginas que coincidan.</p>}</nav>
      <p className="mt-5 text-sm leading-relaxed text-slate-400">Cambia el nombre interno, la etiqueta de navegación, el título del navegador y la URL. Las rutas anteriores se conservan como redirecciones.</p>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">Los cambios de URL y título se publican con la siguiente compilación y despliegue. La página de inicio conserva /.</p>
    </section>
    <section className="min-w-0 space-y-5 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
      <h3 className="break-words text-xl font-semibold text-white">Editar {page.name}</h3>
      <label htmlFor="page-parent" className="block text-sm text-slate-200">Página padre<select id="page-parent" value={page.parentId ?? ''} disabled={page.sourcePath === '/'} onChange={event => update('parentId', event.target.value)} className={inputStyle}><option value="">Sin padre · página principal</option>{pages.filter(entry => !unavailableParents.has(entry.id)).map(entry => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select><span className="mt-2 block text-xs leading-relaxed text-slate-400">Organiza las páginas visualmente. La URL se edita por separado.</span></label>
      <label htmlFor="page-name" className="block text-sm text-slate-200">Nombre en Admin<input id="page-name" value={page.name} onChange={(e)=>update('name',e.target.value)} maxLength={80} className={inputStyle}/></label>
      <label htmlFor="page-display" className="block text-sm text-slate-200">Nombre a mostrar en los menús<input id="page-display" value={page.displayName} onChange={(e)=>update('displayName',e.target.value)} maxLength={60} className={inputStyle}/></label>
      <label htmlFor="page-path" className="block text-sm text-slate-200">URL de la página<input id="page-path" value={page.path} disabled={page.sourcePath==='/'} onChange={(e)=>update('path',e.target.value)} maxLength={90} placeholder="/mi-pagina/" className={inputStyle}/></label>
      <label htmlFor="page-title" className="block text-sm text-slate-200">Título del navegador<input id="page-title" value={page.title} onChange={(e)=>update('title',e.target.value)} maxLength={160} placeholder="Vacío: conservar el título actual" className={inputStyle}/></label>
      <div className="flex flex-wrap gap-3"><Button type="button" disabled={saving || !dirty || !version} onClick={save}>{saving?'Guardando…':'Guardar páginas'}</Button><Button type="button" variant="outline" onClick={download}>Exportar configuración</Button></div>
      <p role="status" className="break-words text-sm leading-relaxed text-blue-200">{status}</p>
      <a href={page.path} target="_blank" rel="noopener noreferrer" className="inline-block break-all text-sm text-blue-300 underline">Abrir {page.path}</a>
      {['home','conoceme'].includes(page.id)&&<a href="/admin/content/" className="ml-4 inline-block text-sm text-blue-300 underline">Editar contenido</a>}
    </section>
  </div>;
}

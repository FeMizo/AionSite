"use client";

import { useState } from "react";
import { resolvePageHref } from "@/src/lib/site-pages";
import catalog from "@/examples/aionsite/catalog.json";

const asset = (path: string) => `/api/admin/demo-examples/${path}`;

export function DemoExamplesGallery() {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [command, setCommand] = useState("");
  const proposals = catalog.proposals.filter((item) => `${item.number} ${item.title} ${item.description} ${item.tags.join(" ")}`.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es")));

  function prepare(ids: string[]) {
    const items = catalog.proposals.filter((item) => ids.includes(item.id));
    if (!items.length) return;
    const names = items.map((item) => `Propuesta ${item.number}, revisión ${item.revision}`).join("; ");
    setCommand(`$aionsite-demo\n\n#brief\nReferencias internas: ${names}.\nConsulta examples/aionsite/catalog.json del proyecto AionSite.\n${items.length === 1 ? "Adapta esta propuesta al negocio y conserva su intención visual." : "Combina las secciones que mejor respondan al objetivo en una sola página con una identidad coherente."}\nConserva los originales. Reemplaza marca, textos, recursos y enlaces con datos del cliente.\nNo publiques ni envíes mensajes.\n\nNegocio: [completar]\nObjetivo: [completar]\nPlataforma: [por definir]\nContenido y necesidades: [completar]\n`);
    setStatus("Instrucción preparada. Completa los datos del cliente y pégala en Codex.");
  }

  async function copy() {
    try { await navigator.clipboard.writeText(command); setStatus("Copiado. Pégalo en el chat de Codex y completa el brief."); }
    catch { setStatus("Selecciona y copia el texto de la instrucción."); }
  }

  const button = "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300";

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <label className="block w-full max-w-md text-sm text-slate-300">Buscar ejemplos
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Propuesta, galería, hero, proceso…" className="mt-2 min-h-11 w-full rounded-xl border border-white/20 bg-slate-900 px-4 text-white focus:outline-2 focus:outline-blue-300" />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-300" aria-live="polite">{selected.length} seleccionadas</span>
        <button className={`${button} bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40`} disabled={!selected.length} onClick={() => prepare(selected)}>Preparar combinación</button>
        {selected.length > 0 && <button className={button} onClick={() => setSelected([])}>Limpiar</button>}
      </div>
    </div>
    <p className="text-sm leading-6 text-slate-400">Siete propuestas editables. La dirección visual de las opciones 4 a 7 está aprobada como referencia. Seleccionar aquí prepara una instrucción; no genera ni publica un sitio.</p>
    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {proposals.map((item) => <article key={item.id} className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55">
        <a href={resolvePageHref(item.viewPath)} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300" aria-label={`Ver propuesta ${item.number}: ${item.title}`}>
          {/* The previews are private images served by the authenticated asset route. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(item.thumbnail)} alt={`Vista de la propuesta ${item.number}`} loading="lazy" width={1440} height={900} className="aspect-[16/10] w-full border-b border-white/10 object-cover object-top" />
        </a>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap justify-between gap-2 text-xs text-blue-200"><span>Propuesta {item.number} · Revisión {item.revision}</span>{item.approvedDirection && <span>Dirección aprobada</span>}</div>
          <h3 className="break-words text-xl font-semibold text-white">{item.title}</h3>
          <p className="text-sm leading-6 text-slate-400">{item.description}</p>
          <div className="flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{tag}</span>)}</div>
          <div className="flex flex-wrap gap-2"><a className={button} href={resolvePageHref(item.viewPath)} target="_blank" rel="noopener noreferrer">Ver propuesta ↗</a><button className={button} onClick={() => prepare([item.id])}>Usar como base</button></div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={selected.includes(item.id)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id))} className="h-5 w-5 accent-blue-500" />Combinar secciones de la propuesta {item.number}</label>
        </div>
      </article>)}
    </div>
    {proposals.length === 0 && <p className="rounded-2xl border border-white/10 p-5 text-slate-300">No hay ejemplos con esa búsqueda.</p>}
    {command && <section className="space-y-4 rounded-3xl border border-blue-400/30 bg-slate-950/60 p-5" aria-labelledby="example-command-title"><h3 id="example-command-title" className="text-xl font-semibold">Instrucción para Codex</h3><label className="block text-sm text-slate-300">Completa y ajusta el mensaje<textarea value={command} onChange={(event) => setCommand(event.target.value)} rows={14} className="mt-3 w-full rounded-xl border border-white/20 bg-slate-900 p-4 text-sm leading-6 text-white" /></label><button className={`${button} bg-blue-600`} onClick={copy}>Copiar instrucción</button></section>}
    <p role="status" aria-live="polite" className="text-sm text-blue-200">{status}</p>
  </div>;
}

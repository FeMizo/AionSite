"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, LoaderCircle, Plus, Save, Search, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { loadProspectsFromBrowser, loadProspectsFromFile, saveProspects, saveProspectsToBrowser } from "@/src/prospects/browser-storage";
import { prospectStatuses, type ProspectRecord, type ProspectStatus, type ProspectsContent } from "@/src/prospects/types";

const blankProspect = (): ProspectRecord => {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), name: "Nuevo prospecto", location: "Ciudad del Carmen", website: "", phone: "", facebook: "", instagram: "", status: "por visitar", notes: "", createdAt: now, updatedAt: now };
};

const PROSPECTS_PER_PAGE = 10;

function linkLabel(value: string) {
  if (!value) return "No localizado";
  return value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ProspectsDashboard({ initialContent }: { initialContent: ProspectsContent }) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Todas");
  const [status, setStatus] = useState<ProspectStatus | "todos">("todos");
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const browserContent = loadProspectsFromBrowser();
    setContent(browserContent);
    loadProspectsFromFile().then((fileContent) => { if (fileContent) { setContent(fileContent); saveProspectsToBrowser(fileContent); } });
  }, []);

  const locations = useMemo(() => ["Todas", ...Array.from(new Set(content.prospects.map((prospect) => prospect.location)))], [content.prospects]);
  const filteredProspects = useMemo(() => content.prospects.filter((prospect) => {
    const haystack = [prospect.name, prospect.location, prospect.phone, prospect.notes].join(" ").toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (location === "Todas" || prospect.location === location) && (status === "todos" || prospect.status === status);
  }), [content.prospects, location, query, status]);
  const pageCount = Math.max(1, Math.ceil(filteredProspects.length / PROSPECTS_PER_PAGE));
  const visibleProspects = filteredProspects.slice((page - 1) * PROSPECTS_PER_PAGE, page * PROSPECTS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [query, location, status]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount));
  }, [pageCount]);

  function updateProspect(id: string, patch: Partial<ProspectRecord>) {
    setContent((current) => ({ prospects: current.prospects.map((prospect) => prospect.id === id ? { ...prospect, ...patch, updatedAt: new Date().toISOString() } : prospect) }));
    setSavedMessage("");
  }

  function removeProspect(id: string) {
    const prospect = content.prospects.find((entry) => entry.id === id);
    if (!prospect || !window.confirm(`¿Eliminar ${prospect.name}?`)) return;
    setContent((current) => ({ prospects: current.prospects.filter((entry) => entry.id !== id) }));
    setSavedMessage("");
  }

  async function persist() {
    setSaving(true);
    const result = await saveProspects(content);
    setContent(result.content);
    setSaving(false);
    setSavedMessage(result.persistedToFile ? "Guardado en archivo y navegador" : "Guardado en este navegador");
  }

  function addProspect() {
    setContent((current) => ({ prospects: [blankProspect(), ...current.prospects] }));
    setSavedMessage("");
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {["todos", ...prospectStatuses].map((item) => <div key={item} className="rounded-2xl border border-white/8 bg-slate-950/45 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item === "todos" ? "Total" : item}</p><p className="mt-2 text-2xl font-semibold text-white">{item === "todos" ? content.prospects.length : content.prospects.filter((prospect) => prospect.status === item).length}</p></div>)}
      </div>

      <div className="rounded-[2rem] border border-white/8 bg-slate-950/45 p-4 shadow-xl backdrop-blur sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-500" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar prospecto..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-400/60" /></label>
            <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none"><option value="Todas">Todas las ubicaciones</option>{locations.slice(1).map((item) => <option key={item}>{item}</option>)}</select>
            <select value={status} onChange={(event) => setStatus(event.target.value as ProspectStatus | "todos")} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none"><option value="todos">Todos los estados</option>{prospectStatuses.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
          <div className="flex gap-2"><Button onClick={addProspect} variant="secondary"><Plus size={16} /> Añadir</Button><Button onClick={persist} disabled={saving}><Save size={16} /> {saving ? "Guardando..." : "Guardar"}</Button></div>
        </div>
        {savedMessage && <p className="mt-3 text-sm text-emerald-300">{savedMessage}</p>}

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/8">
          <table className="min-w-[1100px] w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-slate-400"><tr><th className="px-4 py-3">Nombre</th><th className="px-4 py-3">Lugar</th><th className="px-4 py-3">Website</th><th className="px-4 py-3">Teléfono</th><th className="px-4 py-3">Redes sociales</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Acciones</th></tr></thead>
            <tbody className="divide-y divide-white/8">
              {visibleProspects.map((prospect) => <tr key={prospect.id} className="align-top hover:bg-white/[0.03]">
                <td className="px-4 py-3"><input value={prospect.name} onChange={(event) => updateProspect(prospect.id, { name: event.target.value })} className="w-44 rounded-lg border border-white/10 bg-transparent px-2 py-1.5 text-white outline-none focus:border-blue-400/60" /></td>
                <td className="px-4 py-3"><input value={prospect.location} onChange={(event) => updateProspect(prospect.id, { location: event.target.value })} className="w-32 rounded-lg border border-white/10 bg-transparent px-2 py-1.5 text-slate-300 outline-none focus:border-blue-400/60" /></td>
                <td className="px-4 py-3">{prospect.website ? <a href={prospect.website} target="_blank" rel="noreferrer" className="inline-flex max-w-40 items-center gap-1 truncate text-blue-300 hover:text-white" title={prospect.website}>{linkLabel(prospect.website)} <ExternalLink size={13} /></a> : <span className="text-slate-500">No localizado</span>}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-300">{prospect.phone || "No localizado"}</td>
                <td className="px-4 py-3"><div className="flex max-w-48 flex-col gap-1">{prospect.facebook ? <a href={prospect.facebook} target="_blank" rel="noreferrer" className="truncate text-blue-300 hover:text-white">Facebook</a> : <span className="text-slate-500">Facebook no localizado</span>}{prospect.instagram ? <a href={prospect.instagram} target="_blank" rel="noreferrer" className="truncate text-pink-300 hover:text-white">Instagram</a> : <span className="text-slate-500">Instagram no localizado</span>}</div></td>
                <td className="px-4 py-3"><select value={prospect.status} onChange={(event) => updateProspect(prospect.id, { status: event.target.value as ProspectStatus })} className="rounded-lg border border-white/10 bg-slate-900 px-2 py-1.5 text-xs text-white outline-none">{prospectStatuses.map((item) => <option key={item}>{item}</option>)}</select></td>
                <td className="px-4 py-3"><button onClick={() => removeProspect(prospect.id)} className="rounded-lg p-2 text-rose-300 transition hover:bg-rose-500/15 hover:text-rose-200" title="Eliminar prospecto"><Trash2 size={16} /></button></td>
              </tr>)}
            </tbody>
          </table>
          {filteredProspects.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No hay prospectos con estos filtros.</div>}
        </div>
        {filteredProspects.length > PROSPECTS_PER_PAGE && <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>Mostrando {(page - 1) * PROSPECTS_PER_PAGE + 1}–{Math.min(page * PROSPECTS_PER_PAGE, filteredProspects.length)} de {filteredProspects.length}</span><div className="flex items-center gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40">Anterior</button><span>Página {page} de {pageCount}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button></div></div>}
        <p className="mt-3 text-xs text-slate-500">Los cambios se guardan al pulsar Guardar. En despliegues estáticos se conserva una copia en este navegador.</p>
      </div>
    </section>
  );
}

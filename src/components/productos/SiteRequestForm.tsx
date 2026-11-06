"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy, Download } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/whatsapp";
import { Button } from "@/src/components/ui/Button";
import { demoRequestFilename, emptyDemoRequest, formatDemoWhatsApp, type DemoRequest } from "@/src/lib/demo-request";

const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-blue-300 focus:ring-2 focus:ring-blue-300/20";

export function SiteRequestForm() {
  const [request, setRequest] = useState<DemoRequest>(emptyDemoRequest);
  const [prepared, setPrepared] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  function update(key: keyof DemoRequest, value: string) {
    setRequest((current) => ({ ...current, [key]: value }));
    setPrepared("");
    setError("");
    setCopied(false);
    setDownloaded(false);
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { setPrepared(formatDemoWhatsApp(request)); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Revisa los datos del formulario."); }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(prepared); setCopied(true); }
    catch { setError("No se pudo copiar. Selecciona el resumen o descarga tu solicitud."); }
  }

  async function download() {
    const filename = demoRequestFilename(request);
    const picker = (window as unknown as { showSaveFilePicker?: (options: { suggestedName: string; types: { description: string; accept: Record<string, string[]> }[] }) => Promise<{ createWritable: () => Promise<{ write: (text: string) => Promise<void>; close: () => Promise<void> }> }> }).showSaveFilePicker;
    try {
      if (picker) {
        const handle = await picker.call(window, { suggestedName: filename, types: [{ description: "Solicitud de texto", accept: { "text/plain": [".txt"] } }] });
        const file = await handle.createWritable();
        await file.write(prepared);
        await file.close();
      } else {
        const link = document.createElement("a");
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(prepared)}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      setDownloaded(true);
      setError("");
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError("El navegador no permitió guardar. Abre esta página en Chrome o Edge, o usa Copiar mensaje.");
    }
  }

  return (
    <form onSubmit={prepare} className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-slate-200" htmlFor="demo-name">Tu nombre *
          <input id="demo-name" name="name" autoComplete="name" required maxLength={80} className={inputClass} value={request.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="text-sm text-slate-200" htmlFor="demo-business">Nombre del negocio *
          <input id="demo-business" name="business" autoComplete="organization" required maxLength={100} className={inputClass} value={request.business} onChange={(e) => update("business", e.target.value)} />
        </label>
      </div>
      <label className="block text-sm text-slate-200" htmlFor="demo-service">¿Qué necesitas?
        <select id="demo-service" name="service" className={inputClass} value={request.service} onChange={(e) => update("service", e.target.value)}>
          <option>Sitio web</option><option>Tienda online</option><option>Rediseño de mi sitio</option><option>Todavía no lo sé</option>
        </select>
      </label>
      <label className="block text-sm text-slate-200" htmlFor="demo-platform">¿En qué plataforma quieres tu sitio?
        <select id="demo-platform" name="platform" className={inputClass} value={request.platform} onChange={(e) => update("platform", e.target.value)}>
          <option>Necesito asesoría</option><option>WordPress / WooCommerce</option><option>Shopify</option><option>Código personalizado</option>
        </select>
      </label>
      <label className="block text-sm text-slate-200" htmlFor="demo-website">Sitio actual <span className="text-slate-400">(opcional)</span>
        <input id="demo-website" name="website" autoComplete="url" inputMode="url" maxLength={250} placeholder="tunegocio.com" className={inputClass} value={request.website} onChange={(e) => update("website", e.target.value)} />
        <span className="mt-2 block text-xs text-slate-400">Si todavía no tienes web, déjalo vacío.</span>
      </label>
      <label className="block text-sm text-slate-200" htmlFor="demo-goal">¿Qué te gustaría conseguir? *
        <textarea id="demo-goal" name="goal" required maxLength={1000} rows={4} placeholder="Cuéntanos qué vendes, a quién y qué debería lograr tu sitio." className={inputClass} value={request.goal} onChange={(e) => update("goal", e.target.value)} />
      </label>
      <label className="block text-sm text-slate-200" htmlFor="demo-references">Sitios que te gustan <span className="text-slate-400">(opcional)</span>
        <textarea id="demo-references" name="references" maxLength={1000} rows={3} placeholder={"https://referencia.com\nUn enlace por línea, hasta cinco."} className={inputClass} value={request.references} onChange={(e) => update("references", e.target.value)} />
      </label>
      <label className="block text-sm text-slate-200" htmlFor="demo-notes">Algo más que debamos saber <span className="text-slate-400">(opcional)</span>
        <textarea id="demo-notes" name="notes" maxLength={500} rows={2} placeholder="Estilo, colores, secciones o fechas importantes." className={inputClass} value={request.notes} onChange={(e) => update("notes", e.target.value)} />
      </label>
      {error && <p role="alert" className="rounded-xl border border-red-400/30 p-3 text-sm text-red-200">{error}</p>}
      <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">Revisar mi solicitud <ArrowRight size={18} aria-hidden="true" /></Button>
      <p className="text-xs leading-relaxed text-slate-400">Revisar prepara tu mensaje. Solo recibiremos tus datos cuando lo envíes en WhatsApp. Consulta nuestra <a className="underline" href="/privacidad/">política de privacidad</a>.</p>
      {prepared && <section aria-label="Resumen de tu solicitud" aria-live="polite" className="space-y-4 border-t border-white/15 pt-6">
        <h2 className="text-xl font-semibold text-white">Tu solicitud está lista para revisar.</h2>
        <pre className="whitespace-pre-wrap break-words rounded-xl bg-slate-950/70 p-4 font-sans text-sm leading-relaxed text-slate-300">{prepared}</pre>
        <a className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-400 px-6 py-3 font-semibold text-slate-950 hover:bg-blue-300 sm:w-auto" href={getWhatsAppLink(prepared)} target="_blank" rel="noopener noreferrer">Continuar en WhatsApp <ArrowRight size={18} aria-hidden="true" /></a>
        <p className="text-sm text-slate-400">WhatsApp abrirá el mensaje. Pulsa Enviar allí para hacérnoslo llegar. Después revisaremos tu proyecto contigo.</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" onClick={copy} className="gap-2">{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copiado" : "Copiar mensaje"}</Button>
          <Button type="button" variant="secondary" onClick={download} className="gap-2"><Download size={16} /> Guardar solicitud</Button>
        </div>
        {downloaded && <p role="status" className="break-words text-sm text-blue-200">Archivo: {demoRequestFilename(request)}. Revisa la ubicación elegida o las descargas del navegador (Ctrl + J). Si usas el visor de Codex y no aparece, abre el formulario en Chrome o Edge.</p>}
      </section>}
    </form>
  );
}

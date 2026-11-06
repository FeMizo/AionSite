"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { demoRequestFilename, formatDemoCommand, parseDemoWhatsApp } from "@/src/lib/demo-request";

export function DemoRequestDashboard() {
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [filename, setFilename] = useState("solicitud-negocio.txt");
  const [status, setStatus] = useState("");

  function prepare() {
    try {
      const request = parseDemoWhatsApp(message);
      setCommand(formatDemoCommand(request));
      setFilename(demoRequestFilename(request));
      setStatus(request.references ? "Lista para copiar a Codex." : "Agrega referencias bajo #cloner antes de iniciar el diseño.");
    } catch (cause) {
      setCommand("");
      setStatus(cause instanceof Error ? cause.message : "No se pudo preparar la solicitud.");
    }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(command); setStatus("Copiado. Pégalo en un chat de Codex del proyecto AionSite."); }
    catch { setStatus("No se pudo copiar. Selecciona el comando o descarga el archivo."); }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([command], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="space-y-8">
    <section className="rounded-3xl border border-white/10 bg-slate-950/50 p-6">
      <h3 className="text-xl font-semibold text-white">De WhatsApp a tu propuesta</h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">El cliente envía su solicitud desde el formulario. Copia el mensaje completo de WhatsApp aquí; después pega el comando generado en un chat de Codex de AionSite.</p>
      <a className="mt-4 inline-flex items-center gap-2 text-sm text-blue-300 underline" href="/solicitar-sitio/" target="_blank" rel="noopener noreferrer">Abrir formulario del cliente <ArrowUpRight size={16} /></a>
      <label htmlFor="demo-inbound" className="mt-6 block text-sm text-slate-200">Solicitud recibida por WhatsApp</label>
      <textarea id="demo-inbound" rows={10} maxLength={5000} value={message} onChange={(e) => { setMessage(e.target.value); setCommand(""); setStatus(""); }} placeholder="Solicitud de sitio · AionSite…" className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300/20" />
      <Button type="button" onClick={prepare} className="mt-4">Preparar para Codex</Button>
      {status && <p role="status" className="mt-4 text-sm text-blue-200">{status}</p>}
      {command && <div className="mt-6 space-y-4">
        <label htmlFor="demo-command" className="block text-sm text-slate-200">Comando editable — agrega tus referencias si hace falta</label>
        <textarea id="demo-command" rows={15} value={command} onChange={(e) => setCommand(e.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-blue-300" />
        <div className="flex flex-wrap gap-3"><Button type="button" onClick={copy} className="gap-2"><Copy size={16} /> Copiar comando</Button><Button type="button" variant="secondary" onClick={download} className="gap-2"><Download size={16} /> Descargar solicitud</Button></div>
      </div>}
    </section>
    <section className="rounded-3xl border border-white/10 p-6 text-sm leading-relaxed text-slate-300">
      <h3 className="text-lg font-semibold text-white">Dónde queda cada cosa</h3>
      <ul className="mt-4 list-inside list-disc space-y-3"><li>La solicitud enviada queda en tu conversación de WhatsApp.</li><li>Este panel solo prepara el comando en la pestaña actual; no guarda solicitudes en el servidor ni en el CRM.</li><li>Al ejecutar la habilidad en Codex, se guardan brief, datos, referencias y propuestas en <code className="break-all">C:\Users\mizo_\.codex\aionsite-demos\negocio\fecha-id\</code>.</li><li>Elige A o B para desarrollar. La demo queda en su carpeta independiente y se publica solo cuando lo solicites.</li></ul>
    </section>
  </div>;
}

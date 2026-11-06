"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type Prompt = { id: string; name: string; prompt: string };
const PromptContext = createContext<{ open: (id: string, name: string) => void }>({ open: () => {} });

export function StylePromptProvider({ children }: { children: React.ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [active, setActive] = useState<Prompt | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [access, setAccess] = useState("loading");
  const activePrompt = prompts.find((item) => item.id === active?.id);
  const dialog = useRef<HTMLDialogElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/style-prompts", { signal: controller.signal, cache: "no-store", credentials: "same-origin" })
      .then(async (response) => {
        if (response.ok) return response.json();
        if (!controller.signal.aborted) setAccess(response.status === 401 || response.status === 403 ? "login" : "error");
        return null;
      })
      .then((data) => { if (data?.prompts && !controller.signal.aborted) { setPrompts(data.prompts); setAccess("ready"); } })
      .catch(() => { if (!controller.signal.aborted) setAccess("error"); });
    return () => controller.abort();
  }, []);

  useEffect(() => { if (activePrompt) setText(activePrompt.prompt); }, [activePrompt]);

  useEffect(() => {
    if (!active || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [active]);

  function open(id: string, name: string) {
    const selected = prompts.find((item) => item.id === id);
    opener.current = document.activeElement as HTMLElement | null;
    setText(selected?.prompt ?? ""); setStatus(""); setActive(selected ?? { id, name, prompt: "" });
  }

  function close() {
    setActive(null);
  }

  async function copy() {
    try { await navigator.clipboard.writeText(text); setStatus("Prompt copiado. Completa el brief y pégalo en Codex."); }
    catch { textarea.current?.focus(); textarea.current?.select(); setStatus("Copia el texto seleccionado con Ctrl+C o el menú de tu dispositivo."); }
  }

  return <PromptContext.Provider value={{ open }}>{children}
    <dialog ref={dialog} className="style-prompt-dialog" aria-labelledby="style-prompt-title" aria-describedby="style-prompt-description" onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled),textarea:not(:disabled),a[href]");
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}>
      <div className="style-prompt-header"><div><span>USO INTERNO</span><h2 id="style-prompt-title">Prompt · {active?.name}</h2></div><button type="button" onClick={close} aria-label="Cerrar prompt">✕</button></div>
      <p id="style-prompt-description">Completa los datos del cliente y copia el mensaje a Codex. Este botón no genera ni publica el sitio.</p>
      {activePrompt ? <><label htmlFor="style-prompt-text">Prompt editable</label>
      <textarea id="style-prompt-text" ref={textarea} value={text} onChange={(event) => setText(event.target.value)} spellCheck={false} />
      <div className="style-prompt-actions"><button type="button" onClick={copy}>Copiar prompt</button><button type="button" onClick={close}>Cerrar</button></div>
      </> : <div className="style-prompt-access">
        <p>{access === "loading" ? "Comprobando tu acceso…" : access === "login" ? "Este prompt es de uso interno. Inicia sesión como administrador para verlo y copiarlo." : "No se pudo cargar el prompt. Comprueba que el servidor de AionSite esté disponible y recarga la página."}</p>
        {access === "login" && <a href="/admin/login?redirect=%2Festilos%2F">Iniciar sesión y volver a Estilos ↗</a>}
        {access === "error" && <button type="button" onClick={() => window.location.reload()}>Recargar página</button>}
      </div>}
      <p role="status" className="style-prompt-status">{status}</p>
    </dialog>
  </PromptContext.Provider>;
}

export function StylePromptButton({ id, name }: { id: string; name: string }) {
  const context = useContext(PromptContext);
  return <button className="style-prompt-trigger" type="button" aria-haspopup="dialog" aria-label={`Ver prompt interno de ${name}`} onClick={() => context.open(id, name)}>Ver prompt <span>Uso interno</span></button>;
}

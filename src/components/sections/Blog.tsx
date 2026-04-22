"use client";

import { useState } from "react";
import { BookOpen, Send } from "lucide-react";
import type { BlogSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Card } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/utils";

export function Blog({ data }: { data: BlogSectionData }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section id="blog" className="relative overflow-hidden bg-slate-950 pb-20 pt-28 md:pb-28 md:pt-40">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/14 blur-[130px]" />
        <div className="absolute left-1/4 top-1/3 -z-10 h-[300px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <Container className="text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-violet-300 shadow-[0_14px_28px_-20px_rgba(124,58,237,0.6)]">
            <BookOpen size={14} />
            {data.hero.badgeText}
          </div>
          <h1 className="mx-auto max-w-4xl text-display font-display font-bold text-white">
            {data.hero.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {data.hero.subtitle}
          </p>
          <div className="mt-16 flex justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
        </Container>
      </section>

      {/* 3-column content */}
      <section className="bg-slate-950 pb-28 pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr_320px] lg:items-start lg:gap-14">

            {/* Left: Table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-xl border border-white/8 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Contenido
                </p>
                <ul className="space-y-1">
                  {data.article.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={cn(
                          "flex items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-all duration-150 hover:bg-white/5 hover:text-white",
                          h.level === 2
                            ? "text-slate-300 font-medium"
                            : "pl-5 text-slate-500"
                        )}
                      >
                        <span className="mt-px shrink-0 font-mono text-xs text-blue-500/60">
                          {h.level === 2 ? "#" : "##"}
                        </span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Center: Article */}
            <article className="min-w-0">
              {data.article.blocks.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      id={block.id}
                      className="mt-14 first:mt-0 font-display text-2xl font-bold text-white md:text-3xl scroll-mt-28"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "h3") {
                  return (
                    <h3
                      key={i}
                      id={block.id}
                      className="mt-8 text-xl font-semibold text-white scroll-mt-28"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-6 border-l-2 border-blue-500 pl-5 text-slate-300 italic leading-relaxed"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="mt-4 text-slate-400 leading-[1.85]">
                    {block.text}
                  </p>
                );
              })}
            </article>

            {/* Right: Contact form */}
            <aside>
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="mb-1 font-display text-lg font-bold text-white">
                    {data.form.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    {data.form.subtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@correo.com"
                        className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">
                        Mensaje
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="¿En qué podemos ayudarte?"
                        rows={4}
                        className="w-full resize-none rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending" || status === "sent"}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-400/35 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.78)] transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      <Send size={14} />
                      {status === "sending"
                        ? "Enviando…"
                        : status === "sent"
                          ? "¡Mensaje enviado!"
                          : "Enviar mensaje"}
                    </button>

                    {status === "sent" && (
                      <p className="text-center text-xs text-green-400">
                        Nos pondremos en contacto pronto.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-center text-xs text-red-400">
                        Algo salió mal. Inténtalo de nuevo.
                      </p>
                    )}
                  </form>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

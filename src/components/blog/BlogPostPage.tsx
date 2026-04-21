"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Send } from "lucide-react";
import type { BlogPost } from "@/src/data/blog-posts";
import { initialCmsContent } from "@/src/cms/site-content";
import { Header } from "@/src/components/sections/Header";
import { Footer } from "@/src/components/sections/Footer";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";
import { cn } from "@/src/lib/utils";

const nav = mapNavigationForInnerPage(
  initialCmsContent.sections.header.data.navigation,
);
const headerData = { ...initialCmsContent.sections.header.data, navigation: nav };
const base = { ...initialCmsContent.base, navigation: nav };

export function BlogPostPage({ post }: { post: BlogPost }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: `Blog: ${post.title}` }),
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
      <Header base={base} data={headerData} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-32 md:pb-24 md:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/13 blur-[130px]" />
        <div className="absolute left-1/4 top-1/2 -z-10 h-[250px] w-[350px] rounded-full bg-blue-600/9 blur-[100px]" />
        <Container className="text-center">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft size={14} />
            Volver al blog
          </Link>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
              <BookOpen size={11} />
              {post.badgeText}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-display font-display font-bold text-white">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {post.excerpt}
          </p>
          <p className="mt-4 text-sm text-slate-600">{post.date}</p>
          <div className="mt-12 flex justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>
        </Container>
      </section>

      {/* 3-column layout */}
      <section className="bg-slate-950 pb-28 pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[200px_1fr_290px] lg:items-start lg:gap-14">

            {/* Left: TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-xl border border-white/8 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Contenido
                </p>
                <ul className="space-y-1">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={cn(
                          "flex items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-all duration-150 hover:bg-white/5 hover:text-white",
                          h.level === 2
                            ? "font-medium text-slate-300"
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
              {post.blocks.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      id={block.id}
                      className="mt-14 scroll-mt-28 font-display text-2xl font-bold text-white first:mt-0 md:text-3xl"
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
                      className="mt-8 scroll-mt-28 text-xl font-semibold text-white"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-6 border-l-2 border-blue-500 pl-5 italic leading-relaxed text-slate-300"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="mt-4 leading-[1.85] text-slate-400">
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
                    ¿Tienes un proyecto?
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    Cuéntanos qué necesitas y te respondemos en menos de 24 horas.
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

      <Footer base={base} data={initialCmsContent.sections.footer.data} />
      <WhatsAppFloatingButton data={initialCmsContent.sections.whatsappFloatingButton.data} />
    </>
  );
}

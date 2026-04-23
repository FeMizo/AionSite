"use client";

import { useState } from "react";
import { Mail, MessageCircleMore, Send, Clock, Loader2, CheckCircle2 } from "lucide-react";
import type { ContactFormSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Reveal } from "@/src/components/ui/Reveal";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormTextarea } from "@/src/components/ui/FormTextarea";

export function ContactFormSection({ data }: { data: ContactFormSectionData }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const messageWithPhone = form.phone
        ? `${form.message}\n\nTeléfono: ${form.phone}`
        : form.message;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: messageWithPhone }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-600/8 blur-[140px]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* Left */}
          <Reveal className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                {data.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                {data.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-slate-900/40 px-5 py-4 transition hover:border-blue-400/30 hover:bg-slate-900/70"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Correo</p>
                  <p className="text-sm font-medium text-white">{data.email}</p>
                </div>
              </a>

              <a
                href={data.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-slate-900/40 px-5 py-4 transition hover:border-green-400/30 hover:bg-slate-900/70"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-600/20 text-green-400">
                  <MessageCircleMore size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-500">WhatsApp</p>
                  <p className="text-sm font-medium text-white">Escríbenos directamente</p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              {data.responseText}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120}>
          <Card className="p-7">
            {status === "sent" ? (
              <div className="animate-scale-in flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15">
                  <CheckCircle2 size={28} className="text-green-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">¡Mensaje enviado!</h3>
                <p className="text-slate-400">{data.responseText}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-blue-400 underline-offset-4 hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`space-y-4 ${status === "error" ? "animate-shake" : ""}`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    label={<>Nombre <span className="text-blue-400">*</span></>}
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre"
                  />
                  <FormInput
                    label="Teléfono"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+52 000 000 0000"
                  />
                </div>

                <FormInput
                  label={<>Correo electrónico <span className="text-blue-400">*</span></>}
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@correo.com"
                />

                <FormTextarea
                  label={<>Mensaje <span className="text-blue-400">*</span></>}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={status === "sending"}
                  className="w-full rounded-lg gap-2 font-semibold disabled:cursor-not-allowed disabled:pointer-events-auto"
                >
                  {status === "sending" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  {data.responseText}
                </div>

                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Algo salió mal. Inténtalo de nuevo.
                  </p>
                )}
              </form>
            )}
          </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

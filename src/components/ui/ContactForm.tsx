"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormTextarea } from "@/src/components/ui/FormTextarea";
import { Button } from "@/src/components/ui/Button";

interface ContactFormProps {
  showPhone?: boolean;
  buttonText?: string;
  buttonSentText?: string;
  buttonSendingText?: string;
  successMessage?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function ContactForm({
  showPhone = false,
  buttonText = "Enviar mensaje",
  buttonSentText = "¡Mensaje enviado!",
  buttonSendingText = "Enviando…",
  successMessage = "Nos pondremos en contacto pronto.",
  errorMessage = "Algo salió mal. Inténtalo de nuevo.",
  children,
  onSuccess,
}: ContactFormProps) {
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
        if (onSuccess) onSuccess();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${status === "error" ? "animate-shake" : ""}`}>
      {showPhone ? (
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
      ) : (
        <FormInput
          label={<>Nombre <span className="text-blue-400">*</span></>}
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tu nombre"
        />
      )}

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
        placeholder="¿En qué podemos ayudarte?"
        rows={showPhone ? 5 : 4}
      />

      <Button
        type="submit"
        variant="primary"
        size="sm"
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-lg gap-2 font-semibold disabled:cursor-not-allowed disabled:pointer-events-auto"
      >
        {status === "sending" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Send size={14} />
        )}
        {status === "sending"
          ? buttonSendingText
          : status === "sent"
            ? buttonSentText
            : buttonText}
      </Button>

      {children}

      {status === "sent" && !onSuccess && (
        <p className="text-center text-xs text-green-400">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-center text-xs text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}

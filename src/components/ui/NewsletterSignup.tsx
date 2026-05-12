"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { markPopupAsCompleted } from "@/src/components/ui/DashboardPopup";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Por favor ingresa un email válido");
      return;
    }

    setStatus("loading");

    try {
      // Simulate API call - replace with actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus("success");
      setMessage("¡Gracias por suscribirte! Revisa tu email para confirmar.");
      setEmail("");
      markPopupAsCompleted();
    } catch (error) {
      setStatus("error");
      setMessage("Hubo un error. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="col-span-2 md:col-span-1">
      <div className="mb-6 font-bold text-white">Newsletter</div>
      <p className="mb-4 text-sm text-slate-400">
        Recibe las últimas actualizaciones y consejos sobre diseño web.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-10 py-2 text-white placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={status === "loading"}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Suscribiendo...
            </>
          ) : (
            "Suscribirme"
          )}
        </Button>

        {status !== "idle" && (
          <div className={`flex items-center gap-2 text-sm ${
            status === "success" ? "text-green-400" :
            status === "error" ? "text-red-400" : "text-slate-400"
          }`}>
            {status === "success" && <CheckCircle className="h-4 w-4" />}
            {status === "error" && <AlertCircle className="h-4 w-4" />}
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircleMore, X } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { isInternalHref } from "@/src/lib/routing";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  whatsappLink: string;
}

export function MobileMenu({ isOpen, onClose, navigation, whatsappLink }: MobileMenuProps) {
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    
    if (mediaQuery.matches) onClose();

    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, [onClose]);

  const handleWhatsAppClick = () => {
    onClose();
    window.open(whatsappLink, "_blank");
  };

  const mobileNavLinkClass = "text-2xl font-bold text-white";

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Cerrar menu al hacer click en el fondo"
        tabIndex={isOpen ? 0 : -1}
      />

      <div
        id="mobile-navigation"
        className={`mobile-menu absolute inset-0 px-6 pb-8 pt-24 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-xl flex-col rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Navegacion
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Explora el sitio sin perder el contexto.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              onClick={onClose}
              aria-label="Cerrar menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-6">
            {navigation.map((item) => (
              isInternalHref(item.href) ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={mobileNavLinkClass}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={mobileNavLinkClass}
                  onClick={onClose}
                >
                  {item.name}
                </a>
              )
            ))}

            <Button className="mt-4 gap-2 self-start" onClick={handleWhatsAppClick}>
              <MessageCircleMore size={16} />
              Cotizar por WhatsApp
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

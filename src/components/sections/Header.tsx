"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CmsBase, HeaderSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { isInternalHref } from "@/src/lib/routing";

export function Header({
  base,
  data,
}: {
  base: CmsBase;
  data: HeaderSectionData;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setIsMobileMenuOpen(false);
    }

    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const navLinkClass = "text-sm font-medium text-slate-300 transition-colors hover:text-white";
  const mobileNavLinkClass = "text-2xl font-bold text-white";

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleMobileWhatsAppClick() {
    closeMobileMenu();
    window.open(data.whatsappLink, "_blank");
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 py-4 shadow-xl backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center"
          aria-label={`Ir a inicio - ${data.name}`}
        >
          <img
            src={base.logoLight}
            alt={data.name}
            className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {data.navigation.map((item) => (
            isInternalHref(item.href) ? (
              <Link
                key={item.name}
                href={item.href}
                className={navLinkClass}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className={navLinkClass}
              >
                {item.name}
              </a>
            )
          ))}
          <Button
            size="sm"
            className="gap-2"
            onClick={() => window.open(data.whatsappLink, "_blank")}
          >
            <MessageCircleMore size={16} />
            Cotizar por WhatsApp
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </Container>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          aria-label="Cerrar menu al hacer click en el fondo"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />

        <div
          id="mobile-navigation"
          className={`mobile-menu absolute inset-0 px-6 pb-8 pt-24 transition-all duration-300 ${
            isMobileMenuOpen
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
                onClick={closeMobileMenu}
                aria-label="Cerrar menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-6">
              {data.navigation.map((item) => (
                isInternalHref(item.href) ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={mobileNavLinkClass}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={mobileNavLinkClass}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </a>
                )
              ))}

              <Button className="mt-4 gap-2 self-start" onClick={handleMobileWhatsAppClick}>
                <MessageCircleMore size={16} />
                Cotizar por WhatsApp
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

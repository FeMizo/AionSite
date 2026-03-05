"use client";

import { useState, useEffect } from "react";
import { siteData, base } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className="group inline-flex items-center"
          aria-label={`Ir a inicio - ${siteData.header.data.name}`}
        >
          <img
            src={base.logoLight}
            alt={siteData.header.data.name}
            className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteData.header.data.navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button
            size="sm"
            onClick={() =>
              window.open(siteData.header.data.whatsappLink, "_blank")
            }
          >
            Cotizar por WhatsApp
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-6">
            {siteData.header.data.navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl font-bold text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="mt-4"
              onClick={() =>
                window.open(siteData.header.data.whatsappLink, "_blank")
              }
            >
              Cotizar por WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

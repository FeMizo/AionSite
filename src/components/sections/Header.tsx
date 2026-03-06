"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CmsBase, HeaderSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 py-4 shadow-xl backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className="group inline-flex items-center"
          aria-label={`Ir a inicio - ${data.name}`}
        >
          <img
            src={base.logoLight}
            alt={data.name}
            className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {data.navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {item.name}
            </a>
          ))}
          <Button size="sm" onClick={() => window.open(data.whatsappLink, "_blank")}>
            Cotizar por WhatsApp
          </Button>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </Container>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-950 px-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-6">
            {data.navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl font-bold text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="mt-4" onClick={() => window.open(data.whatsappLink, "_blank")}>
              Cotizar por WhatsApp
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

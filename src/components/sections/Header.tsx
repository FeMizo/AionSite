"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CmsBase, HeaderSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { MobileMenu } from "@/src/components/ui/MobileMenu";
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

  const navLinkClass = "text-sm font-medium text-slate-300 transition-colors hover:text-white";

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
          <Image
            src={base.logoLight}
            alt={data.name}
            width={160}
            height={40}
            className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
            priority
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={data.navigation}
        whatsappLink={data.whatsappLink}
      />
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
} from "lucide-react";
import { blogPosts } from "@/src/data/blog-posts";
import { initialCmsContent } from "@/src/cms/site-content";
import { Header } from "@/src/components/sections/Header";
import { SiteFooter } from "@/src/components/sections/SiteFooter";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { BlogCardSkeleton } from "@/src/components/ui/Skeleton";
import { Button } from "@/src/components/ui/Button";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";
import { useGsapStagger } from "@/src/lib/animations";

const PAGE_SIZE_OPTIONS = [9, 18, 30] as const;

const nav = mapNavigationForInnerPage(
  initialCmsContent.sections.header.data.navigation,
);
const headerData = { ...initialCmsContent.sections.header.data, navigation: nav };
const base = { ...initialCmsContent.base, navigation: nav };

export function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] =
    useState<(typeof PAGE_SIZE_OPTIONS)[number]>(9);
  const [currentPage, setCurrentPage] = useState(1);
  const blogSectionRef = useRef<HTMLElement>(null);
  const deferredSearch = useDeferredValue(searchQuery.trim().toLowerCase());
  const heroRef = useGsapStagger<HTMLDivElement>();
  const gridRef = useGsapStagger<HTMLDivElement>({ delay: 0.05 });

  const filteredPosts = useMemo(() => {
    if (!deferredSearch) return blogPosts;

    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(deferredSearch) ||
        post.excerpt.toLowerCase().includes(deferredSearch) ||
        post.badgeText.toLowerCase().includes(deferredSearch) ||
        post.keywords.some((keyword) =>
          keyword.toLowerCase().includes(deferredSearch),
        ) ||
        post.blocks.some((block) =>
          block.text.toLowerCase().includes(deferredSearch),
        ),
    );
  }, [deferredSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearch, pageSize]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }

    setIsLoading(false);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredPosts.length);
  const visiblePosts = filteredPosts.slice(startIndex, endIndex);

  function goToPage(nextPage: number) {
    const boundedPage = Math.min(totalPages, Math.max(1, nextPage));
    setCurrentPage(boundedPage);
    window.requestAnimationFrame(() => {
      blogSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      <Header base={base} data={headerData} />

      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/14 blur-[130px]" />
        <div className="absolute right-1/4 top-1/2 -z-10 h-[250px] w-[350px] rounded-full bg-blue-600/10 blur-[100px]" />
        <Container className="text-center">
          <div ref={heroRef}>
            <div
              data-gsap-reveal
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-violet-300 shadow-[0_14px_28px_-20px_rgba(124,58,237,0.6)]"
            >
              <BookOpen size={14} />
              Blog & Recursos
            </div>
            <h1
              data-gsap-reveal
              className="mx-auto max-w-5xl text-display font-display font-bold text-white"
            >
              Conocimiento que impulsa tu negocio digital.
            </h1>
            <p
              data-gsap-reveal
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              Estrategias, tendencias y consejos practicos de diseno web, SEO y
              conversion para que tu marca destaque y genere mas clientes.
            </p>

            <div
              data-gsap-reveal
              className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 shadow-[0_24px_48px_-36px_rgba(2,6,23,0.95)]"
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
                <label className="block text-left">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Buscar
                  </span>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar articulos..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-4 text-white placeholder-slate-400 transition-colors focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </label>

                <label className="block text-left">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Paginacion
                  </span>
                  <select
                    value={String(pageSize)}
                    onChange={(event) =>
                      setPageSize(Number(event.target.value) as 9 | 18 | 30)
                    }
                    className="w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/50"
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                <p className="text-sm text-slate-400">
                  {filteredPosts.length > 0
                    ? `Mostrando ${startIndex + 1}-${endIndex} de ${filteredPosts.length} articulos`
                    : "No hay articulos que coincidan con la busqueda actual."}
                </p>

                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                  Ordenado por reciente
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        ref={blogSectionRef}
        className="scroll-mt-24 bg-slate-950 pb-28 pt-8"
      >
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">
                No se encontraron articulos
              </h3>
              <p className="text-slate-400">
                Intenta con otros terminos de busqueda
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-sm text-slate-400">
                  {filteredPosts.length} articulo
                  {filteredPosts.length !== 1 ? "s" : ""} encontrado
                  {filteredPosts.length !== 1 ? "s" : ""}
                  {searchQuery && ` para "${searchQuery}"`}
                </p>
              </div>

              <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading
                  ? Array.from({ length: Math.min(pageSize, 9) }).map((_, i) => (
                      <BlogCardSkeleton key={`skeleton-${i}`} className="" />
                    ))
                  : visiblePosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        data-gsap-reveal
                        className="group block transition-transform duration-150 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 active:scale-[0.97]"
                      >
                        <Card className="flex h-full flex-col overflow-hidden p-0">
                          <div className="relative h-80 w-full overflow-hidden">
                            <Image
                              src={post.image ?? "/logo-aionsite.png"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                          </div>
                          <div className="flex flex-1 flex-col gap-4 p-6">
                            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                              <BookOpen size={11} />
                              {post.badgeText}
                            </div>
                            <div className="flex-1">
                              <h2 className="mb-3 font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-blue-300">
                                {post.title}
                              </h2>
                              <p className="text-sm leading-relaxed text-slate-400">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} />
                                {post.readTime}
                              </span>
                              <span className="flex items-center gap-1 text-blue-400 transition-colors duration-200 group-hover:text-blue-300">
                                Leer articulo
                                <ArrowRight
                                  size={12}
                                  className="transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                                />
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </Button>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
                  Pagina {safePage} de {totalPages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                >
                  Siguiente
                  <ChevronRight size={16} />
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>

      <SiteFooter />
      <WhatsAppFloatingButton
        data={initialCmsContent.sections.whatsappFloatingButton.data}
      />
    </>
  );
}

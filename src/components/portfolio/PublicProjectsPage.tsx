"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  loadCmsContentFromBrowser,
  loadCmsContentFromFile,
  saveCmsContentToBrowser,
} from "@/src/cms/browser-storage";
import {
  getPortfolioCategories,
  getRecentPortfolioItems,
  portfolioTypeOptions,
} from "@/src/cms/portfolio";
import type { CmsContent } from "@/src/cms/types";
import { PortfolioGrid } from "@/src/components/portfolio/PortfolioGrid";
import { Footer } from "@/src/components/sections/Footer";
import { Header } from "@/src/components/sections/Header";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

const PAGE_SIZE_OPTIONS = [10, 20, 30] as const;

export function PublicProjectsPage({
  initialContent,
}: {
  initialContent: CmsContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [pageSize, setPageSize] =
    useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  useEffect(() => {
    let isCancelled = false;
    setContent(loadCmsContentFromBrowser());

    (async () => {
      const fileContent = await loadCmsContentFromFile();
      if (!fileContent || isCancelled) {
        return;
      }

      saveCmsContentToBrowser(fileContent);
      setContent(fileContent);
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  const navigation = useMemo(
    () => mapNavigationForInnerPage(content.sections.header.data.navigation),
    [content.sections.header.data.navigation],
  );

  const base = useMemo(
    () => ({
      ...content.base,
      navigation,
    }),
    [content.base, navigation],
  );

  const headerData = useMemo(
    () => ({
      ...content.sections.header.data,
      navigation,
    }),
    [content.sections.header.data, navigation],
  );

  const footerData = useMemo(
    () => ({
      ...content.sections.footer.data,
      navigation,
    }),
    [content.sections.footer.data, navigation],
  );

  const portfolioItems = useMemo(
    () => getRecentPortfolioItems(content.sections.portfolio.data),
    [content.sections.portfolio.data],
  );

  const categories = useMemo(
    () => getPortfolioCategories(portfolioItems),
    [portfolioItems],
  );

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesSearch =
        !deferredSearch ||
        `${item.title} ${item.category} ${item.type}`
          .toLowerCase()
          .includes(deferredSearch);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [deferredSearch, portfolioItems, selectedCategory, selectedType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearch, pageSize, selectedCategory, selectedType]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredItems.length);
  const visibleItems = filteredItems.slice(startIndex, endIndex);

  return (
    <>
      {content.sections.header.enabled ? (
        <Header base={base} data={headerData} />
      ) : null}

      <main className="min-h-screen">
        <section className="relative overflow-hidden pb-10 pt-32 md:pb-14 md:pt-40">
          <div className="absolute left-1/2 top-0 -z-10 h-160 w-200 -translate-x-1/2 rounded-full bg-blue-600/14 blur-[140px]" />

          <Container>
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300/80">
                Portafolio
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Proyectos recientes
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Explora el portafolio completo ordenado por reciente. Puedes
                buscar por nombre, filtrar por categorÃ­a o por tipo de
                implementaciÃ³n.
              </p>
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 shadow-[0_24px_48px_-36px_rgba(2,6,23,0.95)]">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px_220px_140px]">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Buscar
                  </span>
                  <div className="relative">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Buscar proyecto..."
                      className="w-full rounded-2xl border border-white/8 bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    CategorÃ­a
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/50"
                  >
                    <option value="all">Todas</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Tipo
                  </span>
                  <select
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/50"
                  >
                    <option value="all">Todos</option>
                    {portfolioTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    PaginaciÃ³n
                  </span>
                  <select
                    value={String(pageSize)}
                    onChange={(event) =>
                      setPageSize(Number(event.target.value) as 10 | 20 | 30)
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
                  {filteredItems.length > 0
                    ? `Mostrando ${startIndex + 1}-${endIndex} de ${filteredItems.length} proyectos`
                    : "No hay proyectos que coincidan con los filtros actuales."}
                </p>

                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                  Ordenado por reciente
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            {visibleItems.length > 0 ? (
              <PortfolioGrid items={visibleItems} />
            ) : (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-slate-400">
                Ajusta la bÃºsqueda o los filtros para encontrar proyectos.
              </div>
            )}

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safePage === 1}
              >
                <ChevronLeft size={16} />
                Anterior
              </Button>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
                PÃ¡gina {safePage} de {totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={safePage === totalPages}
              >
                Siguiente
                <ChevronRight size={16} />
              </Button>
            </div>
          </Container>
        </section>
      </main>

      {content.sections.footer.enabled ? (
        <Footer base={base} data={footerData} />
      ) : null}

      {content.sections.whatsappFloatingButton.enabled ? (
        <WhatsAppFloatingButton
          data={content.sections.whatsappFloatingButton.data}
        />
      ) : null}
    </>
  );
}

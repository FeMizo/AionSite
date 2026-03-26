"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertTriangle,
  FileText,
  Layers3,
  LoaderCircle,
  Save,
  X,
} from "lucide-react";
import {
  loadAboutContentFromBrowser,
  loadAboutContentFromFile,
  saveAboutContent,
  saveAboutContentToBrowser,
} from "@/src/about/browser-storage";
import { aboutSectionOrder, aboutSectionRegistry } from "@/src/about/registry";
import type { AboutContent, AboutSectionId } from "@/src/about/types";
import {
  loadCmsContentFromBrowser,
  loadCmsContentFromFile,
  saveCmsContent,
  saveCmsContentToBrowser,
} from "@/src/cms/browser-storage";
import { sectionRegistry } from "@/src/cms/registry";
import type { CmsContent, SectionId } from "@/src/cms/types";
import { SectionEditor } from "@/src/components/admin/SectionEditor";
import { StatusBadge } from "@/src/components/admin/StatusBadge";
import { Button } from "@/src/components/ui/Button";

type PageId = "home" | "about";

const UNSAVED_CHANGES_MESSAGE =
  "Hay cambios sin guardar. Si sales, se perderan.";

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getSnapshot(value: unknown) {
  return JSON.stringify(value);
}

function getUniqueSectionIds(sectionSequence: SectionId[]) {
  return Array.from(new Set(sectionSequence));
}

const pageConfig = {
  home: {
    label: "Inicio",
    description: "Contenido editable de la pagina principal.",
    icon: Layers3,
  },
  about: {
    label: "About Me",
    description: "Contenido editable de la pagina About.",
    icon: FileText,
  },
} as const;

export function ContentDashboard({
  initialCmsContent,
  initialAboutContent,
}: {
  initialCmsContent: CmsContent;
  initialAboutContent: AboutContent;
}) {
  const [cmsContent, setCmsContent] = useState<CmsContent>(() =>
    cloneValue(initialCmsContent),
  );
  const [aboutContent, setAboutContent] = useState<AboutContent>(() =>
    cloneValue(initialAboutContent),
  );
  const [selectedPageId, setSelectedPageId] = useState<PageId>("home");
  const [selectedHomeSectionId, setSelectedHomeSectionId] =
    useState<SectionId>("hero");
  const [selectedAboutSectionId, setSelectedAboutSectionId] =
    useState<AboutSectionId>("hero");
  const [savedCmsSnapshot, setSavedCmsSnapshot] = useState<string>(() =>
    getSnapshot(initialCmsContent),
  );
  const [savedAboutSnapshot, setSavedAboutSnapshot] = useState<string>(() =>
    getSnapshot(initialAboutContent),
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const nextCms = cloneValue(initialCmsContent);
    const nextAbout = cloneValue(initialAboutContent);
    setCmsContent(nextCms);
    setAboutContent(nextAbout);
    setSavedCmsSnapshot(getSnapshot(nextCms));
    setSavedAboutSnapshot(getSnapshot(nextAbout));
  }, [initialCmsContent, initialAboutContent]);

  useEffect(() => {
    let isCancelled = false;

    const browserCms = cloneValue(loadCmsContentFromBrowser());
    const browserAbout = cloneValue(loadAboutContentFromBrowser());
    setCmsContent(browserCms);
    setAboutContent(browserAbout);
    setSavedCmsSnapshot(getSnapshot(browserCms));
    setSavedAboutSnapshot(getSnapshot(browserAbout));

    (async () => {
      const [fileCms, fileAbout] = await Promise.all([
        loadCmsContentFromFile(),
        loadAboutContentFromFile(),
      ]);

      if (isCancelled) {
        return;
      }

      if (fileCms) {
        const normalized = cloneValue(fileCms);
        saveCmsContentToBrowser(normalized);
        setCmsContent(normalized);
        setSavedCmsSnapshot(getSnapshot(normalized));
      }

      if (fileAbout) {
        const normalized = cloneValue(fileAbout);
        saveAboutContentToBrowser(normalized);
        setAboutContent(normalized);
        setSavedAboutSnapshot(getSnapshot(normalized));
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  const homeSectionIds = useMemo(
    () => getUniqueSectionIds(cmsContent.sectionSequence),
    [cmsContent.sectionSequence],
  );

  const hasUnsavedChanges = useMemo(
    () =>
      getSnapshot(cmsContent) !== savedCmsSnapshot ||
      getSnapshot(aboutContent) !== savedAboutSnapshot,
    [aboutContent, cmsContent, savedAboutSnapshot, savedCmsSnapshot],
  );

  useEffect(() => {
    if (!homeSectionIds.includes(selectedHomeSectionId)) {
      setSelectedHomeSectionId(homeSectionIds[0] ?? "hero");
    }
  }, [homeSectionIds, selectedHomeSectionId]);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage(null);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [statusMessage]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const handleDocumentNavigation = (event: MouseEvent) => {
      if (!hasUnsavedChanges) {
        return;
      }

      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(anchor.href, window.location.href);
      const isSamePageAnchor =
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search &&
        currentUrl.hash !== targetUrl.hash;

      if (isSamePageAnchor || currentUrl.href === targetUrl.href) {
        return;
      }

      if (!window.confirm(UNSAVED_CHANGES_MESSAGE)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleDocumentNavigation, true);
    return () => {
      document.removeEventListener("click", handleDocumentNavigation, true);
    };
  }, [hasUnsavedChanges]);

  const saveChanges = () => {
    setStatusMessage(null);

    startTransition(async () => {
      try {
        const cmsChanged = getSnapshot(cmsContent) !== savedCmsSnapshot;
        const aboutChanged = getSnapshot(aboutContent) !== savedAboutSnapshot;

        const [cmsResult, aboutResult] = await Promise.all([
          cmsChanged ? saveCmsContent(cmsContent) : Promise.resolve(null),
          aboutChanged ? saveAboutContent(aboutContent) : Promise.resolve(null),
        ]);

        const nextCms = cmsResult?.content ?? cmsContent;
        const nextAbout = aboutResult?.content ?? aboutContent;

        setCmsContent(nextCms);
        setAboutContent(nextAbout);
        setSavedCmsSnapshot(getSnapshot(nextCms));
        setSavedAboutSnapshot(getSnapshot(nextAbout));

        const persistedToFile =
          Boolean(cmsResult?.persistedToFile) ||
          Boolean(aboutResult?.persistedToFile);

        setStatusMessage(
          persistedToFile
            ? "Cambios guardados en el proyecto."
            : "Cambios guardados en el sitio.",
        );
      } catch {
        setStatusMessage("No se pudo guardar el contenido.");
      }
    });
  };

  const selectedHomeSection = cmsContent.sections[selectedHomeSectionId];
  const selectedAboutSection = aboutContent[selectedAboutSectionId];

  return (
    <div className="grid gap-6 xl:grid-cols-[470px_minmax(0,1fr)] xl:items-start">
      <section className="rounded-4xl border border-white/8 bg-slate-950/55 p-5 shadow-[0_30px_60px_-42px_rgba(2,6,23,0.95)] backdrop-blur">
        <div className="sticky top-4 z-20 -mx-2 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-3 shadow-[0_22px_42px_-28px_rgba(2,6,23,0.96)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Paginas y secciones
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Primero eliges la pagina y despues la seccion que quieres editar.
              </p>
            </div>
            <Button
              size="sm"
              onClick={saveChanges}
              disabled={isPending}
              className="gap-2"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Guardar
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          {(Object.keys(pageConfig) as PageId[]).map((pageId) => {
            const page = pageConfig[pageId];
            const Icon = page.icon;
            const isSelected = selectedPageId === pageId;
            const sectionCount =
              pageId === "home" ? homeSectionIds.length : aboutSectionOrder.length;

            return (
              <button
                key={pageId}
                type="button"
                onClick={() => setSelectedPageId(pageId)}
                className={`rounded-[1.75rem] border p-5 text-left transition ${
                  isSelected
                    ? "border-blue-500/40 bg-blue-500/10 shadow-[0_20px_34px_-24px_rgba(37,99,235,0.58)]"
                    : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-blue-300/80">
                      Pagina
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      {page.label}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {page.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                    <Icon size={18} />
                  </div>
                </div>

                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
                  {sectionCount} secciones editables
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-white/8 bg-white/3 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Secciones de {pageConfig[selectedPageId].label}
              </p>
              <h4 className="mt-2 text-base font-semibold text-white">
                Seleccion de contenido
              </h4>
            </div>

            {selectedPageId === "home" ? (
              <Link
                href="/admin/sections"
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-blue-300/40 hover:bg-white/5 hover:text-white"
              >
                Orden y visibilidad
              </Link>
            ) : null}
          </div>

          <div className="mt-4 space-y-3">
            {selectedPageId === "home"
              ? homeSectionIds.map((sectionId) => {
                  const metadata = sectionRegistry[sectionId];
                  const isSelected = selectedHomeSectionId === sectionId;
                  const section = cmsContent.sections[sectionId];

                  return (
                    <button
                      key={sectionId}
                      type="button"
                      onClick={() => setSelectedHomeSectionId(sectionId)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-blue-500/35 bg-blue-500/10"
                          : "border-white/8 bg-slate-950/55 hover:border-white/15 hover:bg-slate-950/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-white">
                            {metadata.label}
                          </h5>
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {metadata.description}
                          </p>
                        </div>
                        <StatusBadge enabled={section.enabled} />
                      </div>
                    </button>
                  );
                })
              : aboutSectionOrder.map((sectionId) => {
                  const metadata = aboutSectionRegistry[sectionId];
                  const isSelected = selectedAboutSectionId === sectionId;

                  return (
                    <button
                      key={sectionId}
                      type="button"
                      onClick={() => setSelectedAboutSectionId(sectionId)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-blue-500/35 bg-blue-500/10"
                          : "border-white/8 bg-slate-950/55 hover:border-white/15 hover:bg-slate-950/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-white">
                            {metadata.label}
                          </h5>
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {metadata.description}
                          </p>
                        </div>
                        <span className="inline-flex rounded-full border border-blue-300/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                          Editable
                        </span>
                      </div>
                    </button>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-white/8 bg-slate-950/55 p-6 shadow-[0_30px_60px_-42px_rgba(2,6,23,0.95)] backdrop-blur xl:sticky xl:top-4 xl:flex xl:max-h-[calc(100vh-2rem)] xl:min-h-0 xl:flex-col xl:self-start xl:overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="md:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300/80">
              Editor de contenido
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {selectedPageId === "home"
                ? sectionRegistry[selectedHomeSectionId].label
                : aboutSectionRegistry[selectedAboutSectionId].label}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              {selectedPageId === "home"
                ? "Edita el contenido de esta seccion. El orden y la visibilidad se gestionan en el modulo de secciones."
                : "Edita el contenido de la pagina About desde una estructura organizada por bloques."}
            </p>
          </div>
        </div>

        <div className="mt-6 xl:mt-0 xl:min-h-0 xl:overflow-y-auto xl:pt-6 xl:pr-2">
          {selectedPageId === "home" ? (
            <SectionEditor
              data={selectedHomeSection.data}
              fields={sectionRegistry[selectedHomeSectionId].fields}
              onChange={(data) =>
                setCmsContent((current) => ({
                  ...current,
                  sections: {
                    ...current.sections,
                    [selectedHomeSectionId]: {
                      ...current.sections[selectedHomeSectionId],
                      data,
                    },
                  },
                }))
              }
            />
          ) : (
            <SectionEditor
              data={selectedAboutSection}
              fields={aboutSectionRegistry[selectedAboutSectionId].fields}
              onChange={(data) =>
                setAboutContent((current) => ({
                  ...current,
                  [selectedAboutSectionId]: data as AboutContent[AboutSectionId],
                }))
              }
            />
          )}
        </div>
      </section>

      {statusMessage ? (
        <div className="fixed bottom-4 right-4 z-50 flex max-w-md items-start gap-3 rounded-2xl border border-blue-400/30 bg-blue-500/18 px-4 py-3 text-sm text-blue-100 shadow-xl shadow-blue-950/60 backdrop-blur">
          <p className="flex-1">{statusMessage}</p>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="rounded-full border border-white/20 p-1 text-blue-100 transition hover:bg-white/10"
            aria-label="Cerrar mensaje"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

      {hasUnsavedChanges ? (
        <p className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/20 px-4 py-3 text-sm text-amber-100 shadow-xl shadow-amber-950/40 backdrop-blur">
          <AlertTriangle size={16} />
          Hay cambios sin guardar.
        </p>
      ) : null}
    </div>
  );
}

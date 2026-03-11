"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  GripVertical,
  LoaderCircle,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  loadCmsContentFromBrowser,
  saveCmsContentToBrowser,
} from "@/src/cms/browser-storage";
import { sectionRegistry } from "@/src/cms/registry";
import type { CmsContent, SectionId } from "@/src/cms/types";
import { SectionEditor } from "@/src/components/admin/SectionEditor";
import { StatusBadge } from "@/src/components/admin/StatusBadge";
import { Switch } from "@/src/components/admin/Switch";
import { Button } from "@/src/components/ui/Button";

function cloneContent(content: CmsContent): CmsContent {
  return JSON.parse(JSON.stringify(content)) as CmsContent;
}

function getContentSnapshot(content: CmsContent) {
  return JSON.stringify(content);
}

const UNSAVED_CHANGES_MESSAGE =
  "Hay cambios sin guardar. Si sales, se perderán.";

const placementLabels = {
  header: "encabezado",
  main: "principal",
  footer: "pie de página",
  floating: "flotante",
} as const;

export function SectionsDashboard({
  initialContent,
}: {
  initialContent: CmsContent;
}) {
  const [content, setContent] = useState<CmsContent>(() =>
    cloneContent(initialContent),
  );
  const [selectedSectionId, setSelectedSectionId] = useState<SectionId>("hero");
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() =>
    getContentSnapshot(initialContent),
  );
  const [newSectionType, setNewSectionType] = useState<SectionId>("hero");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const normalized = cloneContent(initialContent);
    setContent(normalized);
    setSavedSnapshot(getContentSnapshot(normalized));
  }, [initialContent]);

  useEffect(() => {
    const browserContent = cloneContent(loadCmsContentFromBrowser());
    setContent(browserContent);
    setSavedSnapshot(getContentSnapshot(browserContent));
  }, []);

  const orderedSections = useMemo(() => content.sectionSequence, [content]);

  const hasUnsavedChanges = useMemo(
    () => getContentSnapshot(content) !== savedSnapshot,
    [content, savedSnapshot],
  );

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

  const selectedSection = content.sections[selectedSectionId];
  const selectedSectionPosition = orderedSections.indexOf(selectedSectionId);

  const updateSection = (
    id: SectionId,
    updater: (
      section: CmsContent["sections"][SectionId],
    ) => CmsContent["sections"][SectionId],
  ) => {
    const update = updater as (
      section: CmsContent["sections"][SectionId],
    ) => CmsContent["sections"][SectionId];

    setContent(
      (current) =>
        ({
          ...current,
          sections: {
            ...current.sections,
            [id]: update(current.sections[id]),
          },
        }) as CmsContent,
    );
  };

  const moveSectionToIndex = (currentIndex: number, targetIndex: number) => {
    setContent((current) => {
      const boundedTarget = Math.max(
        0,
        Math.min(targetIndex, current.sectionSequence.length - 1),
      );

      if (
        currentIndex < 0 ||
        currentIndex >= current.sectionSequence.length ||
        currentIndex === boundedTarget
      ) {
        return current;
      }

      const nextOrder = [...current.sectionSequence];
      const [movedSection] = nextOrder.splice(currentIndex, 1);
      nextOrder.splice(boundedTarget, 0, movedSection);

      return { ...current, sectionSequence: nextOrder };
    });
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const currentIndex = index;
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= orderedSections.length) {
      return;
    }

    moveSectionToIndex(currentIndex, targetIndex);
  };

  const addSection = () => {
    setContent((current) => ({
      ...current,
      sectionSequence: [...current.sectionSequence, newSectionType],
    }));
    setStatusMessage("Se agregó una nueva sección a la lista.");
  };

  const saveChanges = () => {
    setStatusMessage(null);
    startTransition(async () => {
      try {
        const nextContent = saveCmsContentToBrowser(content);
        setContent(nextContent);
        setSavedSnapshot(getContentSnapshot(nextContent));
        setStatusMessage("Cambios guardados en este navegador.");
      } catch {
        setStatusMessage("No se pudo guardar el contenido CMS.");
      }
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[490px_minmax(0,1fr)] xl:items-start">
      <section className="rounded-4xl border border-white/8 bg-slate-950/55 p-5 backdrop-blur">
        <div className="sticky top-4 z-20 -mx-2 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-3 shadow-xl shadow-slate-950/40 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Secciones registradas
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                El orden final y la visibilidad pública salen de esta lista.
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

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="min-w-25">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Orden y visibilidad
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={newSectionType}
              onChange={(event) =>
                setNewSectionType(event.target.value as SectionId)
              }
              className="rounded-xl border border-white/12 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 outline-none transition focus:border-blue-400/60"
            >
              {(Object.keys(sectionRegistry) as SectionId[])
                .filter((id) => sectionRegistry[id].placement === "main")
                .map((id) => (
                  <option key={id} value={id}>
                    {sectionRegistry[id].label}
                  </option>
                ))}
            </select>
            <Button
              size="sm"
              variant="outline"
              onClick={addSection}
              className="gap-2"
            >
              <Plus size={14} />
              Agregar
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          {orderedSections.map((id, index) => {
            const section = content.sections[id];
            const metadata = sectionRegistry[id];
            const isSelected = selectedSectionId === id;
            const sectionIndex = index;

            return (
              <div
                key={`${id}-${index}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setSelectedSectionId(id)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) {
                    return;
                  }

                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedSectionId(id);
                  }
                }}
                className={`h-full w-full rounded-[1.75rem] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? "border-blue-500/40 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                    : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full border border-white/10 p-2 text-slate-500">
                      <GripVertical size={14} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {metadata.label}
                        </h4>
                        <StatusBadge enabled={section.enabled} />
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                        Instancia {sectionIndex + 1} / {id} / {metadata.type} /{" "}
                        {placementLabels[metadata.placement]}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {metadata.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Switch
                      checked={section.enabled}
                      onChange={(enabled) =>
                        updateSection(id, (current) => ({
                          ...current,
                          enabled,
                        }))
                      }
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={sectionIndex === 0}
                        onClick={(event) => {
                          event.stopPropagation();
                          moveSection(sectionIndex, -1);
                        }}
                        className="rounded-full border border-white/10 p-2 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-blue-500/10 hover:text-white disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={sectionIndex === orderedSections.length - 1}
                        onClick={(event) => {
                          event.stopPropagation();
                          moveSection(sectionIndex, 1);
                        }}
                        className="rounded-full border border-white/10 p-2 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-blue-500/10 hover:text-white disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur xl:sticky xl:top-4 xl:flex xl:max-h-[calc(100vh-2rem)] xl:min-h-0 xl:flex-col xl:self-start xl:overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="md:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300/80">
              Editor de sección
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {sectionRegistry[selectedSectionId].label}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Ajusta contenido base, visibilidad y orden sin tocar el render
              público.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 md:w-1/2">
            <StatusBadge enabled={selectedSection.enabled} />
            <span className="rounded-full border border-white/8 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
              Posición{" "}
              {selectedSectionPosition >= 0 ? selectedSectionPosition + 1 : "-"}
            </span>
          </div>
        </div>

        <div className="mt-6 xl:mt-0 xl:min-h-0 xl:overflow-y-auto xl:pt-6 xl:pr-2">
          <SectionEditor
            data={selectedSection.data}
            fields={sectionRegistry[selectedSectionId].fields}
            onChange={(data) =>
              updateSection(selectedSectionId, ((current) => ({
                ...current,
                data,
              })) as (
                section: CmsContent["sections"][SectionId],
              ) => CmsContent["sections"][SectionId])
            }
          />
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

"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  GripVertical,
  LoaderCircle,
  Save,
} from "lucide-react";
import {
  loadCmsContentFromBrowser,
  loadCmsContentFromServer,
  resetCmsContentInBrowser,
  saveCmsContentToBrowser,
  saveCmsContentToServer,
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
  "Hay cambios sin guardar. Si sales, se perderan.";

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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const normalized = cloneContent(initialContent);
    setContent(normalized);
    setSavedSnapshot(getContentSnapshot(normalized));
  }, [initialContent]);

  useEffect(() => {
    let isCancelled = false;

    const syncFromServer = async () => {
      const serverContent = await loadCmsContentFromServer();
      if (isCancelled) {
        return;
      }

      if (serverContent) {
        const normalizedServerContent = cloneContent(serverContent);
        setContent(normalizedServerContent);
        setSavedSnapshot(getContentSnapshot(normalizedServerContent));
        saveCmsContentToBrowser(normalizedServerContent);
        return;
      }

      const browserContent = cloneContent(loadCmsContentFromBrowser());
      setContent(browserContent);
      setSavedSnapshot(getContentSnapshot(browserContent));
    };

    void syncFromServer();

    return () => {
      isCancelled = true;
    };
  }, []);

  const orderedSections = useMemo(
    () =>
      (Object.keys(content.sections) as SectionId[]).sort(
        (left, right) =>
          content.sections[left].order - content.sections[right].order,
      ),
    [content],
  );

  const hasUnsavedChanges = useMemo(
    () => getContentSnapshot(content) !== savedSnapshot,
    [content, savedSnapshot],
  );

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
  const selectedSectionIndex = orderedSections.indexOf(selectedSectionId);

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

  const moveSectionToIndex = (id: SectionId, targetIndex: number) => {
    setContent((current) => {
      const currentOrder = (Object.keys(current.sections) as SectionId[]).sort(
        (left, right) =>
          current.sections[left].order - current.sections[right].order,
      );
      const currentIndex = currentOrder.indexOf(id);
      const boundedTarget = Math.max(
        0,
        Math.min(targetIndex, currentOrder.length - 1),
      );

      if (currentIndex < 0 || currentIndex === boundedTarget) {
        return current;
      }

      const nextOrder = [...currentOrder];
      const [movedSection] = nextOrder.splice(currentIndex, 1);
      nextOrder.splice(boundedTarget, 0, movedSection);

      const nextSections = { ...current.sections } as CmsContent["sections"];
      nextOrder.forEach((sectionId, order) => {
        (nextSections as Record<SectionId, CmsContent["sections"][SectionId]>)[
          sectionId
        ] = {
          ...(
            nextSections as Record<SectionId, CmsContent["sections"][SectionId]>
          )[sectionId],
          order,
        } as CmsContent["sections"][SectionId];
      });

      return { ...current, sections: nextSections };
    });
  };

  const moveSection = (id: SectionId, direction: -1 | 1) => {
    const currentIndex = orderedSections.indexOf(id);
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= orderedSections.length) {
      return;
    }

    moveSectionToIndex(id, targetIndex);
  };

  const saveChanges = () => {
    setStatusMessage(null);
    startTransition(async () => {
      try {
        const serverContent = await saveCmsContentToServer(content);
        const nextContent = saveCmsContentToBrowser(serverContent ?? content);
        setContent(nextContent);
        setSavedSnapshot(getContentSnapshot(nextContent));

        if (serverContent) {
          setStatusMessage(
            "Cambios guardados de forma permanente y reflejados en el sitio publico.",
          );
          return;
        }

        setStatusMessage(
          "No se alcanzo el servidor CMS. Se guardo solo en este navegador.",
        );
      } catch {
        setStatusMessage("No se pudo guardar el contenido CMS.");
      }
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-5 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Secciones registradas
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              El orden final y la visibilidad publica salen de esta lista.
            </p>
          </div>
          <Button size="sm" onClick={saveChanges} disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
          </Button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          {orderedSections.map((id) => {
            const section = content.sections[id];
            const metadata = sectionRegistry[id];
            const isSelected = selectedSectionId === id;
            const sectionIndex = orderedSections.indexOf(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedSectionId(id)}
                className={`h-full w-full rounded-[1.75rem] border p-4 text-left transition ${
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
                        {id} / {metadata.type} / {metadata.placement}
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
                          moveSection(id, -1);
                        }}
                        className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:bg-white/5 disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={sectionIndex === orderedSections.length - 1}
                        onClick={(event) => {
                          event.stopPropagation();
                          moveSection(id, 1);
                        }}
                        className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:bg-white/5 disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            resetCmsContentInBrowser();
            setContent(cloneContent(initialContent));
            setSavedSnapshot(getContentSnapshot(initialContent));
            setStatusMessage("Se restauraron los valores base del proyecto.");
          }}
          className="mt-4 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Restaurar base del proyecto
        </button>
      </section>

      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="md:w-50">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300/80">
              Editor de seccion
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {sectionRegistry[selectedSectionId].label}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Ajusta contenido base, visibilidad y orden sin tocar el render
              publico.
            </p>
          </div>

          <div className="flex items-center gap-3 md:w-50">
            <StatusBadge enabled={selectedSection.enabled} />
            <span className="rounded-full border border-white/8 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
              Orden {selectedSection.order + 1}
            </span>
          </div>
        </div>

        <div className="mt-6">
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
        <p className="fixed bottom-4 right-4 z-50 max-w-md rounded-2xl border border-blue-400/30 bg-blue-500/18 px-4 py-3 text-sm text-blue-100 shadow-xl shadow-blue-950/60 backdrop-blur">
          {statusMessage}
        </p>
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

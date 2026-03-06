"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  LoaderCircle,
  Save,
} from "lucide-react";
import {
  resetCmsContentInBrowser,
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

const placementRank = {
  header: 0,
  main: 1,
  footer: 2,
  floating: 3,
} as const;

export function SectionsDashboard({
  initialContent,
}: {
  initialContent: CmsContent;
}) {
  const [content, setContent] = useState<CmsContent>(() => cloneContent(initialContent));
  const [selectedSectionId, setSelectedSectionId] = useState<SectionId>("hero");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setContent(cloneContent(initialContent));
  }, [initialContent]);

  const orderedSections = useMemo(() => {
    return (Object.keys(content.sections) as SectionId[]).sort((left, right) => {
      const leftPlacement = placementRank[sectionRegistry[left].placement];
      const rightPlacement = placementRank[sectionRegistry[right].placement];

      if (leftPlacement !== rightPlacement) {
        return leftPlacement - rightPlacement;
      }

      return content.sections[left].order - content.sections[right].order;
    });
  }, [content]);

  const selectedSection = content.sections[selectedSectionId];

  const updateSection = (
    id: SectionId,
    updater: (section: CmsContent["sections"][SectionId]) => CmsContent["sections"][SectionId],
  ) => {
    const update = updater as (section: CmsContent["sections"][SectionId]) => CmsContent["sections"][SectionId];

    setContent((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [id]: update(current.sections[id]),
      },
    }) as CmsContent);
  };

  const getScopedSections = (id: SectionId) =>
    orderedSections.filter(
      (sectionId) => sectionRegistry[sectionId].placement === sectionRegistry[id].placement,
    );

  const moveSection = (id: SectionId, direction: -1 | 1) => {
    const scopedSections = getScopedSections(id);
    const index = scopedSections.indexOf(id);
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= scopedSections.length) {
      return;
    }

    const nextOrder = [...scopedSections];
    [nextOrder[index], nextOrder[targetIndex]] = [nextOrder[targetIndex], nextOrder[index]];

    setContent((current) => {
      const nextSections = { ...current.sections } as CmsContent["sections"];
      nextOrder.forEach((sectionId, order) => {
        (nextSections as Record<SectionId, CmsContent["sections"][SectionId]>)[
          sectionId
        ] = {
          ...(nextSections as Record<SectionId, CmsContent["sections"][SectionId]>)[
            sectionId
          ],
          order,
        } as CmsContent["sections"][SectionId];
      });
      return { ...current, sections: nextSections };
    });
  };

  const saveChanges = () => {
    setStatusMessage(null);
    startTransition(async () => {
      try {
        const nextContent = saveCmsContentToBrowser(content);
        setContent(nextContent);
        setStatusMessage("Cambios guardados en este navegador y reflejados en el sitio publico.");
      } catch {
        setStatusMessage("No se pudo conectar con el CMS local.");
      }
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-5 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Secciones registradas</h3>
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

        <div className="mt-5 space-y-3">
          {orderedSections.map((id) => {
            const section = content.sections[id];
            const metadata = sectionRegistry[id];
            const isSelected = selectedSectionId === id;
            const scopedSections = getScopedSections(id);
            const scopedIndex = scopedSections.indexOf(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedSectionId(id)}
                className={`w-full rounded-[1.75rem] border p-4 text-left transition ${
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
                        <h4 className="text-sm font-semibold text-white">{metadata.label}</h4>
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
                        updateSection(id, (current) => ({ ...current, enabled }))
                      }
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={scopedIndex === 0}
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
                        disabled={scopedIndex === scopedSections.length - 1}
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

        {statusMessage ? (
          <p className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
            {statusMessage}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => {
            resetCmsContentInBrowser();
            setContent(cloneContent(initialContent));
            setStatusMessage("Se restauraron los valores base del proyecto.");
          }}
          className="mt-4 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Restaurar base del proyecto
        </button>
      </section>

      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-6 backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300/80">
              Editor de seccion
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {sectionRegistry[selectedSectionId].label}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Ajusta contenido base, visibilidad y orden sin tocar el render publico.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge enabled={selectedSection.enabled} />
            <span className="rounded-full border border-white/8 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
              Orden {selectedSection.order}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <SectionEditor
            data={selectedSection.data}
            fields={sectionRegistry[selectedSectionId].fields}
            onChange={(data) =>
              updateSection(
                selectedSectionId,
                ((current) => ({
                  ...current,
                  data,
                })) as (section: CmsContent["sections"][SectionId]) => CmsContent["sections"][SectionId],
              )
            }
          />
        </div>
      </section>
    </div>
  );
}

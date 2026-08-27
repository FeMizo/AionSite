"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  AlertTriangle,
  Copy,
  ExternalLink,
  Filter,
  LoaderCircle,
  Save,
  Search,
  Send,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  loadJobsContentFromBrowser,
  loadJobsContentFromFile,
  saveJobsContent,
  saveJobsContentToBrowser,
} from "@/src/jobs/browser-storage";
import { jobStatuses, type JobRecord, type JobStatus, type JobsContent } from "@/src/jobs/types";
import { Button } from "@/src/components/ui/Button";

const UNSAVED_CHANGES_MESSAGE =
  "Hay cambios sin guardar. Si sales, se perderan.";
const JOBS_PER_PAGE = 5;
const JOBS_VIEW_MODES = ["list", "board"] as const;
const JOBS_VIEW_MODE_STORAGE_KEY = "aionsite.jobs.view-mode";

type JobsViewMode = (typeof JOBS_VIEW_MODES)[number];

function cloneContent(content: JobsContent): JobsContent {
  return JSON.parse(JSON.stringify(content)) as JobsContent;
}

function getSnapshot(content: JobsContent) {
  return JSON.stringify(content);
}

function loadJobsViewMode(): JobsViewMode {
  if (typeof window === "undefined") {
    return "list";
  }

  const storedMode = window.localStorage.getItem(JOBS_VIEW_MODE_STORAGE_KEY);
  return storedMode === "board" ? "board" : "list";
}

function formatMoney(value: number | null) {
  if (value === null) {
    return "No visible";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildSalaryRange(job: JobRecord) {
  const min = job.salaryUsdMin;
  const max = job.salaryUsdMax;

  if (min === null && max === null) {
    return job.salaryLabel;
  }

  if (min !== null && max !== null) {
    return `${formatMoney(min)} - ${formatMoney(max)}`;
  }

  return formatMoney(min ?? max);
}

const ENGLISH_JOB_MARKERS = [
  " engineer",
  " developer",
  " designer",
  " manager",
  " specialist",
  " analyst",
  " lead",
  " senior",
  " junior",
  " product",
  " marketing",
  " sales",
  " support",
  " remote",
  " full stack",
  " frontend",
  " backend",
  " data",
  " software",
  " qa",
];

const SPANISH_JOB_MARKERS = [
  " desarroll",
  " ingenier",
  " analist",
  " remoto",
  " producto",
  " mercad",
  " ventas",
  " soporte",
  " diseno",
  " tecnic",
  " seniority",
  " responsable",
  " coordin",
];

function isLikelyEnglishJob(job: JobRecord) {
  const text = [
    job.title,
    job.company,
    job.zone,
    job.region,
    job.source,
    job.fitReason,
    job.notes,
  ]
    .join(" ")
    .toLowerCase();

  if (/[áéíóúñü]/i.test(text)) {
    return false;
  }

  if (SPANISH_JOB_MARKERS.some((marker) => text.includes(marker))) {
    return false;
  }

  if (ENGLISH_JOB_MARKERS.some((marker) => text.includes(marker))) {
    return true;
  }

  return /^[\x00-\x7F]+$/.test(job.title) && /\b(engineer|developer|designer|manager|specialist|analyst|lead|senior|junior|product|marketing|sales|support|remote|full stack|frontend|backend|data|software|qa)\b/i.test(text);
}

function buildCoverDraft(profile: JobsContent["profile"], job: JobRecord) {
  const isEnglish = isLikelyEnglishJob(job);

  if (isEnglish) {
    return [
      `Hi ${job.company},`,
      "",
      `I am ${profile.name}, a ${profile.experience} professional focused on web design, SEO, speed optimization and custom code.`,
      `I am reaching out because the ${job.title} role aligns with the kind of work I do best: building clean experiences that convert, measure better and move fast.`,
      "",
      `My background in ${profile.stackSummary} lets me adapt quickly to modern product teams, support execution, and add value without noise.`,
      "",
      `I would love to talk about how I can help ${job.company} ship with clarity, quality and momentum.`,
      "",
      `Best regards,`,
      profile.name,
    ].join("\n");
  }

  return [
    `Hola ${job.company},`,
    "",
    `Soy ${profile.name}, con ${profile.experience} de experiencia enfocado en diseno web, SEO, optimizacion de velocidad y codigo a medida.`,
    `Me interesa la vacante de ${job.title} porque encaja con el tipo de trabajo que mejor hago: crear experiencias claras que convierten, miden mejor y responden rapido.`,
    "",
    `Mi experiencia con ${profile.stackSummary} me permite adaptarme rapido, apoyar la ejecucion y sumar valor sin ruido.`,
    "",
    `Me gustaria conversar sobre como puedo ayudar a ${job.company} a avanzar con claridad, calidad y ritmo.`,
    "",
    `Saludos,`,
    profile.name,
  ].join("\n");
}
function buildAutofillPack(content: JobsContent, job: JobRecord) {
  const profile = content.profile;
  const coverDraft = buildCoverDraft(profile, job);

  return [
    "[Candidate]",
    `Name: ${profile.name}`,
    `Email: ${profile.email}`,
    `Phone: ${profile.phone}`,
    `LinkedIn: ${profile.linkedin}`,
    `Location: ${profile.location}`,
    `Country: ${profile.country}`,
    `Experience: ${profile.experience}`,
    `Visa sponsorship: ${profile.visaSponsorship}`,
    `Salary expectation: ${profile.salaryExpectation}`,
    `Stack summary: ${profile.stackSummary}`,
    `About: ${profile.about}`,
    "",
    "[Vacancy]",
    `Company: ${job.company}`,
    `Title: ${job.title}`,
    `Status: ${job.status}`,
    `Source: ${job.source}`,
    `Zone: ${job.zone}`,
    `Region: ${job.region}`,
    `Salary label: ${job.salaryLabel}`,
    `Salary currency: ${job.salaryCurrency}`,
    `Salary range USD: ${buildSalaryRange(job)}`,
    `Link: ${job.link}`,
    `Checked at: ${job.checkedAt}`,
    `Added at: ${job.addedAt}`,
    `Fit reason: ${job.fitReason || "No note"}`,
    `Stack: ${job.stack.join(" / ") || "No stack"}`,
    `Notes: ${job.notes || "No notes"}`,
    "",
    "[Cover]",
    `Language: ${isLikelyEnglishJob(job) ? "English" : "Spanish"}`,
    "Draft:",
    coverDraft,
    "",
    "[Existing cover]",
    job.cover || "No cover saved yet",
  ].join("\n");
}
function buildJobFormLabel(job: JobRecord) {
  return `${job.company} - ${job.title}`;
}

function matchesText(job: JobRecord, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    job.company,
    job.title,
    job.salaryLabel,
    job.salaryCurrency,
    job.zone,
    job.region,
    job.source,
    job.fitReason,
    job.notes,
    job.cover,
    job.stack.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function statusLabel(status: JobStatus) {
  const labels: Record<JobStatus, string> = {
    pendiente: "Pendiente",
    para_aplicar: "Para aplicar",
    aplicado: "Aplicado",
    skipeado: "Skipeado",
    no_entra_en_planes: "No es aplicable",
    no_disponible: "No disponible",
    follow_up: "Follow up",
    en_espera: "En espera",
    rechazado: "Rechazado",
    bloqueado: "Bloqueado",
    guardado_para_despues: "Guardado",
  };

  return labels[status];
}

function statusClass(status: JobStatus) {
  const classes: Record<JobStatus, string> = {
    pendiente: "border-slate-500/20 bg-slate-500/10 text-slate-200",
    para_aplicar: "border-blue-400/20 bg-blue-500/10 text-blue-100",
    aplicado: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    skipeado: "border-amber-400/20 bg-amber-500/10 text-amber-100",
    no_entra_en_planes: "border-rose-400/20 bg-rose-500/10 text-rose-100",
    no_disponible: "border-zinc-400/20 bg-zinc-500/10 text-zinc-100",
    follow_up: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
    en_espera: "border-violet-400/20 bg-violet-500/10 text-violet-100",
    rechazado: "border-red-400/20 bg-red-500/10 text-red-100",
    bloqueado: "border-orange-400/20 bg-orange-500/10 text-orange-100",
    guardado_para_despues: "border-white/12 bg-white/5 text-white",
  };

  return classes[status];
}

function filterSetHasAll(jobValues: string[], activeValues: Set<string>) {
  if (activeValues.size === 0) {
    return true;
  }

  return jobValues.some((value) => activeValues.has(value));
}

function supportsSalary(job: JobRecord, min: number | null, max: number | null) {
  if (min === null && max === null) {
    return true;
  }

  const jobMin = job.salaryUsdMin;
  const jobMax = job.salaryUsdMax;

  if (jobMin === null && jobMax === null) {
    return false;
  }

  const resolvedMin = jobMin ?? jobMax ?? 0;
  const resolvedMax = jobMax ?? jobMin ?? 0;

  if (min !== null && resolvedMax < min) {
    return false;
  }

  if (max !== null && resolvedMin > max) {
    return false;
  }

  return true;
}

function getVisibleSalaryLabel(job: JobRecord) {
  return `${job.salaryLabel} · ${job.salaryCurrency}`;
}

function buildJobCardSubtitle(job: JobRecord) {
  return `${job.zone} · ${job.region}`;
}

function formatJobsSearchAt(value: string) {
  if (!value) {
    return "Sin registro";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(date);
}

function buildStatusColumns(jobs: JobRecord[]) {
  const grouped = new Map<JobStatus, JobRecord[]>(
    jobStatuses.map((status) => [status, []]),
  );

  jobs.forEach((job) => {
    grouped.get(job.status)?.push(job);
  });

  return jobStatuses.map((status) => ({
    status,
    jobs: grouped.get(status) ?? [],
  }));
}

const jobStatusSelectClassName =
  "mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm font-medium text-white outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:border-blue-400/70 focus:bg-slate-950 focus:ring-2 focus:ring-blue-400/15";

async function writeToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("clipboard_unavailable");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("clipboard_unavailable");
  }
}

export function JobsDashboard({
  initialContent,
}: {
  initialContent: JobsContent;
}) {
  const [content, setContent] = useState<JobsContent>(() =>
    cloneContent(initialContent),
  );
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() =>
    getSnapshot(initialContent),
  );
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialContent.jobs[0]?.id ?? "",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | JobStatus>("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [salaryMinFilter, setSalaryMinFilter] = useState("");
  const [salaryMaxFilter, setSalaryMaxFilter] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "salary-desc" | "salary-asc" | "az" | "recent">("priority");
  const [activeStackFilters, setActiveStackFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<JobsViewMode>(loadJobsViewMode);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<JobStatus | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const latestSnapshotRef = useRef(getSnapshot(initialContent));

  const changeViewMode = (nextViewMode: JobsViewMode) => {
    setViewMode(nextViewMode);
    window.localStorage.setItem(JOBS_VIEW_MODE_STORAGE_KEY, nextViewMode);
  };

  useEffect(() => {
    const nextContent = cloneContent(initialContent);
    setContent(nextContent);
    setSavedSnapshot(getSnapshot(nextContent));
    setSelectedJobId(nextContent.jobs[0]?.id ?? "");
    latestSnapshotRef.current = getSnapshot(nextContent);
  }, [initialContent]);

  useEffect(() => {
    let isCancelled = false;

    const browserContent = cloneContent(loadJobsContentFromBrowser());
    setContent(browserContent);
    setSavedSnapshot(getSnapshot(browserContent));
    setSelectedJobId(browserContent.jobs[0]?.id ?? "");
    latestSnapshotRef.current = getSnapshot(browserContent);

    (async () => {
      const fileContent = await loadJobsContentFromFile();
      if (!fileContent || isCancelled) {
        return;
      }

      const normalized = cloneContent(fileContent);
      saveJobsContentToBrowser(normalized);
      setContent(normalized);
      setSavedSnapshot(getSnapshot(normalized));
      setSelectedJobId(normalized.jobs[0]?.id ?? "");
      latestSnapshotRef.current = getSnapshot(normalized);
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  const availableStacks = useMemo(() => {
    return Array.from(new Set(content.jobs.flatMap((job) => job.stack))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [content.jobs]);

  const availableZones = useMemo(() => {
    return Array.from(new Set(content.jobs.map((job) => job.zone))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [content.jobs]);

  const availableRegions = useMemo(() => {
    return Array.from(new Set(content.jobs.map((job) => job.region))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [content.jobs]);

  const availableSources = useMemo(() => {
    return Array.from(new Set(content.jobs.map((job) => job.source))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [content.jobs]);

  const filteredJobs = useMemo(() => {
    const minSalary =
      salaryMinFilter.trim() === ""
        ? null
        : Number.parseInt(salaryMinFilter, 10);
    const maxSalary =
      salaryMaxFilter.trim() === ""
        ? null
        : Number.parseInt(salaryMaxFilter, 10);
    const activeStackSet = new Set(activeStackFilters);

    const jobs = content.jobs.filter((job) => {
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false;
      }

      if (zoneFilter !== "all" && job.zone !== zoneFilter) {
        return false;
      }

      if (regionFilter !== "all" && job.region !== regionFilter) {
        return false;
      }

      if (sourceFilter !== "all" && job.source !== sourceFilter) {
        return false;
      }

      if (!supportsSalary(job, minSalary, maxSalary)) {
        return false;
      }

      if (!filterSetHasAll(job.stack, activeStackSet)) {
        return false;
      }

      if (!matchesText(job, searchQuery)) {
        return false;
      }

      return true;
    });

    const sorted = [...jobs];
    switch (sortBy) {
      case "salary-desc":
        sorted.sort((a, b) => (b.salaryUsdMax ?? b.salaryUsdMin ?? -1) - (a.salaryUsdMax ?? a.salaryUsdMin ?? -1));
        break;
      case "salary-asc":
        sorted.sort((a, b) => (a.salaryUsdMin ?? a.salaryUsdMax ?? Number.POSITIVE_INFINITY) - (b.salaryUsdMin ?? b.salaryUsdMax ?? Number.POSITIVE_INFINITY));
        break;
      case "az":
        sorted.sort((a, b) => `${a.company} ${a.title}`.localeCompare(`${b.company} ${b.title}`));
        break;
      case "recent":
        sorted.sort((a, b) => Date.parse(b.lastTouchedAt) - Date.parse(a.lastTouchedAt));
        break;
      default:
        sorted.sort((a, b) => {
          const priorityOrder: Record<JobStatus, number> = {
            para_aplicar: 0,
            pendiente: 1,
            guardado_para_despues: 2,
            en_espera: 3,
            follow_up: 4,
            aplicado: 5,
            skipeado: 6,
            no_entra_en_planes: 7,
            no_disponible: 8,
            rechazado: 9,
            bloqueado: 10,
          };

          return (
            priorityOrder[a.status] - priorityOrder[b.status] ||
            (b.salaryUsdMax ?? b.salaryUsdMin ?? 0) - (a.salaryUsdMax ?? a.salaryUsdMin ?? 0)
          );
        });
    }

    return sorted;
  }, [
    activeStackFilters,
    content.jobs,
    regionFilter,
    salaryMaxFilter,
    salaryMinFilter,
    searchQuery,
    sortBy,
    sourceFilter,
    statusFilter,
    zoneFilter,
  ]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE)),
    [filteredJobs.length],
  );

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }, [currentPage, filteredJobs]);

  const boardColumns = useMemo(() => buildStatusColumns(filteredJobs), [filteredJobs]);

  const selectedJob = useMemo(() => {
    if (viewMode === "board") {
      return (
        filteredJobs.find((job) => job.id === selectedJobId) ??
        content.jobs.find((job) => job.id === selectedJobId) ??
        filteredJobs[0] ??
        content.jobs[0] ??
        null
      );
    }

    return (
      paginatedJobs.find((job) => job.id === selectedJobId) ??
      paginatedJobs[0] ??
      filteredJobs.find((job) => job.id === selectedJobId) ??
      filteredJobs[0] ??
      content.jobs.find((job) => job.id === selectedJobId) ??
      content.jobs[0] ??
      null
    );
  }, [content.jobs, filteredJobs, paginatedJobs, selectedJobId, viewMode]);

  useEffect(() => {
    if (!selectedJob) {
      return;
    }

    if (selectedJob.id !== selectedJobId) {
      setSelectedJobId(selectedJob.id);
    }
  }, [selectedJob, selectedJobId]);

  const hasUnsavedChanges = useMemo(
    () => getSnapshot(content) !== savedSnapshot,
    [content, savedSnapshot],
  );

  useEffect(() => {
    latestSnapshotRef.current = getSnapshot(content);
  }, [content]);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    const snapshotToSave = getSnapshot(content);
    const contentToSave = cloneContent(content);
    const timeoutId = window.setTimeout(() => {
      if (latestSnapshotRef.current !== snapshotToSave) {
        return;
      }

      startTransition(async () => {
        try {
          const result = await saveJobsContent(contentToSave);

          if (latestSnapshotRef.current !== snapshotToSave) {
            return;
          }

          setContent(result.content);
          setSavedSnapshot(getSnapshot(result.content));
          latestSnapshotRef.current = getSnapshot(result.content);
          setStatusMessage(
            result.persistedToFile
              ? "Cambios guardados automáticamente en el proyecto."
              : "Cambios guardados automáticamente en el navegador.",
          );
        } catch {
          setStatusMessage("No se pudo guardar automáticamente el tablero de jobs.");
        }
      });
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [content, hasUnsavedChanges, startTransition]);

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

  useEffect(() => {
    if (filteredJobs.length === 0) {
      return;
    }

    if (!filteredJobs.some((job) => job.id === selectedJobId)) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, selectedJobId]);

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (viewMode !== "list" || paginatedJobs.length === 0) {
      return;
    }

    if (!paginatedJobs.some((job) => job.id === selectedJobId)) {
      setSelectedJobId(paginatedJobs[0].id);
    }
  }, [paginatedJobs, selectedJobId, viewMode]);

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(
      jobStatuses.map((status) => [status, 0]),
    ) as Record<JobStatus, number>;

    content.jobs.forEach((job) => {
      counts[job.status] += 1;
    });

    return counts;
  }, [content.jobs]);

  const totalSalaryVisible = useMemo(
    () => content.jobs.filter((job) => job.salaryUsdMin !== null || job.salaryUsdMax !== null).length,
    [content.jobs],
  );

  const moveJobToStatus = (id: string, status: JobStatus) => {
    setContent((current) => ({
      ...current,
      jobs: current.jobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status,
              lastTouchedAt: new Date().toISOString(),
            }
          : job,
      ),
    }));
  };

  const updateJob = (id: string, updater: (job: JobRecord) => JobRecord) => {
    setContent((current) => ({
      ...current,
      jobs: current.jobs.map((job) =>
        job.id === id ? updater(job) : job,
      ),
    }));
  };

  const saveChanges = () => {
    setStatusMessage(null);

    startTransition(async () => {
      try {
        const result = await saveJobsContent(content);
        setContent(result.content);
        setSavedSnapshot(getSnapshot(result.content));
        setStatusMessage(
          result.persistedToFile
            ? "Cambios guardados en el proyecto."
            : "Cambios guardados en el navegador.",
        );
      } catch {
        setStatusMessage("No se pudo guardar el tablero de jobs.");
      }
    });
  };

  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await writeToClipboard(text);
      setStatusMessage(successMessage);
    } catch {
      setStatusMessage("No se pudo copiar el texto. Usa el bloque visible de autofill.");
    }
  };

  const handleAssistedAutofill = () => {
    if (!selectedJob) {
      return;
    }

    const openedWindow = window.open(selectedJob.link, "_blank", "noopener,noreferrer");

    void writeToClipboard(selectedJobPack)
      .then(() => {
        setStatusMessage(
          openedWindow
            ? "Vacante abierta. Autofill copiado."
            : "Autofill copiado. El navegador bloqueo la nueva pestaña.",
        );
      })
      .catch(() => {
        setStatusMessage(
          openedWindow
            ? "Vacante abierta. Usa el bloque visible de autofill."
            : "No se pudo abrir la vacante ni copiar el autofill.",
        );
      });
  };

  const toggleStackFilter = (stack: string) => {
    setActiveStackFilters((current) =>
      current.includes(stack)
        ? current.filter((entry) => entry !== stack)
        : [...current, stack],
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setZoneFilter("all");
    setRegionFilter("all");
    setSourceFilter("all");
    setSalaryMinFilter("");
    setSalaryMaxFilter("");
    setSortBy("priority");
    setActiveStackFilters([]);
    setCurrentPage(1);
  };

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, jobId: string) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", jobId);
    setDraggedJobId(jobId);
  };

  const handleDragEnd = () => {
    setDraggedJobId(null);
    setDropTargetStatus(null);
  };

  const handleDropOnStatus = (event: React.DragEvent<HTMLDivElement>, status: JobStatus) => {
    event.preventDefault();
    event.stopPropagation();

    const jobId = event.dataTransfer.getData("text/plain") || draggedJobId;
    if (!jobId) {
      handleDragEnd();
      return;
    }

    const job = content.jobs.find((entry) => entry.id === jobId);
    if (!job || job.status === status) {
      handleDragEnd();
      return;
    }

    moveJobToStatus(jobId, status);
    setSelectedJobId(jobId);
    setViewMode("board");
    setStatusMessage(`Movido a ${statusLabel(status)}.`);
    handleDragEnd();
  };

  const handleDragOverStatus = (event: React.DragEvent<HTMLDivElement>, status: JobStatus) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dropTargetStatus !== status) {
      setDropTargetStatus(status);
    }
  };

  const goToPage = (page: number) => {
    const boundedPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(boundedPage);
  };

  const pageStart = filteredJobs.length === 0 ? 0 : (currentPage - 1) * JOBS_PER_PAGE + 1;
  const pageEnd = Math.min(currentPage * JOBS_PER_PAGE, filteredJobs.length);

  const selectedJobPack = selectedJob
    ? buildAutofillPack(content, selectedJob)
    : "";
  const lastJobsSearchLabel = formatJobsSearchAt(content.lastJobsSearchAt);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_400px]">
      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-5 shadow-[0_30px_60px_-42px_rgba(2,6,23,0.95)] backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-white/10 bg-slate-950/75 p-1">
            <button
              type="button"
              onClick={() => changeViewMode("list")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                viewMode === "list"
                  ? "bg-blue-500/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List size={14} />
              Lista
            </button>
            <button
              type="button"
              onClick={() => changeViewMode("board")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                viewMode === "board"
                  ? "bg-blue-500/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} />
              Columnas
            </button>
          </div>

          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            {viewMode === "list" ? "Vista de tabla" : "Vista kanban"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Vacantes", value: content.jobs.length },
            { label: "Con salario visible", value: totalSalaryVisible },
            { label: "Listas para aplicar", value: statusCounts.para_aplicar },
            { label: "Guardadas", value: statusCounts.guardado_para_despues },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-white/8 bg-white/3 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-blue-200">
                <Filter size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Filtros</h3>
                <p className="text-sm text-slate-400">
                  Filtra por stack, estado, salario, región, zona y proveedor.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersOpen(true)}
                className="gap-2"
              >
                <SlidersHorizontal size={14} />
                Abrir filtros
              </Button>
              <Button variant="outline" size="sm" onClick={resetFilters} className="gap-2">
                <X size={14} />
                Limpiar
              </Button>
            </div>
          </div>
        </div>

        {isFiltersOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/75 p-4 pt-16 backdrop-blur-sm"
            onClick={() => setIsFiltersOpen(false)}
          >
            <div
              className="w-full max-w-5xl rounded-[1.75rem] border border-white/10 bg-slate-950 p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Filtros de jobs</h3>
                  <p className="text-sm text-slate-400">Ajusta la búsqueda y cierra el panel al terminar.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(false)}
                  className="gap-2"
                  aria-label="Cerrar filtros"
                >
                  <X size={14} />
                  Cerrar
                </Button>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                <Search size={14} />
                Buscar
              </span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Empresa, puesto, cover, stack..."
                className="mt-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Estado
              </span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | JobStatus)
                }
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option value="all">Todos</option>
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Zona
              </span>
              <select
                value={zoneFilter}
                onChange={(event) => setZoneFilter(event.target.value)}
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option value="all">Todas</option>
                {availableZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Región
              </span>
              <select
                value={regionFilter}
                onChange={(event) => setRegionFilter(event.target.value)}
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option value="all">Todas</option>
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Fuente
              </span>
              <select
                value={sourceFilter}
                onChange={(event) => setSourceFilter(event.target.value)}
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option value="all">Todas</option>
                {availableSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Salario min USD
              </span>
              <input
                value={salaryMinFilter}
                onChange={(event) => setSalaryMinFilter(event.target.value)}
                inputMode="numeric"
                placeholder="2000"
                className="mt-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Salario max USD
              </span>
              <input
                value={salaryMaxFilter}
                onChange={(event) => setSalaryMaxFilter(event.target.value)}
                inputMode="numeric"
                placeholder="250000"
                className="mt-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />
            </label>

            <label className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Orden
              </span>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as
                      | "priority"
                      | "salary-desc"
                      | "salary-asc"
                      | "az"
                      | "recent",
                  )
                }
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option value="priority">Prioridad</option>
                <option value="salary-desc">Salario alto</option>
                <option value="salary-asc">Salario bajo</option>
                <option value="az">A-Z</option>
                <option value="recent">Reciente</option>
              </select>
            </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {availableStacks.map((stack) => {
                  const active = activeStackFilters.includes(stack);
                  return (
                    <button
                      key={stack}
                      type="button"
                      onClick={() => toggleStackFilter(stack)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-blue-400/40 bg-blue-500/15 text-blue-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/8"
                      }`}
                    >
                      {stack}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewMode === "list" ? (
          <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-white/8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/8 text-left">
                <thead className="bg-slate-950/85">
                  <tr className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    <th className="px-4 py-4">Puesto</th>
                    <th className="px-4 py-4">Salario</th>
                    <th className="px-4 py-4">Zona</th>
                    <th className="px-4 py-4">Link de aplicación</th>
                    <th className="px-4 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6 bg-slate-950/40">
                  {paginatedJobs.map((job) => {
                    const isSelected = job.id === selectedJob?.id;
                    return (
                      <tr
                        key={job.id}
                        className={`cursor-pointer transition ${
                          isSelected ? "bg-blue-500/8" : "hover:bg-white/4"
                        }`}
                        onClick={() => setSelectedJobId(job.id)}
                      >
                        <td className="px-4 py-4 align-top">
                          <div className="font-medium text-white">{job.title}</div>
                          <div className="mt-1 text-sm text-slate-400">{job.company}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {job.stack.map((stack) => (
                              <span
                                key={stack}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300"
                              >
                                {stack}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-slate-300">
                          <div className="font-medium text-white">{job.salaryLabel}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            Moneda visible: {job.salaryCurrency}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            Normalizado USD: {buildSalaryRange(job)}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-slate-300">
                          <div>{job.zone}</div>
                          <div className="mt-1 text-xs text-slate-500">{job.region}</div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                          >
                            Abrir
                            <ExternalLink size={14} />
                          </a>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClass(job.status)}`}
                          >
                            {statusLabel(job.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="border-t border-white/8 px-4 py-8 text-sm text-slate-400">
                No hay vacantes con esos filtros.
              </div>
            ) : (
              <div className="flex flex-col gap-3 border-t border-white/8 px-4 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                <p>
                  Mostrando {pageStart}-{pageEnd} de {filteredJobs.length}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    Anterior
                  </Button>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {currentPage} / {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.75rem] border border-white/8 bg-slate-950/40 p-4">
            {filteredJobs.length === 0 ? (
              <div className="px-2 py-10 text-center text-sm text-slate-400">
                No hay vacantes con esos filtros.
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto max-h-[75vh] pb-2">
                {boardColumns.map(({ status, jobs }) => {
                  const isDropTarget = dropTargetStatus === status;

                  return (
                    <div
                      key={status}
                      onDragOver={(event) => handleDragOverStatus(event, status)}
                      onDragLeave={() => {
                        if (dropTargetStatus === status) {
                          setDropTargetStatus(null);
                        }
                      }}
                      onDrop={(event) => handleDropOnStatus(event, status)}
                      className={`w-[320px] shrink-0 rounded-[1.5rem] border p-3 max-h-[65vh] overflow-y-scroll transition ${
                        isDropTarget
                          ? "border-blue-400/60 bg-blue-500/10"
                          : "border-white/8 bg-slate-950/55"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {statusLabel(status)}
                          </h4>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                            {jobs.length} vacantes
                          </p>
                        </div>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClass(status)}`}>
                          {jobs.length}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-3">
                        {jobs.map((job) => {
                          const isSelected = job.id === selectedJob?.id;
                          const isDragging = draggedJobId === job.id;

                          return (
                            <button
                              key={job.id}
                              type="button"
                              draggable
                              onDragStart={(event) => handleDragStart(event, job.id)}
                              onDragEnd={handleDragEnd}
                              onClick={() => setSelectedJobId(job.id)}
                              className={`rounded-[1.2rem] border p-3 text-left transition ${
                                isSelected
                                  ? "border-blue-400/50 bg-blue-500/10"
                                  : "border-white/8 bg-slate-950/70 hover:border-white/15 hover:bg-slate-950/90"
                              } ${isDragging ? "opacity-50" : ""}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    {job.title}
                                  </div>
                                  <div className="mt-1 text-xs text-slate-400">
                                    {job.company}
                                  </div>
                                </div>
                                <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusClass(job.status)}`}>
                                  {statusLabel(job.status)}
                                </span>
                              </div>

                              <div className="mt-3 grid gap-2 text-xs text-slate-400">
                                <div className="flex items-center justify-between gap-3">
                                  <span>Salario</span>
                                  <span className="text-slate-200">{job.salaryLabel}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                  <span>Zona</span>
                                  <span className="text-slate-200">{buildJobCardSubtitle(job)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                  <span>Fuente</span>
                                  <span className="text-slate-200">{job.source}</span>
                                </div>
                              </div>

                              {job.cover ? (
                                <p className="mt-3 line-clamp-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-xs leading-5 text-slate-300">
                                  {job.cover}
                                </p>
                              ) : job.notes ? (
                                <p className="mt-3 line-clamp-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-xs leading-5 text-slate-300">
                                  {job.notes}
                                </p>
                              ) : null}

                              <div className="mt-3 flex items-center justify-between gap-2">
                                <a
                                  href={job.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                                >
                                  Abrir
                                  <ExternalLink size={12} />
                                </a>
                                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                  Arrastra aquí
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/8 bg-slate-950/55 p-5 shadow-[0_30px_60px_-42px_rgba(2,6,23,0.95)] backdrop-blur xl:sticky xl:top-4 xl:self-start">
        {selectedJob ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-blue-300/80">
                  Detalle
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {buildJobFormLabel(selectedJob)}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {selectedJob.source} · {selectedJob.zone} · {selectedJob.region}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Estado
                </span>
                <select
                  value={selectedJob.status}
                  onChange={(event) =>
                    updateJob(selectedJob.id, (current) => ({
                      ...current,
                      status: event.target.value as JobStatus,
                      lastTouchedAt: new Date().toISOString(),
                    }))
                  }
                  className={jobStatusSelectClassName}
                  style={{ colorScheme: "dark" }}
                >
                  {jobStatuses.map((status) => (
                    <option key={status} value={status} className="bg-slate-950 text-white">
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Cover adaptado
                </span>
                <textarea
                  value={selectedJob.cover}
                  onChange={(event) =>
                    updateJob(selectedJob.id, (current) => ({
                      ...current,
                      cover: event.target.value,
                      lastTouchedAt: new Date().toISOString(),
                    }))
                  }
                  rows={8}
                  className="mt-3 w-full resize-y rounded-2xl border border-white/8 bg-slate-950/55 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600"
                />
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Notas internas
                </span>
                <textarea
                  value={selectedJob.notes}
                  onChange={(event) =>
                    updateJob(selectedJob.id, (current) => ({
                      ...current,
                      notes: event.target.value,
                      lastTouchedAt: new Date().toISOString(),
                    }))
                  }
                  rows={4}
                  className="mt-3 w-full resize-y rounded-2xl border border-white/8 bg-slate-950/55 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(
                    selectedJob.cover,
                    "Cover copiado al portapapeles.",
                  )
                }
                className="gap-2"
              >
                <Copy size={14} />
                Copiar cover
              </Button>
              <Button
                variant="outline"
                onClick={handleAssistedAutofill}
                className="gap-2"
              >
                <Send size={14} />
                Copiar y abrir
              </Button>

              <Button
                variant="primary"
                onClick={() => window.open(selectedJob.link, "_blank", "noopener,noreferrer")}
                className="gap-2"
              >
                <ExternalLink size={14} />
                Abrir vacante
              </Button>

              <Button
                variant="secondary"
                onClick={saveChanges}
                className="gap-2"
              >
                {isPending ? <LoaderCircle size={14} className="animate-spin" /> : <Save size={14} />}
                Guardar
              </Button>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-white/8 bg-white/4 p-4">
              <h4 className="text-sm font-semibold text-white">Autofill asistido</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Copia el bloque con tus datos y el cover adaptado. Luego pégalo en el formulario de la vacante.
              </p>

              <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-white/8 bg-slate-950/70 p-4 text-xs leading-6 text-slate-300 whitespace-pre-wrap">
                {selectedJobPack}
              </pre>
            </div>

            <div className="mt-5 grid gap-3 rounded-[1.75rem] border border-white/8 bg-white/4 p-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Stack</span>
                <span>{selectedJob.stack.join(" · ")}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Salario</span>
                <span>{getVisibleSalaryLabel(selectedJob)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Rango USD</span>
                <span>{buildSalaryRange(selectedJob)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Fit reason</span>
                <span className="text-right">{selectedJob.fitReason || "Sin nota"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Checked at</span>
                <span>{selectedJob.checkedAt}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Added at</span>
                <span>{selectedJob.addedAt}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-white/10 p-6 text-sm text-slate-400">
            No hay una vacante seleccionada.
          </div>
        )}
      </section>

      <section className="xl:col-span-2 rounded-[2rem] border border-white/8 bg-slate-950/45 px-5 py-4 text-sm text-slate-400 shadow-[0_20px_40px_-30px_rgba(2,6,23,0.8)] backdrop-blur">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p>
            Última búsqueda de jobs:
            <span className="ml-2 font-medium text-white">{lastJobsSearchLabel}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Se actualiza cuando corre la tarea programada
          </p>
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

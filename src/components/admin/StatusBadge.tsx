type StatusBadgeProps = {
  enabled: boolean;
};

export function StatusBadge({ enabled }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
        enabled
          ? "border border-emerald-300/25 bg-emerald-500/15 text-emerald-300 shadow-[0_10px_22px_-16px_rgba(16,185,129,0.75)]"
          : "border border-white/10 bg-white/8 text-slate-400 shadow-[0_10px_20px_-16px_rgba(15,23,42,0.9)]"
      }`}
    >
      {enabled ? "Activo" : "Oculto"}
    </span>
  );
}

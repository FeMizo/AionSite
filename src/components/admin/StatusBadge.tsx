type StatusBadgeProps = {
  enabled: boolean;
};

export function StatusBadge({ enabled }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
        enabled
          ? "bg-emerald-500/15 text-emerald-300"
          : "bg-white/8 text-slate-400"
      }`}
    >
      {enabled ? "Activo" : "Oculto"}
    </span>
  );
}

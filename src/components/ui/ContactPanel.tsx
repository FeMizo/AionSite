import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { LinkButton } from "@/src/components/ui/LinkButton";

interface ContactAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary" | "ghost";
  icon?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
}

interface ContactPanelProps {
  title: string;
  description: string;
  note?: string;
  actions: readonly ContactAction[];
}

export function ContactPanel({
  title,
  description,
  note,
  actions,
}: ContactPanelProps) {
  return (
    <Card className="relative overflow-hidden rounded-[2rem] border-blue-400/20 bg-gradient-to-br from-blue-600/15 via-slate-900 to-slate-950 p-8 md:p-10">
      <div className="absolute -left-14 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
          Contacto
        </p>
        <h3 className="mt-4 max-w-2xl text-3xl font-semibold text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {actions.map((action) => (
            <LinkButton
              key={action.href}
              href={action.href}
              variant={action.variant ?? "primary"}
              size="lg"
              target={action.target}
              rel={action.rel}
              className="gap-2"
            >
              {action.icon}
              {action.label}
              <ArrowUpRight size={16} />
            </LinkButton>
          ))}
        </div>

        {note ? (
          <p className="mt-6 text-sm font-medium text-slate-400">{note}</p>
        ) : null}
      </div>
    </Card>
  );
}

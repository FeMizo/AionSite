import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/src/components/ui/button-styles";
import { resolvePageHref } from "@/src/lib/site-pages";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
}

export function LinkButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  target,
  rel,
}: LinkButtonProps) {
  return (
    <a
      href={resolvePageHref(href)}
      target={target}
      rel={rel}
      className={getButtonClassName({ variant, size, className })}
    >
      {children}
    </a>
  );
}

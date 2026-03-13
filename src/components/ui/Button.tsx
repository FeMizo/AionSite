"use client";

import * as React from "react";
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/src/components/ui/button-styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={getButtonClassName({ variant, size, className })}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

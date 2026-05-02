"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/src/components/ui/button-styles";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={getButtonClassName({ variant, size, className })}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

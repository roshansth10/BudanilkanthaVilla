import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import { useSplitText, type SplitTextOptions, type SplitTextVariant } from "@/hooks/useSplitText";
import { cn } from "@/lib/utils";

export interface SplitTextProps<T extends ElementType = "div">
  extends ComponentPropsWithoutRef<T>,
    SplitTextOptions {
  as?: T;
  children: React.ReactNode;
}

export function SplitText<T extends ElementType = "div">({
  as,
  children,
  className,
  variant = "heading",
  type = "lines",
  stagger,
  delay,
  duration,
  ease,
  start,
  ...props
}: SplitTextProps<T>) {
  const Component = as || (variant === "heading" ? "h2" : variant === "body" ? "p" : "span");
  const ref = useSplitText<HTMLElement>({
    variant,
    type,
    stagger,
    delay,
    duration,
    ease,
    start,
  });

  return (
    <Component
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}

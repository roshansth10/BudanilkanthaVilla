import React, { type ComponentPropsWithoutRef } from "react";
import { useImageReveal, type ImageRevealOptions } from "@/hooks/useImageReveal";
import { cn } from "@/lib/utils";

export interface RevealImageProps extends ComponentPropsWithoutRef<"div"> {
  src: string;
  alt: string;
  imgClassName?: string;
  options?: ImageRevealOptions;
  aspectRatio?: string;
}

export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  options,
  aspectRatio,
  style,
  ...props
}: RevealImageProps) {
  const wrapRef = useImageReveal<HTMLDivElement>(options);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden bg-stone", className)}
      style={{ aspectRatio, ...style }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn("size-full object-cover", imgClassName)}
        loading="lazy"
      />
    </div>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export type SplitTextVariant = "heading" | "body" | "label";
export type SplitTextType = "lines" | "words";

export interface SplitTextOptions {
  variant?: SplitTextVariant;
  type?: SplitTextType;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  start?: string;
  trigger?: HTMLElement | null;
}

export function useSplitText<T extends HTMLElement = HTMLHeadingElement>(
  options: SplitTextOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    const {
      variant = "heading",
      type = "lines",
      stagger = variant === "heading" ? 0.08 : variant === "body" ? 0.06 : 0,
      delay = 0,
      duration = variant === "label" ? 0.8 : 1.0,
      ease = "power4.out",
      start = "top 85%",
      trigger = el,
    } = options;

    if (!el.getAttribute("aria-label")) {
      el.setAttribute("aria-label", el.textContent?.trim().replace(/\s+/g, " ") || "");
    }

    let split: SplitType | null = null;
    const ctx = gsap.context(() => {
      if (variant === "label") {
        gsap.set(el, { y: 20, opacity: 0, willChange: "transform, opacity" });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: trigger || el,
            start,
            once: true,
          },
          onComplete: () => {
            gsap.set(el, { clearProps: "transform,willChange" });
          },
        });
        return;
      }

      split = new SplitType(el, { types: type });
      const targets = type === "lines" ? split.lines : split.words;
      if (!targets || !targets.length) return;

      if (variant === "heading") {
        split.lines?.forEach((line) => {
          line.setAttribute("aria-hidden", "true");
          const mask = document.createElement("div");
          mask.className = "line-mask";
          mask.setAttribute("aria-hidden", "true");
          mask.style.overflow = "hidden";
          mask.style.display = "block";
          mask.style.paddingBottom = "0.22em";
          mask.style.marginBottom = "-0.22em";
          line.parentNode?.insertBefore(mask, line);
          mask.appendChild(line);
        });

        gsap.set(targets, { yPercent: 110, opacity: 0, willChange: "transform, opacity" });
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: trigger || el,
            start,
            once: true,
          },
          onComplete: () => {
            gsap.set(targets, { clearProps: "transform,willChange" });
          },
        });
      } else {
        targets.forEach((t) => {
          t.setAttribute("aria-hidden", "true");
          t.style.display = "block";
        });

        gsap.set(targets, { y: 24, opacity: 0, willChange: "transform, opacity" });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: trigger || el,
            start,
            once: true,
          },
          onComplete: () => {
            gsap.set(targets, { clearProps: "transform,willChange" });
          },
        });
      }
    }, el);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, [
    options.delay,
    options.duration,
    options.ease,
    options.stagger,
    options.start,
    options.type,
    options.variant,
  ]);

  return ref;
}

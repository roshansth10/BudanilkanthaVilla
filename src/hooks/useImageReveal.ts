import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ImageRevealOptions {
  trigger?: HTMLElement | null;
  start?: string;
  duration?: number;
  ease?: string;
  scaleFrom?: number;
  scaleTo?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  options: ImageRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.clipPath = "none";
      const img = el.querySelector("img");
      if (img) img.style.transform = "none";
      return;
    }

    const {
      trigger = el,
      start = "top 85%",
      duration = 1.3,
      ease = "power4.out",
      scaleFrom = 1.2,
      scaleTo = 1,
      delay = 0,
      onComplete,
    } = options;

    const innerImg = el.querySelector("img, .img-reveal-inner, .amenity-img, .gallery-img");

    el.style.overflow = "hidden";
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" });
    if (innerImg) {
      gsap.set(innerImg, { scale: scaleFrom, willChange: "transform" });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || el,
          start,
          once: true,
        },
        delay,
        onComplete: () => {
          el.classList.add("is-revealed");
          gsap.set(el, { clearProps: "clipPath,willChange" });
          if (innerImg) {
            gsap.set(innerImg, { clearProps: "transform,willChange" });
          }
          if (onComplete) onComplete();
        },
      });

      tl.to(
        el,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          ease,
        },
        0
      );

      if (innerImg) {
        tl.to(
          innerImg,
          {
            scale: scaleTo,
            duration,
            ease,
          },
          0
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [options.delay, options.duration, options.ease, options.scaleFrom, options.scaleTo, options.start]);

  return ref;
}

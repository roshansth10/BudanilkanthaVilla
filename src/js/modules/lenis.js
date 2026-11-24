import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { syncCursorTheme } from './cursor.js';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerFn = null;

export function initLenis() {
  if (typeof window === 'undefined') return null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    destroyLenis();
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Strict integration as requested:
  // lenis.on('scroll', ScrollTrigger.update);
  // gsap.ticker.add(t => lenis.raf(t*1000));
  // gsap.ticker.lagSmoothing(0);
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
    syncCursorTheme();
  });

  tickerFn = (time) => {
    lenisInstance.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroyLenis() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

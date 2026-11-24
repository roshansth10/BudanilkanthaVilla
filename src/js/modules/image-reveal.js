import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let revealTriggers = [];

export const IMAGE_REVEAL_CONFIG = {
  duration: 1.3,
  ease: 'power4.out',
  start: 'top 85%',
  scaleFrom: 1.2,
  scaleTo: 1,
};

/**
 * Reusable Image Reveal function (Single Source of Truth)
 * Animates clip-path from inset(100% 0 0 0) to inset(0 0 0 0)
 * while scaling inner image from 1.2 to 1.
 * Triggered ONLY by scroll position (trigger: wrapEl, start: "top 85%", once: true).
 * Clears inline transforms on completion to preserve CSS hover effects.
 */
export function revealImage(wrapEl, options = {}) {
  if (!wrapEl) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    wrapEl.classList.add('is-revealed');
    wrapEl.style.clipPath = 'none';
    const img = wrapEl.querySelector('img, video, .img-reveal-inner, .amenity-img, .gallery-img');
    if (img) img.style.transform = 'none';
    return null;
  }

  const {
    trigger = wrapEl,
    start = IMAGE_REVEAL_CONFIG.start,
    duration = IMAGE_REVEAL_CONFIG.duration,
    ease = IMAGE_REVEAL_CONFIG.ease,
    scaleFrom = IMAGE_REVEAL_CONFIG.scaleFrom,
    scaleTo = IMAGE_REVEAL_CONFIG.scaleTo,
    delay = 0,
    onComplete = null,
  } = options;

  const innerImg = wrapEl.querySelector('img, video, .img-reveal-inner, .amenity-img, .gallery-img');

  wrapEl.style.overflow = 'hidden';
  gsap.set(wrapEl, { clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' });
  if (innerImg) {
    gsap.set(innerImg, { scale: scaleFrom, willChange: 'transform' });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || wrapEl,
      start: start,
      once: true,
    },
    delay: delay,
    onComplete: () => {
      wrapEl.classList.add('is-revealed');
      gsap.set(wrapEl, { clearProps: 'clipPath,willChange' });
      if (innerImg) {
        gsap.set(innerImg, { clearProps: 'transform,willChange' });
      }
      if (typeof onComplete === 'function') onComplete();
    },
  });

  tl.to(
    wrapEl,
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: duration,
      ease: ease,
    },
    0
  );

  if (innerImg) {
    tl.to(
      innerImg,
      {
        scale: scaleTo,
        duration: duration,
        ease: ease,
      },
      0
    );
  }

  if (tl.scrollTrigger) {
    revealTriggers.push(tl.scrollTrigger);
  }

  return tl;
}

/**
 * Scan and apply the exact same image reveal to every content image on the site:
 * - Philosophy / About teaser (.img-reveal-wrap)
 * - Gallery bento teaser & full gallery plates (.gallery-item-inner)
 * - Location images
 * - Excludes hero background, logo/icons, navbar, and footer.
 *
 * Each image wrapper receives its OWN independent ScrollTrigger.
 */
export function initAllImageReveals(container = document) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Content image wraps (excluding hero, header, footer, and amenities)
  const imageWraps = Array.from(
    container.querySelectorAll('.img-reveal-wrap, .gallery-item-inner')
  ).filter((wrap) => {
    return (
      !wrap.closest('.hero') &&
      !wrap.closest('.site-header') &&
      !wrap.closest('.site-footer') &&
      !wrap.closest('.amenities-staggered-grid')
    );
  });

  imageWraps.forEach((wrap) => {
    // Each image wrapper gets its OWN ScrollTrigger directly on wrap
    revealImage(wrap, {
      trigger: wrap,
      start: 'top 85%',
      duration: 1.3,
      ease: 'power4.out',
    });
  });
}

export function cleanupImageReveals() {
  revealTriggers.forEach((st) => {
    if (st && st.kill) st.kill();
  });
  revealTriggers = [];
}

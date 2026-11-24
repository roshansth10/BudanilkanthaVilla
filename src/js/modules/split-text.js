import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let splitInstances = [];
let splitTriggers = [];
let resizeDebounceTimer = null;
let currentContainer = null;

export const SPLIT_CONFIG = {
  heading: {
    duration: 1.0,
    ease: 'power4.out',
    stagger: 0.08,
    start: 'top 85%',
  },
  body: {
    duration: 1.0,
    ease: 'power4.out',
    stagger: 0.06,
    start: 'top 85%',
    y: 24,
  },
  label: {
    duration: 0.8,
    ease: 'power4.out',
    start: 'top 85%',
    y: 20,
  },
};

/**
 * Split heading into lines, each masked with overflow:hidden and sliding up y: 110% -> 0
 */
export function splitHeading(el, options = {}) {
  if (!el) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.style.opacity = '1';
    return null;
  }

  // Preserve accessibility: original text in aria-label
  if (!el.getAttribute('aria-label')) {
    el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
  }

  if (el._splitType) {
    el._splitType.revert();
    el._splitType = null;
  }

  const {
    duration = SPLIT_CONFIG.heading.duration,
    ease = SPLIT_CONFIG.heading.ease,
    stagger = SPLIT_CONFIG.heading.stagger,
    start = SPLIT_CONFIG.heading.start,
    delay = 0,
    trigger = el,
  } = options;

  const split = new SplitType(el, { types: 'lines' });
  el._splitType = split;
  splitInstances.push(split);

  if (!split.lines || !split.lines.length) return split;

  // Wrap each line in an overflow-hidden line mask
  split.lines.forEach((line) => {
    line.setAttribute('aria-hidden', 'true');
    const mask = document.createElement('div');
    mask.className = 'line-mask';
    mask.setAttribute('aria-hidden', 'true');
    mask.style.overflow = 'hidden';
    mask.style.display = 'block';
    mask.style.paddingBottom = '0.22em';
    mask.style.marginBottom = '-0.22em';
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });

  gsap.set(split.lines, { yPercent: 110, opacity: 0, willChange: 'transform, opacity' });

  const anim = gsap.to(split.lines, {
    yPercent: 0,
    opacity: 1,
    duration: duration,
    stagger: stagger,
    delay: delay,
    ease: ease,
    scrollTrigger: {
      trigger: trigger,
      start: start,
      once: true,
    },
    onComplete: () => {
      gsap.set(split.lines, { clearProps: 'transform,willChange' });
    },
  });

  if (anim.scrollTrigger) splitTriggers.push(anim.scrollTrigger);

  // Safety fallback
  setTimeout(() => {
    if (split.lines) {
      gsap.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.3, overwrite: 'auto' });
    }
  }, (delay + duration) * 1000 + 2000);

  return split;
}

/**
 * Split paragraphs into lines with gentle fade + y: 24 to 0, stagger 0.06s
 */
export function splitBody(el, options = {}) {
  if (!el) return null;

  // Never replace Philosophy scroll-scrubbed text
  if (el.classList.contains('scrub-text')) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.style.opacity = '1';
    return null;
  }

  if (!el.getAttribute('aria-label')) {
    el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
  }

  if (el._splitType) {
    el._splitType.revert();
    el._splitType = null;
  }

  const {
    duration = SPLIT_CONFIG.body.duration,
    ease = SPLIT_CONFIG.body.ease,
    stagger = SPLIT_CONFIG.body.stagger,
    start = SPLIT_CONFIG.body.start,
    delay = 0,
    trigger = el,
  } = options;

  const split = new SplitType(el, { types: 'lines' });
  el._splitType = split;
  splitInstances.push(split);

  if (!split.lines || !split.lines.length) return split;

  split.lines.forEach((line) => {
    line.setAttribute('aria-hidden', 'true');
    line.style.display = 'block';
  });

  gsap.set(split.lines, { y: SPLIT_CONFIG.body.y, opacity: 0, willChange: 'transform, opacity' });

  const anim = gsap.to(split.lines, {
    y: 0,
    opacity: 1,
    duration: duration,
    stagger: stagger,
    delay: delay,
    ease: ease,
    scrollTrigger: {
      trigger: trigger,
      start: start,
      once: true,
    },
    onComplete: () => {
      gsap.set(split.lines, { clearProps: 'transform,willChange' });
    },
  });

  if (anim.scrollTrigger) splitTriggers.push(anim.scrollTrigger);

  setTimeout(() => {
    if (split.lines) {
      gsap.to(split.lines, { y: 0, opacity: 1, duration: 0.3, overwrite: 'auto' });
    }
  }, (delay + duration) * 1000 + 2000);

  return split;
}

/**
 * Animate small labels with simple fade-up
 */
export function splitLabel(el, options = {}) {
  if (!el) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.style.opacity = '1';
    return null;
  }

  const {
    duration = SPLIT_CONFIG.label.duration,
    ease = SPLIT_CONFIG.label.ease,
    start = SPLIT_CONFIG.label.start,
    delay = 0,
    trigger = el,
  } = options;

  gsap.set(el, { y: SPLIT_CONFIG.label.y, opacity: 0, willChange: 'transform, opacity' });

  const anim = gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: duration,
    delay: delay,
    ease: ease,
    scrollTrigger: {
      trigger: trigger,
      start: start,
      once: true,
    },
    onComplete: () => {
      gsap.set(el, { clearProps: 'transform,willChange' });
    },
  });

  if (anim.scrollTrigger) splitTriggers.push(anim.scrollTrigger);

  setTimeout(() => {
    gsap.to(el, { y: 0, opacity: 1, duration: 0.3, overwrite: 'auto' });
  }, (delay + duration) * 1000 + 2000);

  return anim;
}

/**
 * Initialize split-text animations on all text across every section
 * EXCEPT the header/navbar and the footer.
 */
export function initAllSplitText(container = document) {
  currentContainer = container;

  const runSplits = () => {
    cleanupSplitText();

    // 1. Headings in content sections (excluding header & footer)
    const headings = Array.from(
      container.querySelectorAll('h1, h2, h3, [data-split="heading"], [data-split-lines]')
    ).filter(
      (h) => !h.closest('.site-header') && !h.closest('.site-footer') && !h.closest('.mobile-nav-drawer')
    );

    headings.forEach((h) => {
      splitHeading(h, { start: 'top 85%' });
    });

    // 2. Paragraphs & body copy (excluding scrub-text, header, footer, amenity cards, distance list)
    const paragraphs = Array.from(
      container.querySelectorAll('.section p:not(.scrub-text), p.split-body, [data-split="body"]')
    ).filter(
      (p) =>
        !p.closest('.site-header') &&
        !p.closest('.site-footer') &&
        !p.closest('.mobile-nav-drawer') &&
        !p.closest('.amenity-card') &&
        !p.closest('.footer-text-meta') &&
        !p.closest('.distance-item') &&
        !p.classList.contains('scrub-text')
    );

    paragraphs.forEach((p) => {
      splitBody(p, { start: 'top 85%' });
    });

    // 3. Small labels in content sections
    const labels = Array.from(
      container.querySelectorAll('.editorial-label, .section-num, [data-split="label"]')
    ).filter(
      (l) => !l.closest('.site-header') && !l.closest('.site-footer') && !l.closest('.mobile-nav-drawer')
    );

    labels.forEach((l) => {
      splitLabel(l, { start: 'top 85%' });
    });

    ScrollTrigger.refresh();
  };

  // Split only after fonts load so line breaks are measured accurately
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runSplits);
  } else {
    runSplits();
  }

  // Debounced resize listener to re-split correctly on viewport changes
  window.removeEventListener('resize', handleResize);
  window.addEventListener('resize', handleResize, { passive: true });
}

function handleResize() {
  clearTimeout(resizeDebounceTimer);
  resizeDebounceTimer = setTimeout(() => {
    if (currentContainer) {
      initAllSplitText(currentContainer);
    }
  }, 250);
}

export function cleanupSplitText() {
  splitTriggers.forEach((st) => {
    if (st && st.kill) st.kill();
  });
  splitTriggers = [];

  splitInstances.forEach((sp) => {
    if (sp && sp.revert) sp.revert();
  });
  splitInstances = [];
}

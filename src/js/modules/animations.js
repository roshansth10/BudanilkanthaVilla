import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealImage, cleanupImageReveals } from './image-reveal.js';
import { cleanupSplitText, splitHeading } from './split-text.js';

gsap.registerPlugin(ScrollTrigger);

export const ANIM_CONFIG = {
  duration: 1.3,
  ease: 'power4.out',
  easeSlow: 'power3.inOut',
};

let activeTriggers = [];
let amenitiesCtx = null;

export { revealImage };

export function splitLines(el, trigger, delay = 0) {
  return splitHeading(el, { trigger: trigger || el, delay, start: 'top 92%' });
}

/**
 * Amenities section scroll-triggered image and content reveal:
 * - Inner wrapper (.amenity-media-wrap) reveals with clip-path inset(100% 0 0 0) -> inset(0 0 0 0)
 * - Inner <img> scales from 1.2 to 1 at the same time (1.3s, power4.out, start: top 85%)
 * - Staggers cards within the same row by 0.12s; Row 2 triggers independently at top 85%
 * - Number badge, title and description fade in 0.2s after the image with y: 30 -> 0
 * - Preserves vertical staggered offsets (cards 02/04/06/08 lower)
 * - Clears inline transforms on complete so hover scale (1.06), VIEW cursor, and title underline work cleanly
 * - Respects prefers-reduced-motion
 */
export function initAmenitiesReveal(container = document) {
  const amenitiesSection =
    container.querySelector('section[aria-label="Curated Amenities"]') ||
    container.querySelector('.amenities-staggered-grid')?.closest('section');
  if (!amenitiesSection) return;

  const grid = amenitiesSection.querySelector('.amenities-staggered-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.amenity-card'));
  if (!cards.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    cards.forEach((card) => {
      const mediaWrap = card.querySelector('.amenity-media-wrap');
      const img = card.querySelector('.amenity-img');
      const badge = card.querySelector('.amenity-num');
      const title = card.querySelector('.amenity-title');
      const desc = card.querySelector('.amenity-desc');

      if (mediaWrap) {
        mediaWrap.classList.add('is-revealed');
        mediaWrap.style.clipPath = 'none';
      }
      if (img) img.style.transform = 'none';
      if (badge) badge.style.opacity = '1';
      if (title) { title.style.opacity = '1'; title.style.transform = 'none'; }
      if (desc) { desc.style.opacity = '1'; desc.style.transform = 'none'; }
    });
    return;
  }

  // Revert previous context if any
  if (amenitiesCtx) {
    amenitiesCtx.revert();
    amenitiesCtx = null;
  }

  amenitiesCtx = gsap.context(() => {
    // Each of the 8 cards triggers INDEPENDENTLY when its own mediaWrap reaches "top 85%"
    cards.forEach((card, i) => {
      const mediaWrap = card.querySelector('.amenity-media-wrap');
      const img = card.querySelector('.amenity-img');
      const badge = card.querySelector('.amenity-num');
      const title = card.querySelector('.amenity-title');
      const desc = card.querySelector('.amenity-desc');
      const texts = [title, desc].filter(Boolean);

      if (!mediaWrap) return;

      // 1. Initial hidden state set strictly via JS and CSS
      mediaWrap.style.overflow = 'hidden';
      gsap.set(mediaWrap, { clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' });
      if (img) gsap.set(img, { scale: 1.2, willChange: 'transform' });
      if (badge) gsap.set(badge, { opacity: 0 });
      if (texts.length) gsap.set(texts, { opacity: 0, y: 30, willChange: 'transform, opacity' });

      // Stagger cards within the same row by 0.12s only if entering together
      const colIndex = i % 4;
      const cardDelay = colIndex * 0.12;

      // 2. Separate ScrollTrigger for EACH card wrapper
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mediaWrap,
          start: 'top 85%',
          once: true,
        },
        delay: cardDelay,
        onComplete: () => {
          mediaWrap.classList.add('is-revealed');
          gsap.set(mediaWrap, { clearProps: 'clipPath,willChange' });
          if (img) gsap.set(img, { clearProps: 'transform,willChange' });
          if (texts.length) gsap.set(texts, { clearProps: 'transform,willChange' });
        },
      });

      // Clip-path wipe bottom to top
      tl.to(
        mediaWrap,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power4.out',
        },
        0
      );

      // Inner image scales from 1.2 to 1
      if (img) {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1.3,
            ease: 'power4.out',
          },
          0
        );
      }

      // Number badge fades in 0.2s after image
      if (badge) {
        tl.to(
          badge,
          {
            opacity: 1,
            duration: 1.0,
            ease: 'power4.out',
          },
          0.2
        );
      }

      // Title & description slide and fade 0.2s after image
      if (texts.length) {
        tl.to(
          texts,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.06,
            ease: 'power4.out',
          },
          0.2
        );
      }

      if (tl.scrollTrigger) activeTriggers.push(tl.scrollTrigger);
    });
  }, amenitiesSection);
}

/**
 * Parallax scrub on selected images (-10% to 10%)
 */
export function initParallax(images) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  images.forEach((img) => {
    const parent = img.closest('.img-reveal-wrap, .gallery-item-inner, .amenity-media-wrap') || img.parentElement;
    const st = ScrollTrigger.create({
      trigger: parent,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yPercent = (self.progress - 0.5) * 16;
        gsap.set(img, { yPercent });
      },
    });
    activeTriggers.push(st);
  });
}

/**
 * Stagger in elements
 */
export function staggerIn(els, triggerEl, staggerVal = 0.08) {
  if (!els || !els.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  gsap.set(els, { y: 25, opacity: 0 });

  const anim = gsap.to(els, {
    y: 0,
    opacity: 1,
    duration: 1.0,
    stagger: staggerVal,
    ease: ANIM_CONFIG.ease,
    scrollTrigger: {
      trigger: triggerEl || els[0],
      start: 'top 92%',
      once: true,
    },
  });

  if (anim.scrollTrigger) activeTriggers.push(anim.scrollTrigger);

  // Safety fallback
  setTimeout(() => {
    gsap.to(els, { y: 0, opacity: 1, duration: 0.3, overwrite: 'auto' });
  }, 2500);
}

/**
 * Magnetic button effect (strength ~0.35)
 */
export function initMagnetic(btnEl) {
  if (!btnEl) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const xTo = gsap.quickTo(btnEl, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(btnEl, 'y', { duration: 0.35, ease: 'power3.out' });

  btnEl.addEventListener('mousemove', (e) => {
    const rect = btnEl.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * 0.35);
    yTo(relY * 0.35);
  });

  btnEl.addEventListener('mouseleave', () => {
    xTo(0);
    yTo(0);
  });
}

/**
 * Header behavior:
 * - Transparent over hero with dark gradient for contrast
 * - Becomes solid paper (#f4f1ea) with ink text after 80px
 * - Hides on scroll down, shows on scroll up
 * - NO blur, no translucent grey bar at any scroll state
 */
export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isScrolled = false;

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    // Solid paper after 80px
    if (currentScrollY > 80 && !isScrolled) {
      header.classList.add('is-scrolled');
      isScrolled = true;
    } else if (currentScrollY <= 80 && isScrolled) {
      header.classList.remove('is-scrolled');
      isScrolled = false;
    }

    // Hide on scroll down, show on scroll up (beyond 160px)
    if (currentScrollY > 160) {
      if (currentScrollY > lastScrollY && !header.classList.contains('header-hidden')) {
        header.classList.add('header-hidden');
      } else if (currentScrollY < lastScrollY && header.classList.contains('header-hidden')) {
        header.classList.remove('header-hidden');
      }
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Mobile Navigation Menu Toggle
 */
export function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-active');
    toggleBtn.classList.toggle('is-open', isOpen);
  });

  const links = drawer.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-active');
      toggleBtn.classList.remove('is-open');
    });
  });
}

/**
 * Word-by-word scrubbed paragraph opacity reveal
 * Fixes missing whitespace by setting inline-block with explicit margin-right
 */
export function initScrubText(container) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const scrubEls = container.querySelectorAll('.scrub-text');
  scrubEls.forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/).filter(Boolean);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ');
    const wordSpans = el.querySelectorAll('.word');

    // Initial opacity
    gsap.set(wordSpans, { opacity: 0.15 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'bottom 45%',
      scrub: 0.5,
      onUpdate: (self) => {
        const total = wordSpans.length;
        const activeCount = Math.floor(self.progress * total);
        wordSpans.forEach((span, idx) => {
          span.style.opacity = idx <= activeCount ? '1' : '0.15';
        });
      },
    });

    activeTriggers.push(st);

    // Fallback safety
    setTimeout(() => {
      wordSpans.forEach((span) => {
        if (span.style.opacity === '0.15') span.style.opacity = '1';
      });
    }, 3000);
  });
}

/**
 * Marquee with scroll velocity reaction
 */
export function initMarquee(container) {
  const marquee = container.querySelector('.editorial-marquee');
  if (!marquee) return;

  const track = marquee.querySelector('.marquee-track');
  if (!track) return;

  let xPos = 0;
  let baseSpeed = 0.8;
  let velocityMultiplier = 1;

  const st = ScrollTrigger.create({
    trigger: marquee,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      velocityMultiplier = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 3);
    },
  });
  activeTriggers.push(st);

  function animate() {
    xPos -= baseSpeed * velocityMultiplier;
    velocityMultiplier += (1 - velocityMultiplier) * 0.05;
    if (Math.abs(xPos) >= track.offsetWidth / 2) {
      xPos = 0;
    }
    gsap.set(track, { x: xPos });
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * Footer animations:
 * - Headline reveal from mask
 * - Giant wordmark chars rising in from bottom
 * - Circular magnetic button (strength ~0.35)
 * - Back to top lenis scroll (1.6s)
 * - Reachable trigger: start: "top bottom" + fallback reveal
 */
export function initFooterAnimations(container, lenis) {
  const footer = container.querySelector('.site-footer');
  if (!footer) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Giant Wordmark Chars Reveal & Responsive Fit
  const wordmark = footer.querySelector('.footer-giant-wordmark');
  if (wordmark) {
    const wordEls = wordmark.querySelectorAll('.wordmark-word');
    if (wordEls.length) {
      wordEls.forEach((wordEl) => {
        const text = wordEl.textContent.trim();
        wordEl.innerHTML = text
          .split('')
          .map((c) => `<span class="wordmark-char">${c}</span>`)
          .join('');
      });
    } else {
      const text = wordmark.textContent.trim();
      wordmark.innerHTML = text
        .split('')
        .map((c) => (c === ' ' ? '<span class="wordmark-space">&nbsp;</span>' : `<span class="wordmark-char">${c}</span>`))
        .join('');
    }
    const chars = Array.from(wordmark.querySelectorAll('.wordmark-char'));

    if (prefersReduced) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
    } else {
      gsap.set(chars, { yPercent: 100, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.03,
            ease: 'expo.out',
          });
        },
      });
      activeTriggers.push(st);

      // Safety fallback: reveal after 2.5s if not already triggered
      setTimeout(() => {
        gsap.to(chars, { yPercent: 0, opacity: 1, duration: 0.5, overwrite: 'auto' });
      }, 2500);
    }

    // Dynamic fit to width on resize
    initFooterWordmarkFit(footer);
  }

  // 2. Footer Invitation Headline
  const footerHeadline = footer.querySelector('.footer-invitation');
  if (footerHeadline) {
    if (prefersReduced) {
      footerHeadline.style.opacity = '1';
    } else {
      splitHeading(footerHeadline, { trigger: footer, start: 'top bottom' });
      // Safety fallback
      setTimeout(() => {
        const lines = footerHeadline.querySelectorAll('.line-mask > *');
        if (lines.length) {
          gsap.to(lines, { yPercent: 0, opacity: 1, duration: 0.5, overwrite: 'auto' });
        }
      }, 2500);
    }
  }

  // 3. Magnetic Button
  const magneticBtn = footer.querySelector('.magnetic-btn');
  if (magneticBtn) {
    initMagnetic(magneticBtn);
  }

  // 4. Back to top (lenis 1.6s duration)
  const backToTopBtn = footer.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

/**
 * Fit wordmark dynamically to container width on desktop & mobile
 */
function initFooterWordmarkFit(footer) {
  const wordmark = footer.querySelector('.footer-giant-wordmark');
  const wrap = footer.querySelector('.footer-wordmark-wrap');
  if (!wordmark || !wrap) return;

  function adjustFit() {
    const avail = wrap.clientWidth;
    if (!avail) return;
    const isMobile = window.innerWidth <= 640;
    if (!isMobile) {
      wordmark.style.transform = 'none';
      const current = wordmark.scrollWidth;
      if (current > avail) {
        const scale = (avail - 4) / current;
        wordmark.style.transform = `scale(${Math.min(1, scale)})`;
        wordmark.style.transformOrigin = 'center center';
      }
    } else {
      wordmark.style.transform = 'none';
      const w1 = wordmark.querySelector('.wordmark-word-1');
      const w2 = wordmark.querySelector('.wordmark-word-2');
      if (w1) {
        w1.style.transform = 'none';
        if (w1.scrollWidth > avail) {
          const s1 = (avail - 4) / w1.scrollWidth;
          w1.style.transform = `scale(${Math.min(1, s1)})`;
          w1.style.transformOrigin = 'center center';
        }
      }
      if (w2) {
        w2.style.transform = 'none';
        if (w2.scrollWidth > avail) {
          const s2 = (avail - 4) / w2.scrollWidth;
          w2.style.transform = `scale(${Math.min(1, s2)})`;
          w2.style.transformOrigin = 'center center';
        }
      }
    }
  }

  adjustFit();
  window.addEventListener('resize', adjustFit, { passive: true });
}

/**
 * Clean up all ScrollTriggers and SplitType instances on page transitions
 */
export function cleanupAnimations() {
  if (amenitiesCtx) {
    amenitiesCtx.revert();
    amenitiesCtx = null;
  }

  cleanupImageReveals();
  cleanupSplitText();

  activeTriggers.forEach((st) => {
    if (st && st.kill) st.kill();
  });
  activeTriggers = [];

  activeSplits.forEach((sp) => {
    if (sp && sp.revert) sp.revert();
  });
  activeSplits = [];

  ScrollTrigger.getAll().forEach((t) => t.kill());
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis, getLenis } from './modules/lenis.js';
import { initPreloader } from './modules/preloader.js';
import { initCustomCursor } from './modules/cursor.js';
import {
  initHeader,
  initMobileMenu,
  initScrubText,
  initMarquee,
  initFooterAnimations,
  splitLines,
  revealImage,
  staggerIn,
  initParallax,
  initAmenitiesReveal,
} from './modules/animations.js';
import { initAllImageReveals, cleanupImageReveals } from './modules/image-reveal.js';
import { initAllSplitText, splitHeading, cleanupSplitText } from './modules/split-text.js';
import { initGallery } from './modules/gallery.js';
import { initContactForm } from './modules/form.js';
import { initTransitions } from './modules/transitions.js';

gsap.registerPlugin(ScrollTrigger);

export function initPageComponents(container = document) {
  const lenis = getLenis();

  // Wait for fonts to be ready so SplitType measures exact line breaks
  const runWithFonts = (callback) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(callback);
    } else {
      callback();
    }
  };

  runWithFonts(() => {
    // 1. Text reveals across sections (headings line-masked, paragraphs faded, labels fade-up)
    initAllSplitText(container);

    // 2. Image reveals across all content images (clip-path bottom-to-top + scale 1.2 to 1)
    initAllImageReveals(container);

    // 3. Scrubbed word-by-word text with proper whitespace
    initScrubText(container);

    // 4. Marquee with velocity reaction
    initMarquee(container);

    // 5. Parallax on designated images
    const parallaxImgs = container.querySelectorAll('[data-parallax]');
    if (parallaxImgs.length) {
      initParallax(parallaxImgs);
    }

    // 6. Amenities 8-card staggered reveals
    initAmenitiesReveal(container);

    // 7. Distance items (Location page)
    const distanceItems = container.querySelectorAll('.distance-item');
    if (distanceItems.length) {
      distanceItems.forEach((item, idx) => {
        const hairline = item.querySelector('.distance-item-hairline');
        if (hairline) {
          gsap.fromTo(
            hairline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              delay: idx * 0.08,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                once: true,
              },
            }
          );
        }
      });
    }

    // 8. Gallery & Lightbox
    initGallery(container);

    // 9. Contact form
    initContactForm(container);

    // 10. Footer animations (wordmark, headline, magnetic, back-to-top)
    initFooterAnimations(container, lenis);

    // 11. Refresh triggers after font rendering
    ScrollTrigger.refresh();
  });

  // Re-bind cursor
  initCustomCursor();

  // Refresh triggers when all images in container finish loading
  const images = container.querySelectorAll('img');
  let loadedCount = 0;
  if (images.length) {
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            ScrollTrigger.refresh();
          }
        });
      }
    });
  }

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 350);
}

// Initial page startup
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize smooth scrolling
  initLenis();

  // 2. Header and mobile menu
  initHeader();
  initMobileMenu();

  // 3. Custom cursor
  initCustomCursor();

  // 4. Transitions
  initTransitions((newContainer) => {
    initPageComponents(newContainer);
    // Refresh ScrollTrigger after page swap
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });

  // 5. Preloader with callback
  initPreloader(() => {
    initPageComponents(document);

    // Hero headline initial reveal
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          splitHeading(heroHeadline, { delay: 0.2 });
        });
      } else {
        splitHeading(heroHeadline, { delay: 0.2 });
      }
    }

    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
      gsap.to(heroImg, {
        scale: 1,
        duration: 2.2,
        ease: 'power3.out',
      });
    }
  });

  // Window resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
});

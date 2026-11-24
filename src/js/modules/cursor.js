import gsap from 'gsap';

let lastPointerX = -100;
let lastPointerY = -100;
let cursorContainer = null;

// Update cursor contrast theme based on element under cursor
export function updateCursorTheme(x, y) {
  if (!cursorContainer) {
    cursorContainer = document.querySelector('.custom-cursor-system');
  }
  if (!cursorContainer) return;
  if (x <= 0 || y <= 0 || x >= window.innerWidth || y >= window.innerHeight) return;
  const target = document.elementFromPoint(x, y);
  if (!target) return;

  // 1. Sticky / Scrolled / Light Navbar: always black-on-cream cursor
  const header = target.closest('.site-header');
  if (header && (header.classList.contains('is-scrolled') || header.classList.contains('theme-light'))) {
    cursorContainer.classList.add('is-dark-theme');
    return;
  }

  // 2. Cream Marquee Strip & explicit dark cursor regions: always black-on-cream cursor
  if (target.closest('.editorial-marquee') || target.closest('[data-cursor="dark"], [data-cursor-theme="dark"]')) {
    cursorContainer.classList.add('is-dark-theme');
    return;
  }

  // 3. Dark sections (Hero, Sanctuary, dark Amenities, Footer): white-on-dark cursor
  if (target.closest('.hero, .section-dark, .site-footer, [data-cursor="light"], [data-cursor-theme="light"]')) {
    cursorContainer.classList.remove('is-dark-theme');
    return;
  }

  // 4. Default paper/stone background (Overview, Specs, Gallery, Story, Stone Invitation): black cursor
  cursorContainer.classList.add('is-dark-theme');
}

export function syncCursorTheme() {
  if (lastPointerX > 0 && lastPointerY > 0) {
    updateCursorTheme(lastPointerX, lastPointerY);
  }
}

export function initCustomCursor() {
  if (typeof window === 'undefined') return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Disabled on touch devices and reduced motion
  if (!isFinePointer || prefersReduced) {
    document.documentElement.classList.remove('custom-cursor-active');
    document.body.classList.remove('custom-cursor-active');
    const existing = document.querySelector('.custom-cursor-system');
    if (existing) existing.remove();
    cursorContainer = null;
    return;
  }

  document.documentElement.classList.add('custom-cursor-active');
  document.body.classList.add('custom-cursor-active');

  let container = document.querySelector('.custom-cursor-system');
  if (!container) {
    container = document.createElement('div');
    container.className = 'custom-cursor-system';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring">
        <span class="cursor-label"></span>
      </div>
    `;
    document.body.appendChild(container);
  }
  cursorContainer = container;

  const dot = container.querySelector('.cursor-dot');
  const ring = container.querySelector('.cursor-ring');
  const label = container.querySelector('.cursor-label');

  // GSAP quickTo for smooth physics tracking
  // Dot follows tightly
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

  // 40px Ring follows with duration 0.5 as specified
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power2.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power2.out' });

  // Initial offscreen position
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

  let isInitialized = false;

  window.addEventListener('mousemove', (e) => {
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    if (!isInitialized) {
      gsap.set([dot, ring], { opacity: 1 });
      isInitialized = true;
    }
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
    updateCursorTheme(e.clientX, e.clientY);
  });

  // Update contrast while scrolling even without mouse movement
  window.addEventListener(
    'scroll',
    () => {
      syncCursorTheme();
    },
    { passive: true }
  );

  window.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    isInitialized = false;
  });

  bindCursorHoverEvents(container, dot, ring, label);
}

export function bindCursorHoverEvents(container, dot, ring, label) {
  if (!container || !dot || !ring || !label) return;

  // 1. Interactive links and buttons -> Ring grows to 64px
  const interactiveEls = document.querySelectorAll(
    'a, button, [role="button"], input, textarea, select, .magnetic-btn, .time-chip-btn'
  );
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hover-link');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hover-link');
    });
  });

  // 2. Gallery and Amenity images -> 88px filled circle with "VIEW" label
  const viewMediaEls = document.querySelectorAll(
    '.gallery-item, .amenity-media-wrap, [data-cursor="view"]'
  );
  viewMediaEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hover-view');
      dot.classList.add('is-hidden');
      label.textContent = 'VIEW';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hover-view');
      dot.classList.remove('is-hidden');
      label.textContent = '';
    });
  });

  // 3. Drag areas
  const dragEls = document.querySelectorAll('[data-cursor="drag"]');
  dragEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hover-view');
      dot.classList.add('is-hidden');
      label.textContent = 'DRAG';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hover-view');
      dot.classList.remove('is-hidden');
      label.textContent = '';
    });
  });
}

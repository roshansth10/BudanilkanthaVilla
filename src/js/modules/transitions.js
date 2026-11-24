import gsap from 'gsap';
import { cleanupAnimations } from './animations.js';

let isTransitioning = false;

export function initTransitions(onPageLoaded) {
  let curtain = document.querySelector('.page-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);
  }

  // Intercept all internal navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.target === '_blank' ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    const currentUrl = window.location.pathname;
    const targetUrl = new URL(href, window.location.origin).pathname;

    // Normal internal navigation
    if (targetUrl !== currentUrl) {
      e.preventDefault();
      navigateTo(href, onPageLoaded);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    loadPage(window.location.href, false, onPageLoaded);
  });
}

export function navigateTo(url, onPageLoaded) {
  if (isTransitioning) return;
  loadPage(url, true, onPageLoaded);
}

async function loadPage(url, push = true, onPageLoaded) {
  isTransitioning = true;
  const curtain = document.querySelector('.page-curtain');

  // 1. Curtain sweep in
  await gsap.to(curtain, {
    y: 0,
    duration: 0.6,
    ease: 'power3.inOut',
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      window.location.href = url;
      return;
    }
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // 2. Clean up current animations & triggers
    cleanupAnimations();

    // 3. Update Title & Meta
    document.title = doc.title;

    // 4. Swap Main Content
    const newMain = doc.querySelector('main#page-content');
    const currentMain = document.querySelector('main#page-content');

    if (newMain && currentMain) {
      currentMain.innerHTML = newMain.innerHTML;
      currentMain.className = newMain.className;
    } else {
      window.location.href = url;
      return;
    }

    // Update active nav links
    const newPath = new URL(url, window.location.origin).pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      const linkPath = link.getAttribute('href');
      const isActive =
        linkPath === newPath ||
        (newPath.startsWith(linkPath) && linkPath !== '/' && linkPath !== '');
      link.classList.toggle('is-active', isActive);
    });

    if (push) {
      window.history.pushState({}, '', url);
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // 5. Reinitialize Page Modules
    if (onPageLoaded) {
      onPageLoaded(document.querySelector('main#page-content'));
    }
  } catch (err) {
    console.error('Page transition failed:', err);
    window.location.href = url;
    return;
  }

  // 6. Curtain sweep out
  await gsap.to(curtain, {
    y: '-100%',
    duration: 0.7,
    ease: 'power3.inOut',
  });

  gsap.set(curtain, { y: '100%' });
  isTransitioning = false;
}

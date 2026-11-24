import gsap from 'gsap';

export function initPreloader(onComplete) {
  const preloaderEl = document.querySelector('.preloader');
  if (!preloaderEl) {
    if (onComplete) onComplete();
    return;
  }

  // Check if already shown in this session
  const hasSeenPreloader = sessionStorage.getItem('bk_villa_preloader_seen');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hasSeenPreloader || prefersReduced) {
    preloaderEl.style.display = 'none';
    if (onComplete) onComplete();
    return;
  }

  const titleEl = preloaderEl.querySelector('.preloader-title');
  const lineEl = preloaderEl.querySelector('.preloader-line-wipe');
  const counterEl = preloaderEl.querySelector('.preloader-counter');

  const counterObj = { val: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem('bk_villa_preloader_seen', 'true');
      preloaderEl.style.display = 'none';
      if (onComplete) onComplete();
    },
  });

  // Reveal title with clip / translate
  tl.to(titleEl, {
    y: 0,
    duration: 0.9,
    ease: 'expo.out',
  })
    // Line wipe
    .to(
      lineEl,
      {
        width: '100%',
        duration: 1.1,
        ease: 'power3.inOut',
      },
      '-=0.7'
    )
    // Counter 0 to 100
    .to(
      counterObj,
      {
        val: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterEl) {
            counterEl.textContent = String(Math.floor(counterObj.val)).padStart(3, '0');
          }
        },
      },
      '-=1.1'
    )
    // Curtain slides up
    .to(preloaderEl, {
      yPercent: -100,
      duration: 1.0,
      ease: 'expo.inOut',
    });
}

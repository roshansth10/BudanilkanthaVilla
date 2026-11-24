import gsap from 'gsap';
import { initParallax } from './animations.js';

export function initGallery(container) {
  const galleryItems = container.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Parallax on images
  const innerImgs = container.querySelectorAll('.gallery-img');
  initParallax(innerImgs);

  // Setup Lightbox with full keyboard navigation
  initLightbox(container, galleryItems);
}

function initLightbox(container, galleryItems) {
  let lightbox = document.querySelector('.lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image Lightbox');
    lightbox.innerHTML = `
      <div class="lightbox-header">
        <span class="lightbox-counter">01 / 09</span>
        <button class="lightbox-close-btn" aria-label="Close Lightbox (Esc)">Close (Esc)</button>
      </div>
      <div class="lightbox-stage">
        <img class="lightbox-img" src="" alt="" />
      </div>
      <div class="lightbox-footer">
        <span class="lightbox-caption">Caption</span>
        <div class="lightbox-nav-btns">
          <button class="lightbox-nav-btn prev-btn" aria-label="Previous image (Left arrow)">&larr; Prev</button>
          <button class="lightbox-nav-btn next-btn" aria-label="Next image (Right arrow)">Next &rarr;</button>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const counterEl = lightbox.querySelector('.lightbox-counter');
  const imgEl = lightbox.querySelector('.lightbox-img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.prev-btn');
  const nextBtn = lightbox.querySelector('.next-btn');

  // Extract images data
  const itemsData = Array.from(galleryItems).map((item) => {
    const img = item.querySelector('img');
    const num = item.querySelector('.gallery-num')?.textContent.trim() || '';
    const title = item.querySelector('.gallery-title')?.textContent.trim() || img?.alt || '';
    return {
      src: img?.getAttribute('src') || '',
      alt: img?.alt || '',
      num: num,
      title: title,
    };
  });

  let currentIndex = 0;
  let lastActiveElement = null;

  function updateLightbox(index) {
    currentIndex = (index + itemsData.length) % itemsData.length;
    const item = itemsData[currentIndex];

    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';

    setTimeout(() => {
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(itemsData.length).padStart(2, '0')}`;
      captionEl.textContent = `${item.num ? item.num + ' — ' : ''}${item.title}`;

      imgEl.onload = () => {
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      };
    }, 150);
  }

  function openLightbox(index) {
    lastActiveElement = document.activeElement;
    updateLightbox(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    window.addEventListener('keydown', handleKeyDown);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeyDown);
    if (lastActiveElement && lastActiveElement.focus) {
      lastActiveElement.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
  }

  // Bind mouse and keyboard accessibility to all gallery items
  galleryItems.forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const title = itemsData[index]?.title || 'Open photo';
    item.setAttribute('aria-label', `View ${title} in lightbox`);

    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => updateLightbox(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateLightbox(currentIndex + 1));

  // Click stage to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });
}

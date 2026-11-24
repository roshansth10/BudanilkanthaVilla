export function initContactForm(container) {
  const form = container.querySelector('.contact-form');
  if (!form) return;

  const timeChips = form.querySelectorAll('.time-chip-btn');
  const timeInput = form.querySelector('input[name="preferred_time"]');

  timeChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      timeChips.forEach((c) => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      if (timeInput) {
        timeInput.value = chip.dataset.time || chip.textContent.trim();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate fields
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const dateField = form.querySelector('[name="visit_date"]');

    const fieldsToValidate = [
      {
        field: nameField,
        check: (val) => val.trim().length >= 2,
        msg: 'Please provide your full name.',
      },
      {
        field: emailField,
        check: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        msg: 'Please provide a valid email address.',
      },
      {
        field: phoneField,
        check: (val) => val.trim().length >= 7,
        msg: 'Please provide a valid phone or WhatsApp number.',
      },
    ];

    fieldsToValidate.forEach(({ field, check, msg }) => {
      if (!field) return;
      const parent = field.closest('.form-field');
      const errorMsgEl = parent.querySelector('.form-error-msg');

      if (!check(field.value)) {
        isValid = false;
        parent.classList.add('has-error');
        if (errorMsgEl) errorMsgEl.textContent = msg;
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (!isValid) return;

    // Success State
    const submitBtn = form.querySelector('button[type="submit"]');
    const successBanner = container.querySelector('.form-success-banner');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-label-swap span:first-child').textContent = 'REQUEST SENT';
    }

    if (successBanner) {
      successBanner.classList.add('is-visible');
      form.style.opacity = '0.4';
      form.style.pointerEvents = 'none';
    }

    console.log('Viewing request submitted:', {
      name: nameField?.value,
      email: emailField?.value,
      phone: phoneField?.value,
      date: dateField?.value,
      time: timeInput?.value || 'Morning',
      notes: form.querySelector('[name="message"]')?.value,
    });
  });
}

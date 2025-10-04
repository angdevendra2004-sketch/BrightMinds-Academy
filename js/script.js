 tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: {
              900: "#1E3A8A",
              800: "#3730A3",
              600: "#4F46E5",
              100: "#E0E7FF",
              50: "#EEF2FF",
            },
            gold: {
              500: "#FBBF24",
              400: "#FCD34D",
              100: "#FEF3C7",
            },
          },
        },
      },
    };

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOpenIcon = document.getElementById("menu-open");
  const menuCloseIcon = document.getElementById("menu-close");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
  });
});

function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

function validateField(field) {
  const errorMessage = field.nextElementSibling;
  if (field.checkValidity()) {
    field.classList.remove("border-red-500");
    field.classList.add("border-green-500");
    if (errorMessage) {
      errorMessage.classList.add("hidden");
    }
  } else {
    field.classList.remove("border-green-500");
    field.classList.add("border-red-500");
    if (errorMessage) {
      errorMessage.classList.remove("hidden");
    }
  }
}

async function handleSubmit(event, formModalId) {
  event.preventDefault();
  const form = event.target;
  let isValid = true;

  for (const field of form.elements) {
    if (field.willValidate && !field.checkValidity()) {
      isValid = false;
      validateField(field);
    }
  }

  if (!isValid) return;

  const formData = new FormData(form);
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (formModalId) {
    closeModal(formModalId);
  }

  if (response.ok) {
    form.reset();
    for (const field of form.elements) {
      if (field.willValidate) {
        field.classList.remove("border-green-500", "border-red-500");
      }
    }
    openModal("successModal");
  } else {
    openModal("failModal");
  }
}

async function handleTourSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let isValid = true;

  for (const field of form.elements) {
    if (field.willValidate && !field.checkValidity()) {
      isValid = false;
      validateField(field);
    }
  }

  if (!isValid) return;

  const formData = new FormData(form);
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  closeModal("tourModal");
  if (response.ok) {
    form.reset();
    for (const field of form.elements) {
      if (field.willValidate) {
        field.classList.remove("border-green-500", "border-red-500");
      }
    }
    openModal("successModal");
  } else {
    openModal("failModal");
  }
}


// signature

 (() => {
    const feature = document.getElementById('feature-card');
    const iconEl = document.getElementById('feature-icon');
    const titleEl = document.getElementById('feature-title');
    const descEl = document.getElementById('feature-desc');
    const linkEl = document.getElementById('feature-link');

    function setGradient(from, to) {
      const prevFrom = feature.dataset.gradientFrom;
      const prevTo = feature.dataset.gradientTo;
      if (prevFrom) feature.classList.remove(prevFrom);
      if (prevTo) feature.classList.remove(prevTo);
      feature.classList.add(from, to);
      feature.dataset.gradientFrom = from;
      feature.dataset.gradientTo = to;
    }

    function swap(card) {
      // Animate out
      feature.classList.add('opacity-0', 'scale-[0.98]', 'transition-all', 'duration-200');
      setTimeout(() => {
        iconEl.textContent = card.dataset.icon || '⭐';
        titleEl.textContent = card.dataset.title || '';
        descEl.textContent = card.dataset.desc || '';
        linkEl.textContent = card.dataset.linkText || 'Learn more →';
        linkEl.href = card.dataset.linkHref || '#';
        setGradient(card.dataset.gradientFrom || 'from-gold-400', card.dataset.gradientTo || 'to-amber-500');
        // Animate in
        feature.classList.remove('opacity-0', 'scale-[0.98]');
      }, 140);
    }

    document.querySelectorAll('.swap-card').forEach(card => {
      card.addEventListener('click', () => swap(card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); swap(card); }
      });
    });
  })();
  

  // why choose 
    (() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = document.querySelectorAll('#why-gis [data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.remove('opacity-0', 'translate-y-3');
        el.classList.add('opacity-100', 'translate-y-0');
        io.unobserve(el);
      });
    }, { threshold: 0.15 });

    cards.forEach((el, i) => {
      el.classList.add('opacity-0', 'translate-y-3', 'transition-all', 'duration-500', 'ease-out');
      el.style.transitionDelay = `${i * 70}ms`;
      io.observe(el);
    });
  })();
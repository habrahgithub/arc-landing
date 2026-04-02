(() => {
  // Mobile Navigation Toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: Stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
    // Add a quick check to immediately show items already in viewport on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => {
        el.classList.add('in-view');
      }, 100);
    }
  });

  // Optional: Subtle 3D tilt effect for the hero glass panel
  const heroGlass = document.getElementById('hero-glass');
  if (heroGlass && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 40;
      const y = (window.innerHeight / 2 - e.pageY) / 40;
      heroGlass.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }
})();

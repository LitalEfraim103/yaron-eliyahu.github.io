/* ===================================================
   YARON ELIYAHU - Website JavaScript
   =================================================== */

(function () {
  'use strict';

  /* --- Navbar scroll shadow --- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Hamburger menu toggle --- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Intersection Observer for scroll animations --- */
  const animatedEls = document.querySelectorAll('.animate-in');

  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* --- Active nav link highlight --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Subtle parallax on hero --- */
  const hero = document.querySelector('.hero');
  const heroGrid = document.querySelector('.hero-grid');
  if (hero && heroGrid) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < hero.offsetHeight) {
        heroGrid.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* --- Counter animation for stat numbers --- */
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    let counted = false;
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  /* --- Logo fallback if LOGO.png not found --- */
  document.querySelectorAll('.navbar-logo img, .footer-brand img').forEach(img => {
    img.addEventListener('error', function () {
      // Replace broken logo with text fallback
      const parent = this.parentElement;
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        font-family: 'Heebo', sans-serif;
        font-size: 0.95rem;
        font-weight: 800;
        color: var(--primary-dark, #4F79A4);
        line-height: 1.3;
        direction: rtl;
      `;
      fallback.innerHTML = 'ירון אליהו<br><span style="font-weight:400; font-size:0.8rem; color:#888;">שמאות ויעוץ מקרקעין</span>';
      parent.replaceChild(fallback, this);
    });
  });

  /* --- Zoom controls --- */
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const zoomLevelEl = document.getElementById('zoomLevel');

  if (zoomInBtn && zoomOutBtn && zoomLevelEl) {
    const ZOOM_STEP = 10;
    const MIN_ZOOM = 80;
    const MAX_ZOOM = 120;

    let currentZoom = parseInt(localStorage.getItem('pageZoom') || '100', 10);

    function applyZoom(zoom) {
      currentZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
      document.body.style.zoom = currentZoom / 100;
      zoomLevelEl.textContent = currentZoom + '%';
      localStorage.setItem('pageZoom', currentZoom);
      zoomInBtn.disabled = currentZoom >= MAX_ZOOM;
      zoomOutBtn.disabled = currentZoom <= MIN_ZOOM;
    }

    applyZoom(currentZoom);

    zoomInBtn.addEventListener('click', () => applyZoom(currentZoom + ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => applyZoom(currentZoom - ZOOM_STEP));
  }

  /* --- Form field focus animation --- */
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function () {
      this.closest('.form-group').classList.add('focused');
    });
    field.addEventListener('blur', function () {
      this.closest('.form-group').classList.remove('focused');
    });
  });

  /* --- Scroll-to-top button (auto-created) --- */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('aria-label', 'חזרה למעלה');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 32px;
    width: 48px;
    height: 48px;
    background: var(--primary-dark, #4F79A4);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(79,121,164,0.4);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 500;
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.transform = 'translateY(0)';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.transform = 'translateY(12px)';
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();

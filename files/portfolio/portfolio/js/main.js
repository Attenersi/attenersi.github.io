/* ============================================================
   Portfolio — shared scripts
   Mosór · Issue 01 · MMXXVI

   This file is intentionally vanilla JS, no build step.
   Each module is wrapped in an IIFE so it's safe to skip
   if its target elements don't exist on a given page.
   ============================================================ */


/* ---------- Section reveal on scroll ---------------------- */

(function sectionReveal() {
  const els = document.querySelectorAll(
    '.hero, .case-hero, .contents, .article, .case, .case-embed, .case-section, .stack, .career, .colophon, .case-footer-nav'
  );
  if (!els.length) return;
  els.forEach(e => e.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(e => io.observe(e));
  // First hero-style section reveals immediately
  document.querySelector('.hero, .case-hero')?.classList.add('in');
})();


/* ---------- Image reveal (slower, deeper threshold) ------- */

(function imageReveal() {
  const imgEls = document.querySelectorAll('.case-image, .case-iframe-wrap');
  if (!imgEls.length) return;
  const imgIo = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('img-in');
        imgIo.unobserve(en.target);
      }
    });
  }, { threshold: 0.18 });
  imgEls.forEach(el => imgIo.observe(el));
})();


/* ---------- Scroll-spy nav (highlights current section) --- */

(function scrollSpy() {
  const navLinks = document.querySelectorAll('.masthead nav a');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;
  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -45% 0px', threshold: 0 });
  sections.forEach(s => spyIo.observe(s));
})();


/* ---------- Progress bar + compact masthead --------------- */

(function progressBar() {
  const bar = document.querySelector('.progress-bar-fill');
  const masthead = document.querySelector('.masthead');
  if (!bar && !masthead) return;
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (bar) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
          bar.style.width = pct + '%';
        }
        if (masthead) {
          masthead.classList.toggle('compact', window.scrollY > 140);
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();


/* ---------- Hero word-stagger reveal ---------------------- */

(function staggerHero() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;
  const walk = (parent) => {
    Array.from(parent.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        if (!text.trim()) return;
        const tokens = text.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        tokens.forEach(tok => {
          if (tok.length === 0) return;
          if (/^\s+$/.test(tok)) {
            frag.appendChild(document.createTextNode(tok));
          } else {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = tok;
            frag.appendChild(span);
          }
        });
        parent.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(headline);
  const words = headline.querySelectorAll('.word');
  words.forEach((w, i) => {
    w.style.animationDelay = (120 + i * 75) + 'ms';
  });
})();


/* ---------- Magnetic email link --------------------------- */

(function magneticEmail() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch
  const email = document.querySelector('.colophon-mail');
  if (!email) return;
  const radius = 130;
  let raf = null;
  document.addEventListener('mousemove', (e) => {
    const rect = email.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      const strength = 1 - dist / radius;
      const tx = dx * strength * 0.28;
      const ty = dy * strength * 0.42;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        email.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    } else if (email.style.transform) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        email.style.transform = '';
      });
    }
  }, { passive: true });
})();


/* ---------- Pull-quote ink-draw reveal -------------------- */

(function pullQuoteReveal() {
  const quotes = document.querySelectorAll('.pull-quote');
  if (!quotes.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.55 });
  quotes.forEach(q => io.observe(q));
})();


/* ---------- Counter animation for case metrics ------------ */

(function counterAnimation() {
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const animate = (el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1300;
    const start = performance.now();
    const isNeg = target < 0;
    const absTarget = Math.abs(target);
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = absTarget * eased;
      const formatted = current.toFixed(decimals);
      el.textContent = prefix + (isNeg ? '−' : '') + formatted + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (isNeg ? '−' : '') + absTarget.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        animate(en.target);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
})();


/* ---------- Cursor tilt on case images -------------------- */

(function cursorTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const tiltMax = 2.5;
  document.querySelectorAll('.case-image:not(.case-blueprint)').forEach(el => {
    let raf = null;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * (tiltMax * 2);
      const rotateX = -y * (tiltMax * 2);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = '';
      });
    });
  });
})();


/* ---------- Lightbox / gallery ---------------------------- */

(function lightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('img');
  const lbCounter = lb.querySelector('.lb-counter');
  const lbClose = lb.querySelector('.lb-close');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');

  let gallery = [];
  let index = 0;

  function render() {
    if (!gallery.length) return;
    const item = gallery[index];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    const single = gallery.length === 1;
    lbPrev.style.display = single ? 'none' : '';
    lbNext.style.display = single ? 'none' : '';
    lbCounter.textContent = single ? '' : (index + 1) + ' / ' + gallery.length;
  }
  function open(g, i) {
    gallery = g;
    index = i;
    render();
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }
  function step(delta) {
    if (!gallery.length) return;
    index = (index + delta + gallery.length) % gallery.length;
    render();
  }

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); step(1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });

  // Bind every figure[data-gallery] images
  document.querySelectorAll('figure[data-gallery]').forEach(fig => {
    const imgs = Array.from(fig.querySelectorAll('img'));
    const items = imgs.map(i => ({ src: i.src, alt: i.alt }));
    imgs.forEach((img, i) => {
      const target = img.closest('button') || img.closest('.case-image') || img;
      target.addEventListener('click', (e) => {
        e.preventDefault();
        open(items, i);
      });
      target.style.cursor = 'zoom-in';
    });
  });

  // Single-image case-image elements without data-gallery.
  // Added keyboard accessibility via role=button/tabindex.
  document.querySelectorAll('figure:not([data-gallery]) .case-image:not(.case-blueprint)').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Open image: ' + (img.alt || 'image'));
    const openSingle = () => open([{ src: img.src, alt: img.alt }], 0);
    box.addEventListener('click', openSingle);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSingle();
      }
    });
    box.style.cursor = 'zoom-in';
  });
})();


/* ---------- Theme toggle ---------------------------------- */

(function themeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const setTheme = (mode) => {
    if (mode === 'dark') {
      document.body.classList.add('dark');
      toggle.textContent = 'Light';
    } else {
      document.body.classList.remove('dark');
      toggle.textContent = 'Dark';
    }
    try { localStorage.setItem('mosor-theme', mode); } catch (e) {}
  };
  let initial = 'light';
  try {
    const stored = localStorage.getItem('mosor-theme');
    if (stored === 'dark' || stored === 'light') initial = stored;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) initial = 'dark';
  } catch (e) {}
  setTheme(initial);
  toggle.addEventListener('click', () => {
    setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });
})();

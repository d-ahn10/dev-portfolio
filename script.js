// script.js
// Handles navigation toggling, smooth section reveal, project filtering, theme switching, and email obfuscation.

// Utility: add a class when elements enter viewport
const revealElements = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealElements.forEach((el) => observer.observe(el));

// Mobile navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Theme toggle with localStorage
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle?.setAttribute('aria-pressed', 'true');
    themeToggle?.querySelector('.theme-icon')?.replaceChildren('☀️');
    themeToggle?.querySelector('.theme-label')?.replaceChildren('Light');
  } else {
    root.removeAttribute('data-theme');
    themeToggle?.setAttribute('aria-pressed', 'false');
    themeToggle?.querySelector('.theme-icon')?.replaceChildren('🌙');
    themeToggle?.querySelector('.theme-label')?.replaceChildren('Dark');
  }
}

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme('dark');
}

themeToggle?.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    cards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = selected === 'all' || category === selected;
      card.style.display = shouldShow ? '' : 'none';
    });
  });
});

// Email obfuscation
const emailButton = document.getElementById('email-button');
if (emailButton) {
  emailButton.addEventListener('click', () => {
    const user = 'hello';
    const domain = 'example';
    const tld = 'com';
    const email = `${user}@${domain}.${tld}`;
    window.location.href = `mailto:${email}`;
  });
}

// Footer year helper
const yearEl = document.getElementById('footer-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const pages = [...document.querySelectorAll('[data-page]')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const validRoutes = new Set(pages.map((page) => page.dataset.page));

function currentRoute() {
  const route = window.location.hash.slice(1).toLowerCase();
  return validRoutes.has(route) ? route : 'home';
}

function activatePage(route = currentRoute()) {
  pages.forEach((page) => {
    const isActive = page.dataset.page === route;
    page.hidden = !isActive;
    if (isActive) {
      page.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    }
  });

  routeLinks.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle('active', isActive);
    if (link.closest('nav')) {
      link.toggleAttribute('aria-current', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
    }
  });

  document.title = route === 'home'
    ? 'Tiffany Liew — Event Portfolio'
    : `${route[0].toUpperCase()}${route.slice(1)} — Tiffany Liew`;

  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'instant' });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

window.addEventListener('hashchange', () => activatePage());
window.addEventListener('DOMContentLoaded', () => activatePage());
document.getElementById('year').textContent = new Date().getFullYear();

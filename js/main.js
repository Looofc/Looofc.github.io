
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
let slideIndex = 0;

function nextSlide() {
  if (!slides.length) return;
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 7000);
}

// Build Library filters + search
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const searchInput = document.getElementById('library-search');

function applyLibraryFilters() {
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
  const term = (searchInput?.value || '').toLowerCase();

  portfolioItems.forEach(item => {
    const category = item.dataset.category;
    const name = item.dataset.name.toLowerCase();
    const client = (item.dataset.client || '').toLowerCase();

    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = !term || name.includes(term) || client.includes(term);

    item.style.display = (matchesFilter && matchesSearch) ? 'block' : 'none';
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    applyLibraryFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyLibraryFilters);
}

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// render credits from credits-data.js
function renderCredits() {
  if (!window.creditsData) return;

  const groups = [
    { key: "supporters", el: "credits-supporters" },
    { key: "ishBuilders", el: "credits-ish" },
    { key: "creators", el: "credits-creators" },
    { key: "bakery", el: "credits-bakery" }
  ];

  groups.forEach(group => {
    const ul = document.getElementById(group.el);
    const data = window.creditsData[group.key];

    if (!ul || !Array.isArray(data)) return;

    // Alphabetical sort by name (case-insensitive)
    const entries = data
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

    entries.forEach(person => {
      const li = document.createElement("li");
      li.innerHTML =
        `<span class="credit-name">${person.name}</span> — ` +
        `<span class="credit-role credit-role-${person.type}">${person.role}</span>`;

      ul.appendChild(li);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCredits);

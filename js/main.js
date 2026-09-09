/**
 * Danielle Baglieri | DH101 Portfolio & Resume
 * Modern Interactivity & Navigation Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initResumeActions();
  initMakesFilter();
  initModal();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>`;

  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>`;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('dh101-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dh101-theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* ==========================================================================
   2. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside or on a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Resume Actions (Print, PDF, Copy Email)
   ========================================================================== */
function initResumeActions() {
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'danielle.baglieri@example.edu';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(`Contact: ${email}`);
      });
    });
  });
}

/* ==========================================================================
   4. Weekly Makes Filtering & Live Search
   ========================================================================== */
function initMakesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('makes-search');
  const cards = document.querySelectorAll('.make-card');

  if (!cards.length) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  function filterCards() {
    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.make-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.make-desc')?.textContent || '').toLowerCase();
      const tags = (card.querySelector('.make-tags')?.textContent || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || category.includes(currentCategory);
      const matchesSearch = !currentSearchQuery || 
        title.includes(currentSearchQuery) || 
        desc.includes(currentSearchQuery) || 
        tags.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

/* ==========================================================================
   5. Interactive Modal for Project & Make Details
   ========================================================================== */
function initModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  if (!backdrop || !modalCloseBtn) return;

  // Delegate clicks on "View Details" buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.view-make-details-btn');
    if (!trigger) return;

    const card = trigger.closest('.make-card');
    if (!card) return;

    const weekTag = card.querySelector('.make-week-tag')?.textContent || 'Weekly Make';
    const title = card.querySelector('.make-title')?.textContent || '';
    const desc = card.querySelector('.make-desc')?.textContent || '';
    const tags = Array.from(card.querySelectorAll('.make-tag-pill')).map(t => t.textContent).join(', ');
    const weekFile = trigger.getAttribute('data-week-file') || '';

    modalTag.textContent = weekTag;
    modalTitle.textContent = title;

    modalBody.innerHTML = `
      <p style="font-size: 1.05rem; margin-bottom: 1.25rem;">${desc}</p>
      
      <div style="background: var(--tag-bg); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
        <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.35rem;">Associated Topics & Tags:</strong>
        <span style="color: var(--accent-primary); font-weight: 500;">${tags}</span>
      </div>

      <h3>Project Structure</h3>
      <ul>
        <li><strong>Artifact:</strong> Interactive/visual making project documenting course concepts.</li>
        <li><strong>Process Notes:</strong> Methodologies, computational tools, and rationale.</li>
        <li><strong>Critical Reflection:</strong> Connecting digital humanities theory with creative practice.</li>
        <li><strong>Attribution & AI Use:</strong> Transparent documentation of AI assistance, prompting, and human authorial decisions.</li>
      </ul>

      <h3>Repository Markdown Source</h3>
      <p>Direct file path in repository:</p>
      <div class="code-block">makes/${weekFile || 'week01.md'}</div>

      <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="makes/${weekFile || 'week01.md'}" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
          Open Raw Markdown Source
        </a>
      </div>
    `;

    openModal();
  });

  function openModal() {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Active Nav Link on Scroll (ScrollSpy)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg style="width: 1.2rem; height: 1.2rem; color: #10b981;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}


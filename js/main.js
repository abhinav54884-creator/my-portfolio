/**
 * Main Application Logic & Animations
 * Abhinav M Portfolio - Stripe / Linear Aurora Glassmorphism Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initThemeToggle();
  initSoundToggle();
  initBentoSpotlight();
  initScrollObserver();
  initModals();
  initSkillFilters();
  initContactForm();
  initCustomCursor();
  initSoundTriggers();
});

/* ============================================================
   1. Bento Card Cursor Spotlight Effect (Linear / Stripe Style)
   ============================================================ */
function initBentoSpotlight() {
  const cards = document.querySelectorAll('.bento-card, .skill-bento-tile');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Dynamic radial spotlight background
      card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 243, 255, 0.14), var(--bg-card) 80%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = 'var(--bg-card)';
    });
  });
}

/* ============================================================
   2. Typing Effect in Hero Section
   ============================================================ */
function initTypingEffect() {
  const target = document.getElementById('typingText');
  if (!target) return;

  const titles = [
    "Computer Science & Engineering Student",
    "Full-Stack Web Developer",
    "Java & C++ Developer",
    "LeetCode DSA Practitioner"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      target.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      if (window.soundFX && Math.random() > 0.45) {
        window.soundFX.playKeypress();
      }
    }

    let delay = isDeleting ? 40 : 85;

    if (!isDeleting && charIndex === currentTitle.length) {
      delay = 2400; // Pause at end of line
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/* ============================================================
   3. Theme Toggle (Dark / Light)
   ============================================================ */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    if (window.soundFX) window.soundFX.playToggle(next === 'dark');
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    icon.title = 'Switch to Light Mode';
  } else {
    icon.className = 'fas fa-moon';
    icon.title = 'Switch to Dark Mode';
  }
}

/* ============================================================
   4. Sound FX Toggle
   ============================================================ */
function initSoundToggle() {
  const soundBtn = document.getElementById('soundToggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.soundFX) {
      const isEnabled = window.soundFX.toggleSound();
      const icon = soundBtn.querySelector('i');
      if (icon) {
        icon.className = isEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      }
      showToast(isEnabled ? '🔊 Sound FX Activated' : '🔇 Sound FX Muted');
    }
  });
}

/* ============================================================
   5. Modals System (Project Demos & Resume Viewer)
   ============================================================ */
function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  if (!modalOverlay) return;

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(projectKey) {
  if (window.soundFX) window.soundFX.playModalOpen();
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  const title = document.getElementById('modalTitle');

  if (!overlay || !body) return;

  if (projectKey === 'todo') {
    title.innerText = 'To-Do List Web Application Demo';
    body.innerHTML = window.ProjectDemos ? window.ProjectDemos.renderTodoList() : '';
  } else if (projectKey === 'rps') {
    title.innerText = 'Rock Paper Scissors Game vs AI';
    body.innerHTML = window.ProjectDemos ? window.ProjectDemos.renderRPS() : '';
  } else if (projectKey === 'library') {
    title.innerText = 'Library Management System & SQL Console';
    body.innerHTML = window.ProjectDemos ? window.ProjectDemos.renderLibrary() : '';
  } else if (projectKey === 'resume') {
    title.innerText = 'Abhinav M - Resume / Curriculum Vitae';
    body.innerHTML = `
      <div class="resume-preview-container">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px;">
          <button onclick="window.print()" class="btn btn-aurora sound-btn">
            <i class="fas fa-print"></i> Print Resume
          </button>
          <button class="btn btn-glass sound-btn" onclick="copyContactInfo()">
            <i class="fas fa-copy"></i> Copy Contact Details
          </button>
        </div>
        <div style="background: #ffffff; color: #0f172a; padding: 36px; border-radius: 16px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <h2 style="color: #0f172a; font-size: 2rem; margin-bottom: 4px;">Abhinav M</h2>
          <p style="color: #64748b; font-weight: 600;">Computer Science & Engineering Student | CBIT (2024 - 2028)</p>
          <p style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">Email: abhinav54884@gmail.com | Phone: +91 9154757314</p>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;">

          <h4 style="color: #9333ea; margin-bottom: 8px;">Education</h4>
          <ul style="margin-left: 20px; font-size: 0.95rem; line-height: 1.6;">
            <li><strong>Chaitanya Bharathi Institute of Technology (CBIT)</strong> - B.E. in CSE (Aug 2024 – May 2028)</li>
            <li><strong>Sri Chaitanya Junior College</strong> - Class XII (March 2024)</li>
            <li><strong>Montessori High School</strong> - Class X (March 2022)</li>
          </ul>

          <h4 style="color: #9333ea; margin: 16px 0 8px;">Projects</h4>
          <ul style="margin-left: 20px; font-size: 0.95rem; line-height: 1.6;">
            <li><strong>Todo List:</strong> Responsive web app with task filtering, status management, and localStorage (HTML, CSS, JS).</li>
            <li><strong>Rock Paper Scissors Game:</strong> Interactive game vs computer AI with score tracking and audio feedback (HTML, CSS, JS).</li>
            <li><strong>Library Management System:</strong> Desktop application for book record tracking and CRUD operations (Java, MySQL).</li>
          </ul>

          <h4 style="color: #9333ea; margin: 16px 0 8px;">Technical Skills & Coursework</h4>
          <p style="font-size: 0.95rem;"><strong>Languages:</strong> C, C++, Java, Python, JavaScript, HTML, CSS</p>
          <p style="font-size: 0.95rem;"><strong>Database & Tools:</strong> MySQL, Git, VS Code, AutoCAD</p>
          <p style="font-size: 0.95rem;"><strong>Coursework:</strong> Data Structures, Object-Oriented Programming, Database Management Systems</p>

          <h4 style="color: #9333ea; margin: 16px 0 8px;">Achievements & Soft Skills</h4>
          <p style="font-size: 0.95rem;">Practicing Data Structures and Algorithms on LeetCode.</p>
          <p style="font-size: 0.95rem;">Communication, Teamwork, Problem Solving, Time Management.</p>
        </div>
      </div>
    `;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (window.soundFX) window.soundFX.playModalClose();
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ============================================================
   6. Skill Filters
   ============================================================ */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skills-tab-btn');
  const tiles = document.querySelectorAll('.skill-bento-tile');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      tiles.forEach(tile => {
        if (filter === 'all' || tile.getAttribute('data-category') === filter) {
          tile.style.display = 'flex';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   7. Contact Form Handling
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (window.soundFX) window.soundFX.playSuccess();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all required fields!');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

    setTimeout(() => {
      showToast('🚀 Message sent successfully! Thanks for connecting.');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

      window.location.href = `mailto:abhinav54884@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    }, 1200);
  });
}

function copyContactInfo() {
  const info = `Abhinav M\nEmail: abhinav54884@gmail.com\nPhone: +91 9154757314`;
  navigator.clipboard.writeText(info).then(() => {
    if (window.soundFX) window.soundFX.playSuccess();
    showToast('📋 Contact info copied to clipboard!');
  }).catch(() => {
    showToast('Email: abhinav54884@gmail.com');
  });
}

/* ============================================================
   8. Global Toast Notification System
   ============================================================ */
function showToast(msg) {
  const toast = document.getElementById('globalToast');
  if (!toast) return;

  toast.innerHTML = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ============================================================
   9. Scroll Observer & Navbar Scrolled State
   ============================================================ */
function initScrollObserver() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================================
   10. Custom Magnetic Cursor
   ============================================================ */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });
}

/* ============================================================
   11. Audio Trigger Event Listeners
   ============================================================ */
function initSoundTriggers() {
  document.addEventListener('mouseover', (e) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'A' ||
      e.target.closest('.bento-card') ||
      e.target.closest('.skill-bento-tile') ||
      e.target.classList.contains('sound-btn') ||
      e.target.classList.contains('nav-link')
    ) {
      if (window.soundFX) window.soundFX.playHover();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'A' ||
      e.target.classList.contains('sound-btn') ||
      e.target.classList.contains('nav-link')
    ) {
      if (window.soundFX) window.soundFX.playClick();
    }
  });
}

window.openProjectModal = openProjectModal;
window.closeModal = closeModal;
window.copyContactInfo = copyContactInfo;

const PROJECT_MODULES = [
  {
    title: '01 • Multi-Portal Platform & Security',
    summary:
      'Designed and built dedicated Student, Recruiter, and Administrator portals within a unified full-stack architecture. Secured routes and user data with JWT authentication, password hashing, and role-based access control (RBAC).'
  },
  {
    title: '02 • PDF/DOCX Resume Parsing & AI Intelligence',
    summary:
      'Implemented document parsing using PyMuPDF for PDF/DOCX resumes and integrated the Google Gemini API—paired with a resilient local NLP fallback—to extract skills, projects, and certifications and deliver actionable resume improvement suggestions.'
  },
  {
    title: '03 • Weighted Career Compatibility Scoring',
    summary:
      'Engineered a weighted career compatibility scoring system that evaluates student profiles against industry role requirements, surfacing skill gaps and quantitative match insights.'
  },
  {
    title: '04 • Personalized Roadmaps, FastAPI & Automated QA',
    summary:
      'Created personalized learning roadmaps with progress tracking and job/internship application management, powered by Python, FastAPI, SQLite, SQLAlchemy, Docker, and 15 automated tests.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const projectModal = document.getElementById('projectModal');
  const resumeModal = document.getElementById('resumeModal');
  const modalTabDetail = document.getElementById('modalTabDetail');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  function setActiveTab(index) {
    const mod = PROJECT_MODULES[index] || PROJECT_MODULES[0];
    modalTabs.forEach((tab, idx) => {
      tab.classList.toggle('is-active', idx === index);
    });
    modalTabDetail.innerHTML = `<strong>${mod.title}</strong><p style="margin:8px 0 0;color:#5d574f;line-height:1.6;">${mod.summary}</p>`;
  }

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    [projectModal, resumeModal].forEach((m) => {
      if (m) m.hidden = true;
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-project]').forEach((el) => {
    const trigger = () => {
      const idx = Number(el.getAttribute('data-open-project')) || 0;
      setActiveTab(idx);
      openModal(projectModal);
    };
    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });

  document.querySelectorAll('[data-open-resume]').forEach((el) => {
    el.addEventListener('click', () => openModal(resumeModal));
  });

  modalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveTab(Number(tab.getAttribute('data-tab')) || 0);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  [projectModal, resumeModal].forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'chaithuniva44@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = 'Copied: chaithuniva44@gmail.com';
      } catch {
        copyEmailBtn.textContent = email;
      }
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy Email Address';
      }, 2400);
    });
  }

  // Scroll Reveal Animation (only hide elements currently below viewport)
  const reveals = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.96) {
        el.classList.add('will-animate');
        observer.observe(el);
      }
    });
  }
});

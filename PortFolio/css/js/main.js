/* ============================================
   MAIN.JS — Portfolio interactions
   ============================================ */
(function () {
  'use strict';

  /* ---------- Project data (edit freely) ---------- */
  const PROJECTS = [
    {
      eyebrow: 'AI · Platform',
      title: 'AI Content Moderation Platform',
      desc: 'A production-grade moderation system that ingests text and image content, runs it through a fine-tuned classifier, and surfaces flagged items to a human-review dashboard in under 200ms. Built to handle real moderation workloads, not just demos.',
      stack: ['Python', 'FastAPI', 'TensorFlow', 'React', 'PostgreSQL', 'Redis', 'Docker'],
      highlights: [
        'Fine-tuned a BERT-based classifier to 94% F1 on a custom toxic-content dataset.',
        'Async image pipeline using FastAPI background tasks and Redis queues.',
        'Reviewer dashboard with bulk actions, audit logs, and role-based permissions.'
      ],
      github: 'https://github.com/Zubairilyas1'
    },
    {
      eyebrow: 'Healthcare · SaaS',
      title: 'PharmaSync',
      desc: 'An end-to-end pharmacy management system that ties inventory, prescriptions, and supplier orders into a single dashboard — so pharmacists stop juggling three spreadsheets and one notebook.',
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT', 'Chart.js'],
      highlights: [
        'Real-time stock alerts with configurable reorder thresholds.',
        'Prescription workflow with pharmacist verification and patient history.',
        'Supplier portal for purchase orders and invoice reconciliation.'
      ],
      github: 'https://github.com/Zubairilyas1'
    },
    {
      eyebrow: 'EdTech · Portal',
      title: 'Student & Societies Portal',
      desc: 'A university portal connecting students to clubs, events, and society memberships. Built with role-based access so admins, society leads, and students each see exactly what they need.',
      stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind', 'NextAuth'],
      highlights: [
        'Event management with RSVPs, capacity limits, and calendar sync.',
        'Society application workflow with approval chains and role escalation.',
        'Served 100+ active users across six university societies during pilot.'
      ],
      github: 'https://github.com/Zubairilyas1'
    },
    {
      eyebrow: 'Gaming · Multiplayer',
      title: 'Humans vs. Aliens',
      desc: 'A browser-based real-time strategy game where two factions compete on a shared map. Built on WebSockets for sub-100ms tick rates, with persistent leaderboards and matchmaking.',
      stack: ['JavaScript', 'HTML5 Canvas', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
      highlights: [
        'Authoritative server model preventing client-side cheating.',
        'Elo-based matchmaking with ranked and casual queues.',
        'Replay system storing move logs for post-game analysis.'
      ],
      github: 'https://github.com/Zubairilyas1'
    },
    {
      eyebrow: 'Enterprise · CRUD',
      title: 'Library Management System',
      desc: 'A full CRUD system for catalog management, member tracking, and transaction history. Designed around the actual workflow of a small library — not an abstract data model.',
      stack: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Hibernate', 'Maven'],
      highlights: [
        'Role-based access: librarian, member, and admin with granular permissions.',
        'Overdue tracking with automated email reminders via Spring scheduler.',
        'Reporting module exporting transaction history to CSV and PDF.'
      ],
      github: 'https://github.com/Zubairilyas1'
    },
    {
      eyebrow: 'Games · Desktop',
      title: '2D Fighting Game & Console UNO',
      desc: 'Two polished game projects shipped independently — a sprite-based 2D fighter with combo mechanics and frame data, plus a terminal-rendered UNO implementation with AI opponents that actually play a reasonable game.',
      stack: ['C++', 'SDL2', 'Java', 'Swing', 'CMake', 'Maven'],
      highlights: [
        'Fighting game uses a fixed-timestep loop with hitbox/hurtbox collision.',
        'UNO AI uses heuristic evaluation with difficulty scaling across three levels.',
        'Both projects include custom asset pipelines and build scripts.'
      ],
      github: 'https://github.com/Zubairilyas1'
    }
  ];

  /* ---------- DOM refs ---------- */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const circuitTrace = document.getElementById('circuitTrace');
  const traceNodes = Array.from(document.querySelectorAll('.circuit-trace__node'));
  const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'].map(id => document.getElementById(id));
  const modal = document.getElementById('projectModal');
  const modalPanel = modal.querySelector('.modal__panel');
  const modalTitle = document.getElementById('modalTitle');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalDesc = document.getElementById('modalDesc');
  const modalStack = document.getElementById('modalStack');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalGithub = document.getElementById('modalGithub');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));

  let lastFocus = null;
  let isModalOpen = false;

  /* ---------- Nav scroll state ---------- */
  function updateNav() {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------- Mobile menu ---------- */
  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !burger.classList.contains('open');
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => toggleMenu());
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Hero entrance animation ---------- */
  function runHeroEntrance() {
    const reveals = document.querySelectorAll('.hero .reveal');
    const groups = document.querySelectorAll('.hero .reveal-group');
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), 100 + i * 80);
    });
    groups.forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), 200 + i * 70);
    });
  }
  runHeroEntrance();

  /* ---------- Section reveal (IntersectionObserver) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.section--padded').forEach(s => {
    s.querySelectorAll('.section__header, .about__narrative, .about__stats, .skill-group, .timeline__entry, .project-card, .contact__list, .contact__social').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  });

  /* ---------- Circuit trace: position nodes + activate ---------- */
  function positionTraceNodes() {
    if (window.innerWidth < 768) {
      // On mobile, keep trace but scale down
    }
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    traceNodes.forEach((node, i) => {
      const section = sections[i];
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionMiddle = rect.top + rect.height / 2;
      // Position as % of document height
      const absMiddle = window.scrollY + sectionMiddle;
      const percent = (absMiddle / docHeight) * 100;
      node.style.top = percent + '%';
    });
  }

  function updateTraceActivation() {
    const vh = window.innerHeight;
    const triggerLine = vh * 0.5;
    sections.forEach((section, i) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < triggerLine && rect.bottom > triggerLine * 0.4;
      traceNodes[i].classList.toggle('active', inView);
    });
  }

  window.addEventListener('scroll', () => {
    positionTraceNodes();
    updateTraceActivation();
  }, { passive: true });
  window.addEventListener('resize', () => {
    positionTraceNodes();
    updateTraceActivation();
  });
  // Initial
  setTimeout(() => { positionTraceNodes(); updateTraceActivation(); }, 100);

  /* ---------- Modal ---------- */
  function openModal(index) {
    const p = PROJECTS[index];
    if (!p) return;
    lastFocus = document.activeElement;
    modalEyebrow.textContent = p.eyebrow;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalStack.innerHTML = p.stack.map(s => `<span class="tag">${s}</span>`).join('');
    modalHighlights.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    modalGithub.href = p.github;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;
    setTimeout(() => modalPanel.focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isModalOpen = false;
    if (lastFocus) lastFocus.focus();
  }

  projectCards.forEach(card => {
    const handler = () => openModal(parseInt(card.dataset.project, 10));
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });

  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isModalOpen) closeModal();
    // Focus trap
    if (e.key === 'Tab' && isModalOpen) {
      const focusable = modalPanel.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Smooth scroll offset compensation ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();

// ═══════ PRELOADER ═══════
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 600);
});

// ═══════ CUSTOM CURSOR ═══════
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animate() {
    rx += (mx - rx) * .15;
    ry += (my - ry) * .15;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();
  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .pill, .proj-card, .skill-group').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    ring.style.display = 'none';
  }
})();

// ═══════ NAV SCROLL EFFECT ═══════
(function () {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });
})();

// ═══════ HERO TYPEWRITER ═══════
(function () {
  const el = document.getElementById('hero-tag'), txt = 'BTech AI · Alipurduar, India';
  let i = 0;
  function t() { if (i <= txt.length) { el.textContent = txt.slice(0, i); i++; setTimeout(t, 55); } }
  setTimeout(t, 800);
})();

// ═══════ DATA ═══════
const PROJECTS = [
  {
    title: "PLANT DISEASE CLASSIFICATION",
    desc: "Attention-driven multi-ViT architecture for fine-grained plant disease detection. Designing a preprocessing and augmentation pipeline and benchmarking against baseline CNN architectures.",
    stack: ["Python", "PyTorch", "OpenCV", "Vision Transformers"],
    status: "wip",
    link: ""
  },
  {
    title: "WIRELESS DATA TRANSFER",
    desc: "Production-ready wireless file transfer system deployed on Raspberry Pi Zero 2W. Features token-based secure uploads, QR-code access, SSH-gated admin dashboard, and 24-hour auto-expiry with audit logging.",
    stack: ["Python", "Flask", "Raspberry Pi", "Gunicorn"],
    status: "live",
    link: "https://github.com/DebashisMajumder/Wireless-Data-Transfer"
  }
];

const EDUCATION = [
  {
    date: "2023 — 2027",
    institution: "Alipurduar Govt. Engineering & Management College",
    degree: "BTech in Artificial Intelligence",
    detail: "Pursuing",
    chips: ["Machine Learning", "Deep Learning", "DSA", "DBMS", "Computer Networks", "OS", "Probability & Statistics"]
  },
  {
    date: "2022 — 2023",
    institution: "Barajaguli Gopal Academy (WBCHSE)",
    degree: "Higher Secondary — PCM",
    detail: "65.04%",
    chips: ["Physics", "Chemistry", "Mathematics"]
  },
  {
    date: "2020 — 2021",
    institution: "Barajaguli Gopal Academy (WBBSE)",
    degree: "Secondary Education",
    detail: "77.7%",
    chips: []
  }
];

const CERTIFICATES = [
  {
    title: "Python for Data Science, AI and Development",
    issuer: "Coursera",
    link: ""
  }
];

// ═══════ PROJECTS ═══════
(function () {
  const grid = document.getElementById('proj-grid');
  PROJECTS.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'proj-card sr sr-d' + (idx % 4 + 1);
    const badge = p.status === 'live'
      ? '<div class="proj-badge live">● Live</div>'
      : '<div class="proj-badge wip">○ WIP</div>';
    const tags = p.stack.map(t => `<span class="proj-tag">${t}</span>`).join('');

    // Generate a canvas-based abstract visual
    card.innerHTML = `
      <div class="proj-vis">
        <canvas class="pvc" data-title="${p.title}" width="680" height="400"></canvas>
        <div class="proj-vis-overlay"></div>
        ${badge}
      </div>
      <div class="proj-body">
        <div class="proj-name">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tags">${tags}</div>
        <div class="proj-links">${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="proj-link">GitHub ↗</a>` : ''}</div>
      </div>`;

    // Subtle tilt on hover
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    grid.appendChild(card);
  });

  // Generate abstract project visuals
  document.querySelectorAll('.pvc').forEach(cv => {
    cv.width = 680; cv.height = 400;
    const ctx = cv.getContext('2d');
    // Dark gradient background
    const g = ctx.createLinearGradient(0, 0, 680, 400);
    g.addColorStop(0, '#0a0a0a');
    g.addColorStop(1, '#111');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 680, 400);
    // Subtle grid
    ctx.strokeStyle = 'rgba(201,169,110,.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 680; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 400); ctx.stroke(); }
    for (let y = 0; y < 400; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(680, y); ctx.stroke(); }
    // Gold accent line
    ctx.strokeStyle = 'rgba(201,169,110,.5)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(201,169,110,.3)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = 0; x <= 680; x += 3) {
      const y = 200 + Math.sin(x * .02) * 60 + Math.sin(x * .05 + 1) * 25;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Radial glow
    const rg = ctx.createRadialGradient(340, 200, 0, 340, 200, 250);
    rg.addColorStop(0, 'rgba(201,169,110,.08)');
    rg.addColorStop(1, 'transparent');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, 680, 400);
  });
})();

// ═══════ EDUCATION ═══════
(function () {
  const list = document.getElementById('edu-list');
  if (!list) return;
  EDUCATION.forEach(e => {
    const el = document.createElement('div'); el.className = 'edu-item';
    const chips = e.chips.length ? e.chips.map(c => `<span class="chip">${c}</span>`).join('') : '';
    el.innerHTML = `
      <div class="edu-left">
        <div class="edu-date">${e.date}</div>
        <div class="edu-inst">${e.institution}</div>
      </div>
      <div class="edu-right">
        <div class="edu-degree">${e.degree}</div>
        <div class="edu-detail">${e.detail}</div>
        ${chips ? `<div class="edu-chips">${chips}</div>` : ''}
      </div>`;
    list.appendChild(el);
  });

  // Certificates
  const certList = document.getElementById('cert-list');
  if (certList) {
    CERTIFICATES.forEach(c => {
      const el = document.createElement('div'); el.className = 'cert-item';
      el.innerHTML = `
        <div class="cert-icon">◆</div>
        <div class="cert-body">
          <div class="cert-title">${c.title}</div>
          <div class="cert-issuer">${c.issuer}</div>
        </div>`;
      certList.appendChild(el);
    });
  }

  const obs = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }); }, { threshold: .15 });
  document.querySelectorAll('.edu-item, .cert-item').forEach(el => obs.observe(el));
})();

// ═══════ SCROLL REVEAL ═══════
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.sr').forEach(el => obs.observe(el));
})();

// ═══════ CONTACT FORM (Formsubmit.co) ═══════
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const OWNER_EMAIL = 'debashisxmajumder@gmail.com';
  const ACTIVATED_KEY = 'dm_formsubmit_activated';

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const st = document.getElementById('fst'), btn = document.getElementById('sbtn');
    const n = document.getElementById('fn').value.trim();
    const e = document.getElementById('fe').value.trim();
    const m = document.getElementById('fm').value.trim();
    if (!n || !e || !m) { st.textContent = 'Please fill in all fields.'; st.className = 'fstatus err'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { st.textContent = 'Please enter a valid email.'; st.className = 'fstatus err'; return; }

    const wasActivated = localStorage.getItem(ACTIVATED_KEY) === 'true';
    btn.textContent = 'SENDING...'; btn.disabled = true;

    // Give the email a scannable subject line: "Portfolio message from <name>"
    const subjEl = document.getElementById('f-subject');
    if (subjEl) subjEl.value = 'Portfolio message from ' + n;

    try {
      const fd = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        try {
          const msgs = JSON.parse(localStorage.getItem('dm_msgs') || '[]');
          msgs.push({ n, e, m, ts: new Date().toISOString() });
          localStorage.setItem('dm_msgs', JSON.stringify(msgs));
        } catch (_) { }

        if (!wasActivated) {
          // First-ever submission: mark it internally, but the visitor still
          // just sees a normal success message — the activation email note
          // goes to the owner's inbox itself, not the page.
          localStorage.setItem(ACTIVATED_KEY, 'true');
        }
        st.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        st.className = 'fstatus ok';
        btn.textContent = 'MESSAGE SENT ✓';
        form.reset();
        setTimeout(() => { btn.textContent = 'SEND MESSAGE'; btn.disabled = false; }, 3000);
      } else { throw new Error('fail'); }
    } catch (err) {
      // Network / service failure — fall back to a pre-filled mailto link so the
      // message is never lost.
      const subject = encodeURIComponent('Portfolio contact from ' + n);
      const body = encodeURIComponent(m + '\n\n— ' + n + ' (' + e + ')');
      st.innerHTML = 'Could not send automatically. <a href="mailto:' + OWNER_EMAIL + '?subject=' + subject + '&body=' + body + '" style="color:var(--gold);text-decoration:underline">Click here to send via your email app instead</a>.';
      st.className = 'fstatus err';
      btn.textContent = 'SEND MESSAGE'; btn.disabled = false;
    }
  });
})();

// ═══════ NAV ACTIVE ═══════
(function () {
  const links = document.querySelectorAll('nav .nav-link');
  const ids = ['about', 'skills', 'projects', 'education', 'contact'];
  const secs = ids.map(id => document.getElementById(id));
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    let a = -1;
    for (let i = secs.length - 1; i >= 0; i--) {
      if (secs[i] && scrollY >= secs[i].offsetTop) { a = i; break; }
    }
    links.forEach((l, i) => l.classList.toggle('active', i === a));
  });
})();

// ═══════ HAMBURGER MENU ═══════
(function () {
  const btn = document.querySelector('.hamburger');
  const overlay = document.querySelector('.nav-overlay');
  if (!btn || !overlay) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ═══════ RESUME MODAL ═══════
function openR() {
  const o = document.getElementById('r-overlay');
  const frame = document.getElementById('pdf-frame');
  if (!frame.src || !frame.src.includes('resume.pdf')) { frame.src = 'resume.pdf'; }
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeR() {
  document.getElementById('r-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function overlayClick(e) { if (e.target.id === 'r-overlay') closeR(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeR(); });

// ═══════ DYNAMIC FOOTER YEAR ═══════
(function () {
  const el = document.querySelector('.foot-copy');
  if (el) el.innerHTML = `&copy; ${new Date().getFullYear()} Debashis Majumder &mdash; Alipurduar, India`;
})();

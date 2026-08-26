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
  const el = document.getElementById('hero-tag'), txt = 'ML Engineer · Alipurduar, India';
  let i = 0;
  function t() { if (i <= txt.length) { el.textContent = txt.slice(0, i); i++; setTimeout(t, 55); } }
  setTimeout(t, 800);
})();

// ═══════ DATA ═══════
const PROJECTS = [
  {
    title: "WIRELESS DATA TRANSFER",
    desc: "A lightweight, secure Flask-based file sharing application with SSH-only admin access, QR code generation, and automatic file expiration. Built for Raspberry Pi deployments on local networks.",
    stack: ["Python", "Flask", "Raspberry Pi", "SSH", "QR Code"],
    status: "live",
    link: "https://github.com/DebashisMajumder/Wireless-Data-Transfer",
    accent: ["#c9a96e", "#8b6914"]
  },
  {
    title: "ATTENDANCE SYSTEM",
    desc: "Automated facial-recognition attendance system using DeepFace and Flask. Marks attendance in real-time from a live camera feed and persists records to a database.",
    stack: ["Python", "DeepFace", "Flask", "OpenCV", "SQLite"],
    status: "wip",
    link: "https://github.com/DebashisMajumder",
    accent: ["#6e9ec9", "#144d8b"]
  },
  {
    title: "ML INFERENCE ENGINE",
    desc: "Optimized ONNX-based inference pipeline with batching, quantization, and sub-10ms latency for production-grade NLP and CV model serving.",
    stack: ["ONNX", "FastAPI", "Docker", "Python", "CUDA"],
    status: "wip",
    link: null,
    accent: ["#9e6ec9", "#3d1a6e"]
  }
];

const EXPERIENCE = [];

// ═══════ DRAW CANVAS VISUAL ═══════
function drawProjectCanvas(cv, accentColors) {
  cv.width = 680; cv.height = 400;
  const ctx = cv.getContext('2d');
  const [a1, a2] = accentColors || ['#c9a96e', '#8b6914'];
  // Dark gradient background
  const g = ctx.createLinearGradient(0, 0, 680, 400);
  g.addColorStop(0, '#080808'); g.addColorStop(1, '#141414');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 680, 400);
  // Grid
  ctx.strokeStyle = `${a1}08`; ctx.lineWidth = 1;
  for (let x = 0; x < 680; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 400); ctx.stroke(); }
  for (let y = 0; y < 400; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(680, y); ctx.stroke(); }
  // Accent wave
  ctx.strokeStyle = `${a1}99`; ctx.lineWidth = 1.5;
  ctx.shadowColor = a1; ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let x = 0; x <= 680; x += 3) {
    const y = 200 + Math.sin(x * .018) * 55 + Math.sin(x * .048 + 1.2) * 22;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.shadowBlur = 0;
  // Second faint wave
  ctx.strokeStyle = `${a1}30`; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= 680; x += 3) {
    const y = 200 + Math.sin(x * .022 + .8) * 80 + Math.sin(x * .06 + 2) * 30;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Scatter dots
  for (let i = 0; i < 18; i++) {
    const dx = Math.random() * 680, dy = Math.random() * 400;
    ctx.beginPath(); ctx.arc(dx, dy, Math.random() * 1.8 + .4, 0, Math.PI * 2);
    ctx.fillStyle = `${a1}${Math.floor(Math.random() * 80 + 30).toString(16).padStart(2,'0')}`;
    ctx.fill();
  }
  // Radial glow
  const rg = ctx.createRadialGradient(340, 200, 0, 340, 200, 260);
  rg.addColorStop(0, `${a1}14`); rg.addColorStop(1, 'transparent');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, 680, 400);
}

// ═══════ PROJECTS ═══════
(function () {
  const grid = document.getElementById('proj-grid');
  const featContainer = document.getElementById('proj-featured');

  PROJECTS.forEach((p, idx) => {
    const tags = p.stack.map(t => `<span class="proj-tag">${t}</span>`).join('');
    const badge = p.status === 'live'
      ? `<div class="proj-badge live">● Live</div>`
      : `<div class="proj-badge wip">○ WIP</div>`;
    const numStr = String(idx + 1).padStart(2, '0');

    if (idx === 0 && featContainer) {
      // ── Featured card ──────────────────────
      const feat = document.createElement('div');
      feat.className = 'proj-feat-card sr';
      feat.innerHTML = `
        <div class="proj-feat-vis">
          <canvas class="pvc-feat" width="680" height="400"></canvas>
          <div class="proj-feat-vis-overlay"></div>
          <div class="proj-feat-num">${numStr}</div>
        </div>
        <div class="proj-feat-body">
          <div class="proj-feat-eyebrow">Featured Project</div>
          <div class="proj-feat-title">${p.title}</div>
          <div class="proj-feat-desc">${p.desc}</div>
          <div class="proj-feat-tags">${tags}</div>
          <div class="proj-feat-links">
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="proj-link">GitHub ↗</a>` : ''}
            <div class="proj-feat-badge">${p.status === 'live' ? '● Live' : '○ WIP'}</div>
          </div>
        </div>`;
      featContainer.appendChild(feat);
      // Draw canvas
      const cv = feat.querySelector('.pvc-feat');
      drawProjectCanvas(cv, p.accent);

      // Subtle tilt
      feat.addEventListener('mousemove', e => {
        const r = feat.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        feat.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
      });
      feat.addEventListener('mouseleave', () => { feat.style.transform = ''; });
    } else {
      // ── Regular card ──────────────────────
      const card = document.createElement('div');
      card.className = 'proj-card sr sr-d' + (idx % 4 + 1);
      card.innerHTML = `
        <div class="proj-vis">
          <canvas class="pvc" width="680" height="400"></canvas>
          <div class="proj-vis-overlay"></div>
          ${badge}
        </div>
        <div class="proj-body">
          <div class="proj-num">${numStr}</div>
          <div class="proj-name">${p.title}</div>
          <div class="proj-desc">${p.desc}</div>
          <div class="proj-tags">${tags}</div>
          <div class="proj-links">${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="proj-link">GitHub ↗</a>` : ''}</div>
        </div>`;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      grid.appendChild(card);

      // Draw canvas
      const cv = card.querySelector('.pvc');
      drawProjectCanvas(cv, p.accent);
    }
  });
})();

// ═══════ EXPERIENCE ═══════
(function () {
  const list = document.getElementById('exp-list');
  EXPERIENCE.forEach(e => {
    const el = document.createElement('div'); el.className = 'exp-item';
    const chips = e.chips.map(c => `<span class="chip">${c}</span>`).join('');
    el.innerHTML = `<div><div class="exp-date">${e.date}</div><div class="exp-co">${e.company}</div></div><div><div class="exp-role">${e.role}</div><div class="exp-desc">${e.desc}</div><div class="exp-chips">${chips}</div></div>`;
    list.appendChild(el);
  });
  const obs = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }); }, { threshold: .15 });
  document.querySelectorAll('.exp-item').forEach(el => obs.observe(el));
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
  const ids = ['about', 'skills', 'projects', 'experience', 'contact'];
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

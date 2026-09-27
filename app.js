/* ═══════════════════════════════════════════════════════════
   BYTS & BYTES — Interaction Engine
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const PROGRAMS = window.PROGRAMS || [];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const header = $("#header");
  const nav = $("#nav");
  const navToggle = $("#nav-toggle");
  const form = $("#contact-form");
  const formStatus = $("#form-status");
  const yearEl = $("#year");
  const heroVideo = $("#hero-video");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Hero logo video: autoplay · loop · muted · playsinline */
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");
    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("loop", "");

    const tryPlay = () => {
      const p = heroVideo.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const resume = () => {
            heroVideo.play().catch(() => {});
            window.removeEventListener("pointerdown", resume);
            window.removeEventListener("touchstart", resume);
          };
          window.addEventListener("pointerdown", resume, { once: true });
          window.addEventListener("touchstart", resume, { once: true });
        });
      }
    };

    if (heroVideo.readyState >= 2) tryPlay();
    else heroVideo.addEventListener("loadeddata", tryPlay, { once: true });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });
  }

  /* Header scroll */
  const onScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  navToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* Cursor glow (optional — only if element present) */
  const cursorGlow = $("#cursor-glow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let glowX = 0;
    let glowY = 0;
    let glowTX = 0;
    let glowTY = 0;
    const tickGlow = () => {
      glowX += (glowTX - glowX) * 0.12;
      glowY += (glowTY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(tickGlow);
    };
    window.addEventListener(
      "pointermove",
      (e) => {
        glowTX = e.clientX;
        glowTY = e.clientY;
      },
      { passive: true }
    );
    requestAnimationFrame(tickGlow);
  }

  /* Scroll reveal */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ─── Circuit canvas ─── */
  const canvas = $("#circuit-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes = [];
    let pulses = [];
    let traces = [];
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pathLength = (pts) => {
      let len = 0;
      for (let i = 1; i < pts.length; i++) {
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      }
      return len || 1;
    };

    const pointOnPath = (pts, t) => {
      const total = pathLength(pts);
      let target = t * total;
      for (let i = 1; i < pts.length; i++) {
        const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (target <= seg) {
          const u = seg ? target / seg : 0;
          return {
            x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * u,
            y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * u,
          };
        }
        target -= seg;
      }
      return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y };
    };

    const buildNetwork = () => {
      const cols = Math.max(6, Math.floor(w / 140));
      const rows = Math.max(4, Math.floor(h / 140));
      const gapX = w / (cols + 1);
      const gapY = h / (rows + 1);
      nodes = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: gapX * (c + 1) + (Math.random() - 0.5) * gapX * 0.35,
            y: gapY * (r + 1) + (Math.random() - 0.5) * gapY * 0.35,
            r: Math.random() > 0.85 ? 2.2 : 1.2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      traces = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let links = 0;
        for (let j = i + 1; j < nodes.length && links < 2; j++) {
          const b = nodes[j];
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist < gapX * 1.6 && dist > 20) {
            const mid =
              Math.random() > 0.5
                ? [
                    { x: a.x, y: a.y },
                    { x: b.x, y: a.y },
                    { x: b.x, y: b.y },
                  ]
                : [
                    { x: a.x, y: a.y },
                    { x: a.x, y: b.y },
                    { x: b.x, y: b.y },
                  ];
            traces.push({ points: mid });
            links++;
          }
        }
      }

      pulses = [];
      const pulseCount = Math.min(28, Math.floor(traces.length * 0.35));
      for (let i = 0; i < pulseCount; i++) {
        const t = traces[Math.floor(Math.random() * traces.length)];
        if (!t) continue;
        pulses.push({
          trace: t,
          t: Math.random(),
          speed: 0.0012 + Math.random() * 0.0022,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNetwork();
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);

      // Subtle light-theme circuit grid
      ctx.strokeStyle = "rgba(0, 140, 190, 0.045)";
      ctx.lineWidth = 1;
      const grid = 72;
      ctx.beginPath();
      for (let x = 0; x < w; x += grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      for (const tr of traces) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 150, 200, 0.1)";
        const pts = tr.points;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const pulse = 0.45 + 0.55 * Math.sin(time * 0.0015 + n.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 160, 210, ${0.1 + pulse * 0.16})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          const pt = pointOnPath(p.trace.points, p.t);
          const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 5);
          g.addColorStop(0, "rgba(0, 180, 230, 0.5)");
          g.addColorStop(0.4, "rgba(0, 160, 210, 0.18)");
          g.addColorStop(1, "rgba(0, 160, 210, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "rgba(0, 140, 190, 0.7)";
          ctx.arc(pt.x, pt.y, p.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", () => {
      if (reduced) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
  }

  /* ─── Our work cards ─── */
  const GROUPS = [
    "Insta platform products",
    "Marketplaces & client websites",
    "Internal tools & operations",
  ];

  const escapeHTML = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const statusClass = (status) => {
    if (status === "Live") return "is-live";
    if (status === "In progress") return "is-progress";
    return "is-quiet";
  };

  const glyphFor = (category) => {
    if (category === "Insta platform products") {
      return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect x="7" y="9" width="34" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 18h34M16 18v21" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
    }
    if (category === "Marketplaces & client websites") {
      return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="14" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="34" cy="15" r="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="34" cy="33" r="5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M19 22.5 29 17M19 25.5 29 31" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
    }
    return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M24 7 39 16v16L24 41 9 32V16z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M24 24v17M24 24 9 16M24 24l15-8" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
  };

  const programCard = (prog) => {
    const media = prog.image
      ? `<img src="${escapeHTML(prog.image)}" alt="${escapeHTML(prog.imageAlt || prog.name)}" />`
      : `<div class="work-type">
          <div class="work-glyph">${glyphFor(prog.category)}</div>
          <p class="work-type-name">${escapeHTML(prog.name)}</p>
        </div>`;
    const visit = prog.url
      ? `<a class="work-visit" href="${escapeHTML(prog.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHTML(prog.name)} (opens in a new tab)">Visit site</a>`
      : "";
    return `<article class="work-card">
      <div class="work-media">${media}</div>
      <div class="work-body">
        <p class="work-cat">${escapeHTML(prog.category)}</p>
        <h3>${escapeHTML(prog.name)}</h3>
        <p class="work-pitch">${escapeHTML(prog.pitch)}</p>
        <div class="work-foot">
          <span class="work-status ${statusClass(prog.status)}">${escapeHTML(prog.status)}</span>
          ${visit}
        </div>
      </div>
    </article>`;
  };

  const workGrid = $("#work-grid");
  if (workGrid) {
    workGrid.innerHTML = PROGRAMS.filter((prog) => prog.featured).map(programCard).join("");
  }

  const workCatalog = $("#work-catalog");
  if (workCatalog) {
    workCatalog.innerHTML = GROUPS.map((group) => {
      const id = group.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const cards = PROGRAMS.filter((prog) => prog.category === group).map(programCard).join("");
      return `<section class="work-group" aria-labelledby="${id}">
        <h2 id="${id}">${escapeHTML(group)}</h2>
        <div class="work-grid">${cards}</div>
      </section>`;
    }).join("");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !nav?.classList.contains("open")) return;
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    navToggle?.focus();
  });

  /* Contact form → mailto:hello@bytsandbytes.com */
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      formStatus.textContent = "All fields required to transmit.";
      formStatus.classList.add("text-rose-400");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.textContent = "Invalid email address.";
      formStatus.classList.add("text-rose-400");
      return;
    }

    formStatus.classList.remove("text-rose-400");
    formStatus.textContent = "Opening secure channel…";

    setTimeout(() => {
      const subject = encodeURIComponent(`Byts & Bytes — Signal from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMission brief:\n${message}`
      );
      formStatus.textContent = "Signal ready — check your mail client.";
      form.reset();
      window.location.href = `mailto:hello@bytsandbytes.com?subject=${subject}&body=${body}`;
    }, 500);
  });
})();

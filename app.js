/* ═══════════════════════════════════════════════════════════
   BYTS & BYTES — Interaction Engine
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const PROGRAMS = [
    {
      id: "kraken",
      code: "BB-01 · KRAKEN",
      title: "Kraken",
      url: "kraken",
      tagline: "Multi-company command center for operators who run empires, not spreadsheets.",
      status: "live",
      statusLabel: "Live System",
      summary:
        "Kraken is the operational nucleus for multi-entity businesses — companies, purchase orders, tasking, Gmail-linked workflows, and executive dashboards fused into one sealed command surface.",
      features: [
        "Company switcher with full CRUD and governance",
        "Purchase orders with PDF preview and sent history",
        "Kanban tasking across To Do / Doing / Done",
        "Executive overview with realtime signal density",
        "Gmail connect for operational communication loops",
      ],
      tech: ["Next.js", "Supabase", "Zustand", "Auth", "PDF"],
      accent: "#00b4e6",
      image: "assets/kraken.png",
      mockTheme: "ocean",
    },
    {
      id: "instacrm",
      code: "BB-02 · INSTACRM",
      title: "InstaCRM",
      url: "instacrm",
      tagline: "Relationship intelligence for teams that outgrow generic CRM theater.",
      status: "live",
      statusLabel: "Live System",
      summary:
        "InstaCRM is a bespoke customer relationship layer — pipeline clarity, stakeholder maps, and follow-through designed around how your operators actually sell and deliver.",
      features: [
        "Pipeline boards tuned to real deal stages",
        "Contact & company graphs with context",
        "Task and follow-up loops that stick",
        "Lightweight reporting without bloat",
        "Integrations where they earn their keep",
      ],
      tech: ["React", "API", "Auth", "Realtime"],
      accent: "#0090c8",
      image: null,
      mockTheme: "slate",
    },
    {
      id: "instapreview",
      code: "BB-03 · INSTAPREVIEW",
      title: "InstaPreView",
      url: "instapreview.co",
      liveUrl: "https://www.instapreview.co",
      tagline: "Know what they'll flag — before you submit.",
      status: "live",
      statusLabel: "Live Product",
      summary:
        "InstaPreView gives your plan set a professional digital pre-review against the standards your local jurisdiction enforces — surfacing the comments, omissions, and code conflicts that send submittals back. Your first 10 findings are complimentary.",
      explainer:
        "Upload a plan set and get an AI-assisted building-code pre-review tuned to the AHJ you actually submit to. InstaPreView screens for the issues plan reviewers cite most — egress, accessibility, fire ratings, zoning, energy, missing sheets, and local amendments — then returns a ranked findings list with severity and code citations so teams fix issues before formal review. Built for architects, designers, and engineers who need a fresh set of eyes before the real one.",
      features: [
        "Jurisdiction-aware code pre-review",
        "Ranked findings with severity & citations",
        "Egress, ADA, fire, zoning & energy checks",
        "First 10 findings free on every scan",
        "Results in minutes · shareable PDF export",
      ],
      tech: ["React", "Vite", "API", "AI Review", "PDF"],
      accent: "#1c3a5e",
      image: "assets/instapreview.png",
      screenshot: "assets/instapreview-screenshot.jpg",
      mockTheme: "mint",
    },
    {
      id: "sealguard",
      code: "BB-04 · SEALGUARD",
      title: "SealGuard",
      url: "sealguard.co",
      tagline: "Document integrity and professional seal verification for regulated work.",
      status: "live",
      statusLabel: "Deployed",
      summary:
        "SealGuard protects the chain of trust around professional seals, licensing evidence, and verification trails — so compliance is enforced, not assumed.",
      features: [
        "Seal verification workflows with audit trails",
        "Firm identity and licensing governance",
        "Evidence PDF generation and notice systems",
        "Registry and status surfaces for operators",
        "Webhook-ready enforcement hooks",
      ],
      tech: ["Python", "FastAPI", "Auth", "PDF", "Security"],
      accent: "#0077a8",
      image: "assets/sealguard.png",
      mockTheme: "navy",
    },
    {
      id: "forge",
      code: "BB-05 · FORGE",
      title: "The Forge",
      url: "custom",
      tagline: "Bespoke platforms when commodity tools become the bottleneck.",
      status: "open",
      statusLabel: "Commission Open",
      summary:
        "The Forge is how futures get built from zero — custom platforms, AI-assisted domain systems, and long-horizon products designed around your actual constraints.",
      features: [
        "First-principles product architecture",
        "Full-stack delivery with hard operational edges",
        "AI routing tuned to your domain, not generic chat",
        "Runbooks, monitoring, and evolution paths",
        "Partnership model — not a ticket queue",
      ],
      tech: ["Custom Stack", "AI Systems", "Cloud", "Ops"],
      accent: "#2dd4ff",
      image: "assets/logo.jpg",
      mockTheme: "forge",
    },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const header = $("#header");
  const nav = $("#nav");
  const navToggle = $("#nav-toggle");
  const paperStack = $("#paper-stack");
  const paperExpand = $("#paper-expand");
  const paperExpandBackdrop = $("#paper-expand-backdrop");
  const paperExpandPanel = $("#paper-expand-panel");
  const detailInner = $("#detail-inner");
  const detailClose = $("#detail-close");
  const paperHint = $("#paper-hint");
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

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
  }

  /* ─── Paper portfolio ─── */
  let activeId = null;

  /**
   * Spread angled stack across the stage:
   * ~30–35% off-screen (≈65–70% of each folio visible), slight overlap.
   */
  const stackTransforms = (index, total, hoverIndex = null) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    // Off-screen amount of paper width (lower = more visible)
    let peekX = 32; // ~68% of card still on-screen
    // Spread farther across the page
    const stackY = offset * 72;
    const stackX = offset * 92 + index * 10;
    const rot = -10 + index * 3.2 + offset * 0.8;
    let lift = 0;
    let pull = 0;
    let liftRot = 0;
    let scale = 1;

    if (hoverIndex !== null && hoverIndex === index && activeId === null) {
      peekX = 22; // pull further into view
      lift = -14;
      pull = -36;
      liftRot = -1.5;
      scale = 1.03;
    }

    return {
      // Anchored right-center; translateX peeks a slice off-screen
      transform: `translateY(calc(-50% + ${stackY + lift}px)) translateX(calc(${peekX}% + ${stackX + pull}px)) rotate(${rot + liftRot}deg) scale(${scale})`,
      zIndex: 10 + index,
    };
  };

  const escapeHTML = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const applyStackHover = (hoverIndex) => {
    $$(".paper", paperStack).forEach((el, index) => {
      const t = stackTransforms(index, PROGRAMS.length, hoverIndex);
      el.style.transform = t.transform;
      el.style.zIndex = String(hoverIndex === index ? 80 : t.zIndex);
    });
  };

  const mockShotHTML = (prog) => `
    <div class="expand-shot-mock" data-theme="${escapeHTML(prog.mockTheme || "ocean")}">
      <div class="chrome"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
      <div class="mock-nav">
        <span style="width:18%"></span>
        <span style="width:12%;opacity:.6"></span>
        <span style="width:10%;opacity:.5"></span>
        <span style="width:14%;opacity:.55;margin-left:auto"></span>
      </div>
      <div class="mock-body">
        <div class="mock-side"></div>
        <div class="mock-main">
          <div class="mock-kpis"><div class="kpi"></div><div class="kpi"></div><div class="kpi"></div></div>
          <div class="mock-chart"></div>
        </div>
      </div>
    </div>
  `;

  const paperThumbHTML = (prog) => {
    const src = prog.screenshot || prog.image;
    if (src) {
      return `<div class="paper-thumb"><img src="${escapeHTML(src)}" alt="${escapeHTML(prog.title)} preview" /></div>`;
    }
    return `<div class="paper-thumb"><div class="paper-thumb-mock"><div class="bar"></div><div class="row"><div class="cell"></div><div class="cell"></div></div><div class="row"><div class="cell"></div><div class="cell"></div></div></div></div>`;
  };

  const expandShotHTML = (prog) => {
    const shot = prog.screenshot;
    const badge = prog.image
      ? `<div class="expand-logo-badge"><img src="${escapeHTML(prog.image)}" alt="" /><strong>${escapeHTML(prog.title)}</strong></div>`
      : `<div class="expand-logo-badge"><strong>${escapeHTML(prog.title)}</strong></div>`;

    if (shot) {
      return `
        <div class="expand-shot has-photo">
          <img src="${escapeHTML(shot)}" alt="${escapeHTML(prog.title)} product screenshot" />
          ${badge}
        </div>
      `;
    }
    return `<div class="expand-shot">${mockShotHTML(prog)}${badge}</div>`;
  };

  const buildDetailHTML = (prog) => {
    const features = prog.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("");
    const tech = prog.tech.map((t) => `<span>${escapeHTML(t)}</span>`).join("");
    const explainer = prog.explainer || prog.summary;
    const liveUrl = prog.liveUrl || (prog.url && prog.url.includes(".") ? `https://www.${prog.url}` : null);
    const liveBtn = liveUrl
      ? `<a class="btn-primary btn-live" href="${escapeHTML(liveUrl)}" target="_blank" rel="noopener noreferrer">
           Visit ${escapeHTML(prog.title)} →
         </a>`
      : "";

    return `
      ${expandShotHTML(prog)}
      <div class="expand-body">
        <div class="expand-copy">
          <div class="detail-code">${escapeHTML(prog.code)}${prog.url ? ` · ${escapeHTML(prog.url)}` : ""}</div>
          <h3 id="expand-title">${escapeHTML(prog.title)}</h3>
          <span class="detail-badge">${escapeHTML(prog.statusLabel)}</span>
          <p class="lead">${escapeHTML(prog.tagline)}</p>
          <h4>Overview</h4>
          <p>${escapeHTML(prog.summary)}</p>
          <h4 style="margin-top:1.15rem">How it works</h4>
          <p>${escapeHTML(explainer)}</p>
          <h4 style="margin-top:1.15rem">Capabilities</h4>
          <ul class="feature-list">${features}</ul>
          <h4>Stack</h4>
          <div class="tech-pills">${tech}</div>
        </div>
        <div class="expand-side">
          <div class="demo-panel">
            <header>
              <span>Interactive demo</span>
              <em>${liveUrl ? "Live product online" : "Placeholder"}</em>
            </header>
            <div class="demo-canvas" aria-hidden="true"></div>
            ${
              liveUrl
                ? `<a class="demo-link" href="${escapeHTML(liveUrl)}" target="_blank" rel="noopener noreferrer">Open live demo on ${escapeHTML(prog.url || prog.title)}</a>`
                : ""
            }
          </div>
        </div>
        <div class="detail-cta">
          ${liveBtn}
          <button type="button" class="btn-ghost" data-contact-intent="message" data-program-id="${escapeHTML(prog.id)}">
            Message me about this
          </button>
          <button type="button" class="btn-ghost" data-contact-intent="build" data-program-id="${escapeHTML(prog.id)}">
            Build me something like this
          </button>
        </div>
      </div>
    `;
  };

  const openPaper = (id) => {
    if (activeId === id) {
      closePaper();
      return;
    }
    const prog = PROGRAMS.find((p) => p.id === id);
    if (!prog) return;
    activeId = id;

    paperHint?.classList.add("hidden");

    // Selected paper slides toward center & straightens, then expands
    $$(".paper", paperStack).forEach((el, index) => {
      if (el.dataset.id === id) {
        el.classList.add("active");
        el.style.zIndex = "90";
        el.style.transition =
          "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease 0.2s, box-shadow 0.4s";
        el.style.boxShadow = "0 40px 90px rgba(11,31,58,0.25)";
        // Slide fully on-screen, rotate to straight
        el.style.transform =
          "translateY(-50%) translateX(calc(-55vw + 50%)) rotate(0deg) scale(1.02)";
        el.style.opacity = "0";
      } else {
        el.style.transition =
          "opacity 0.4s ease, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.opacity = "0.25";
        const t = stackTransforms(index, PROGRAMS.length);
        el.style.transform = t.transform;
      }
    });

    detailInner.innerHTML = buildDetailHTML(prog);

    window.setTimeout(() => {
      if (activeId !== id) return;
      paperStack?.classList.add("dimmed");
      paperExpand?.classList.add("open");
      paperExpand?.setAttribute("aria-hidden", "false");
      document.body.classList.add("paper-open");
      detailClose?.focus();
    }, 320);
  };

  const closePaper = () => {
    activeId = null;
    paperExpand?.classList.remove("open");
    paperExpand?.setAttribute("aria-hidden", "true");
    paperStack?.classList.remove("dimmed");
    paperHint?.classList.remove("hidden");
    document.body.classList.remove("paper-open");

    $$(".paper", paperStack).forEach((el, index) => {
      el.classList.remove("active");
      el.style.opacity = "1";
      el.style.boxShadow = "";
      el.style.transition =
        "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s, box-shadow 0.4s, border-color 0.3s";
      const t = stackTransforms(index, PROGRAMS.length);
      el.style.transform = t.transform;
      el.style.zIndex = String(t.zIndex);
    });
  };

  /** Prefill contact form for a program + intent, then scroll to contact */
  const openContactForProgram = (programId, intent) => {
    const prog = PROGRAMS.find((p) => p.id === programId);
    if (!prog || !form) return;

    closePaper();

    const messageField = form.querySelector('[name="message"]');

    let message = "";
    if (intent === "build") {
      message =
        `I'd like you to build something like ${prog.title}` +
        (prog.url && prog.url !== "custom" ? ` (${prog.url})` : "") +
        `.\n\n` +
        `What I'm aiming for:\n` +
        `• Inspired by: ${prog.tagline}\n` +
        `• Context: [tell us about your workflow]\n` +
        `• Timeline / constraints: [optional]`;
    } else {
      message =
        `I'd like to learn more about ${prog.title}` +
        (prog.url && prog.url !== "custom" ? ` (${prog.url})` : "") +
        `.\n\n` +
        `${prog.tagline}\n\n` +
        `My questions:\n` +
        `• \n` +
        `• `;
    }

    if (messageField) {
      messageField.value = message;
      messageField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Highlight contact card briefly
    const contactSection = $("#contact");
    window.setTimeout(() => {
      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      form.classList.add("contact-prefilled");
      messageField?.focus();
      if (formStatus) {
        formStatus.textContent =
          intent === "build"
            ? `Prefilling for a build inspired by ${prog.title}…`
            : `Prefilling a message about ${prog.title}…`;
      }
      window.setTimeout(() => form.classList.remove("contact-prefilled"), 2400);
    }, 280);
  };

  const renderStack = () => {
    if (!paperStack) return;
    paperStack.innerHTML = "";

    PROGRAMS.forEach((prog, index) => {
      const el = document.createElement("article");
      el.className = "paper";
      el.dataset.id = prog.id;
      el.dataset.index = String(index);
      el.setAttribute("role", "listitem");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `Open ${prog.title} folio`);

      const statusClass = prog.status === "live" || prog.status === "open" ? "live" : "";

      el.innerHTML = `
        <div class="paper-spine" style="background: linear-gradient(180deg, ${prog.accent}, #006a8a)"></div>
        <div class="paper-content">
          ${paperThumbHTML(prog)}
          <div class="paper-code">${escapeHTML(prog.code)}</div>
          <h3 class="paper-title">${escapeHTML(prog.title)}</h3>
          <p class="paper-tagline">${escapeHTML(prog.tagline)}</p>
          <div class="paper-footer">
            <span class="paper-status ${statusClass}">${escapeHTML(prog.statusLabel)}</span>
            <span class="paper-action">Slide free →</span>
          </div>
        </div>
      `;

      const t = stackTransforms(index, PROGRAMS.length);
      el.style.transform = t.transform;
      el.style.zIndex = String(t.zIndex);

      el.addEventListener("mouseenter", () => {
        if (activeId) return;
        applyStackHover(index);
      });
      el.addEventListener("mouseleave", () => {
        if (activeId) return;
        applyStackHover(null);
      });
      el.addEventListener("click", () => openPaper(prog.id));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPaper(prog.id);
        }
      });

      paperStack.appendChild(el);
    });
  };

  detailClose?.addEventListener("click", closePaper);
  paperExpandBackdrop?.addEventListener("click", closePaper);

  paperExpand?.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-contact-intent]");
    if (!btn) return;
    const intent = btn.getAttribute("data-contact-intent");
    const programId = btn.getAttribute("data-program-id");
    if (intent && programId) openContactForProgram(programId, intent);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeId) closePaper();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!activeId) applyStackHover(null);
    }, 120);
  });

  renderStack();

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

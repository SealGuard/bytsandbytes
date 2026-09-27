/* Shared program archive for the homepage and /work.
   Copy is limited to verified facts. Do not add metrics, pricing,
   client names, testimonials, or repository links. */
(function () {
  "use strict";

  window.PROGRAMS = [
    {
      id: "instacrm",
      name: "InstaCRM",
      category: "Insta platform products",
      pitch:
        "CRM, operations, and accounting for architecture, engineering, and construction firms. Each firm gets its own workspace and runs the job from plan set to paid invoice, under your brand.",
      status: "Live",
      url: "https://instacrm.co",
      image: "assets/work/instacrm.jpg",
      imageAlt: "InstaCRM homepage",
      featured: true,
    },
    {
      id: "instapreview",
      name: "InstaPreView",
      category: "Insta platform products",
      pitch:
        "AI building-code pre-review for plan sets. It scans a set against the jurisdiction's adopted codes and flags likely code issues before submission to the AHJ.",
      status: "Live",
      url: "https://www.instapreview.co",
      image: "assets/work/instapreview.jpg",
      imageAlt: "InstaPreView product screen",
      featured: true,
    },
    {
      id: "octone",
      name: "Octone",
      category: "Insta platform products",
      pitch:
        "Business phone system for the whole company: numbers the business owns, with calls and texts in the browser, on a desk phone, or in the iPhone app. It runs on its own or as a bolt-on to InstaCRM.",
      status: "Live",
      url: "https://octone.co",
      image: "assets/work/octone.jpg",
      imageAlt: "Octone homepage",
      featured: true,
    },
    {
      id: "instamate",
      name: "InstaMate",
      category: "Insta platform products",
      pitch:
        "Construction price estimating for contractors, subs, and professionals. Upload a plan set, review the takeoff the engine extracts, then publish a formal, downloadable quote.",
      status: "Live",
      url: "https://www.instamate.co",
      image: "assets/work/instamate.jpg",
      imageAlt: "InstaMate sign-in page",
      featured: true,
    },
    {
      id: "instawork",
      name: "InstaWork",
      category: "Insta platform products",
      pitch:
        "Offline-first construction field operations: walkie, plans, RFIs, and team GPS, with admin, field, and vendor portals for each workspace.",
      status: "Live",
      url: "https://instawork-three.vercel.app",
      image: "assets/work/instawork.jpg",
      imageAlt: "InstaWork homepage",
      featured: true,
    },
    {
      id: "sealguard",
      name: "SealGuard",
      category: "Insta platform products",
      pitch:
        "A live digital seal for stamped documents. It binds a tamper-evident, scannable QR seal to each sealed PDF so anyone can confirm it is authentic, current, and authorized, and the professional can revoke a forged or unauthorized set.",
      status: "Live",
      url: "https://sealguard-site.vercel.app",
      image: "assets/work/sealguard.jpg",
      imageAlt: "SealGuard homepage",
      featured: true,
    },
    {
      id: "instacommercial",
      name: "InstaCommercial",
      category: "Insta platform products",
      pitch:
        "Auto-generates commercial plan-set detail sheets. A frozen, provenance-checked detail library feeds an AI selection step and a placement engine, with a human review gate before anything is issued.",
      status: "Private build",
      featured: true,
    },
    {
      id: "instaprotect",
      name: "InstaProtect",
      category: "Insta platform products",
      pitch:
        "Sell any PDF behind a watermark and a paywall. Buyers see a watermarked preview with download and print locked until they pay, then the clean file is released.",
      status: "Private build",
      featured: true,
    },
    {
      id: "instaarch-cad-library",
      name: "InstaArch CAD Library",
      category: "Insta platform products",
      pitch:
        "A deduplicated CAD block library from InstaArch's own delivered work, indexed by CSI MasterFormat and served over an internal API to plan generators.",
      status: "Internal tool",
      featured: true,
    },
    {
      id: "acre-angle",
      name: "Acre & Angle",
      category: "Marketplaces & client websites",
      pitch:
        "Pay-per-lead marketplace that matches clients with verified architectural and engineering professionals. One project brief is screened and qualified, then shared only with the matched professionals.",
      status: "Live",
      url: "https://www.acreangle.com",
      image: "assets/work/acreangle.jpg",
      imageAlt: "Acre and Angle homepage",
    },
    {
      id: "instaarch-website",
      name: "InstaArch website rebuild",
      category: "Marketplaces & client websites",
      pitch:
        "Custom Next.js rebuild of the InstaArch LLC marketing site for stamped commercial plans, with a plan-set gallery and an inquiry form.",
      status: "In progress",
    },
    {
      id: "related-plumbing",
      name: "Related Companies Plumbing Services",
      category: "Marketplaces & client websites",
      pitch:
        "Commercial plumbing website concept for a Houston-based plumbing company, with interactive wrench navigation.",
      status: "Live",
      url: "https://related-plumbing-website.vercel.app",
      image: "assets/work/plumbing.jpg",
      imageAlt: "Related Companies Plumbing Services homepage",
    },
    {
      id: "kraken",
      name: "Kraken Command",
      category: "Internal tools & operations",
      pitch:
        "Multi-company command center: a company switcher, purchase orders with PDF preview and sent history, a task kanban, an executive dashboard, and Gmail connect.",
      status: "Internal tool",
      image: "assets/work/kraken.jpg",
      imageAlt: "Kraken Command purchase order screen",
    },
    {
      id: "pulpo",
      name: "Pulpo",
      category: "Internal tools & operations",
      pitch:
        "Employee portal for day-to-day work across companies, including phone, tasks, reporting, and tools. Access to each company is granted from Kraken.",
      status: "Internal tool",
    },
    {
      id: "ainsley",
      name: "Ainsley",
      category: "Internal tools & operations",
      pitch:
        "AI assistant for the Insta stack: CRM-aware chat, plus call intelligence that places calls, transcribes them, extracts and verifies details, and saves them to the CRM, with human approval for unknown contacts.",
      status: "Private build",
    },
    {
      id: "city",
      name: "Byts & Bytes City",
      category: "Internal tools & operations",
      pitch:
        "Interactive home screen: a layered paper-cut city where each district opens a door into one of our programs. Lighting follows Pacific time.",
      status: "Internal tool",
    },
    {
      id: "cfs-framing",
      name: "CFS Framing Estimator",
      category: "Internal tools & operations",
      pitch:
        "Cold-formed steel framing estimator: plan PDF takeoff to a FrameCAD-calibrated bill of materials and pricing.",
      status: "Private build",
    },
    {
      id: "architect-ai",
      name: "Architect AI",
      category: "Internal tools & operations",
      pitch:
        "R&D studio that uses Gemini to read DXF drawings, map layers to AIA standards, and draft bills of materials and permit packages.",
      status: "Internal R&D",
    },
  ];
})();

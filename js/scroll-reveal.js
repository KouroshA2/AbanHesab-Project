(function () {
  window.AH = window.AH || {};

  function init() {
    // ---------- Auto reveal for existing cards/sections that don't already have .reveal ----------
    // Cards get their own reveal + stagger even when their grid container is already revealed
    // (produces the card-by-card cascade); single blocks (headers/hero copy) stay skip-if-ancestor-revealed
    // to avoid doubling motion. This extends the same reveal system already in place, no new mechanism.
    const cardRevealSelector =
      ".goal-card, .service-card, .industry-tile, .cred-card, .member-card, " +
      ".contact-info-card, .value-item, .timeline-item, .stat-item";
    const singleRevealSelector =
      ".section-head, .page-hero .hero-copy, .empty-state";
    const staggerCounts = new Map();

    document.querySelectorAll(cardRevealSelector).forEach((el) => {
      if (el.classList.contains("reveal")) return;
      const parent = el.parentElement;
      const idx = staggerCounts.get(parent) || 0;
      staggerCounts.set(parent, idx + 1);
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
    });

    document.querySelectorAll(singleRevealSelector).forEach((el) => {
      if (el.classList.contains("reveal")) return;
      if (el.closest(".reveal")) return;
      el.classList.add("reveal");
    });

    // ---------- Reveal on scroll ----------
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  window.AH.scrollReveal = { init: init };
})();

(function () {
  window.AH = window.AH || {};

  // ---------- Smooth scroll for in-page anchors (explicit, consistent easing) ----------
  function init() {
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    document
      .querySelectorAll('a[href^="#"]:not([href^="#/"])')
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (href.length < 2) return;
          let target;
          try {
            target = document.querySelector(href);
          } catch (err) {
            return;
          }
          if (!target) return;
          e.preventDefault();
          const headerOffset = 96;
          const targetY =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;
          if (prefersReducedMotion) {
            window.scrollTo({ top: targetY, behavior: "auto" });
            return;
          }
          const startY = window.pageYOffset;
          const distance = targetY - startY;
          const duration = 850;
          const start = performance.now();
          function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            window.scrollTo({
              top: startY + distance * easeInOutCubic(progress),
              behavior: "auto",
            });
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }
          requestAnimationFrame(step);
        });
      });
  }

  window.AH.smoothScroll = { init: init };
})();

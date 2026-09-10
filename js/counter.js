(function () {
  window.AH = window.AH || {};

  function init() {
    const toPersianDigits = window.AH.utils.toPersianDigits;

    // ---------- Auto count-up for real stat numbers without data-count (e.g. About page) ----------
    const persianToEnglishDigit = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };
    document
      .querySelectorAll(".stat-num:not([data-count]):not([data-static])")
      .forEach((el) => {
        const normalized = String(el.textContent).replace(
          /[۰-۹]/g,
          (d) => persianToEnglishDigit[d],
        );
        const match = normalized.match(/\d+/);
        if (match) {
          el.setAttribute("data-count", match[0]);
          el.textContent = toPersianDigits(0);
        }
      });

    // ---------- Count-up stats ----------
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const counters = document.querySelectorAll("[data-count]");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-count"), 10);
            if (prefersReducedMotion) {
              el.textContent = toPersianDigits(target);
              counterObserver.unobserve(el);
              return;
            }
            let current = 0;
            const duration = 1100;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              current = Math.floor(progress * target);
              el.textContent = toPersianDigits(current);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                el.textContent = toPersianDigits(target);
              }
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  window.AH.counter = { init: init };
})();

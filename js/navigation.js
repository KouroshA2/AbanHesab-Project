(function () {
  window.AH = window.AH || {};

  // ---------- Mobile menu ----------
  function initMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu) return;
    const openBtn = document.getElementById("mobile-open-btn");
    const closeBtn = document.getElementById("mobile-close-btn");

    function openMenu() {
      mobileMenu.classList.add("open");
      mobileMenu.removeAttribute("inert");
      if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu(options) {
      const returnFocus = options && options.returnFocus;
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("inert", "");
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", "false");
        if (returnFocus) openBtn.focus();
      }
    }

    if (openBtn) openBtn.addEventListener("click", openMenu);
    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        closeMenu({ returnFocus: true })
      );
    mobileMenu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => closeMenu()));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        closeMenu({ returnFocus: true });
      }
    });
  }

  // ---------- Router (foundation for future pages) ----------
  const routeContent = {
    about: {
      eyebrow: "درباره ما",
      title: "درباره ما",
      text: "صفحه کامل «درباره ما» در مرحله بعدی توسعه وب‌سایت آماده خواهد شد.",
    },
    services: {
      eyebrow: "خدمات",
      title: "خدمات",
      text: "صفحه کامل «خدمات» در مرحله بعدی توسعه وب‌سایت آماده خواهد شد.",
    },
    industries: {
      eyebrow: "صنایع",
      title: "صنایع",
      text: "صفحه کامل «صنایع» در مرحله بعدی توسعه وب‌سایت آماده خواهد شد.",
    },
    experience: {
      eyebrow: "تجربه ما",
      title: "تجربه ما",
      text: "صفحه کامل «تجربه ما» در مرحله بعدی توسعه وب‌سایت آماده خواهد شد.",
    },
    contact: {
      eyebrow: "تماس با ما",
      title: "تماس با ما",
      text: "اطلاعات تماس در حال به‌روزرسانی است و پس از تأیید نهایی در این صفحه نمایش داده خواهد شد.",
    },
  };

  function getRouteFromHash() {
    const h = window.location.hash.replace(/^#\/?/, "");
    return h || "";
  }

  function setActiveNav(route) {
    document.querySelectorAll(".nav-link, .nav-link-mobile").forEach((a) => {
      const isActive = a.getAttribute("data-route") === route;
      a.classList.toggle("active", isActive);
      if (isActive) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function initRouter() {
    const homePage = document.getElementById("home-page");
    const placeholderPage = document.getElementById("placeholder-page");
    const phEyebrow = document.getElementById("placeholder-eyebrow");
    const phTitle = document.getElementById("placeholder-title");
    const phText = document.getElementById("placeholder-text");

    function route() {
      if (!homePage || !placeholderPage) return;
      const r = getRouteFromHash();
      if (r === "") {
        homePage.hidden = false;
        placeholderPage.hidden = true;
      } else if (routeContent[r]) {
        homePage.hidden = true;
        placeholderPage.hidden = false;
        phEyebrow.textContent = routeContent[r].eyebrow;
        phTitle.textContent = routeContent[r].title;
        phText.textContent = routeContent[r].text;
      } else {
        homePage.hidden = false;
        placeholderPage.hidden = true;
      }
      setActiveNav(r);
      window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", route);
    route();
  }

  window.AH.navigation = { init: initMobileMenu, initRouter: initRouter };
})();

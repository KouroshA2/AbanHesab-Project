(function () {
  "use strict";

  var STORAGE_KEY = "ah-theme";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle-btn");
  var iconEl = toggleBtn ? toggleBtn.querySelector(".theme-toggle-icon") : null;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable — ignore */
    }
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    if (isDark) {
      root.setAttribute("data-theme", "dark");
      if (iconEl) iconEl.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      if (iconEl) iconEl.textContent = "🌙";
    }
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  applyTheme(getStoredTheme() === "dark" ? "dark" : "light");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      storeTheme(nextTheme);
    });
  }
})();

(function () {
  window.AH = window.AH || {};

  // ---------- Team page (Stage 34): JSON-driven Leadership Team ----------
  function init() {
    const root = document.getElementById("team-page");
    if (!root) return;

    const jsonPath = root.getAttribute("data-team-json");
    const assetPrefix = root.getAttribute("data-asset-prefix") || "";
    const lang =
      document.documentElement.getAttribute("lang") === "en" ? "en" : "fa";

    if (!jsonPath) return;

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) throw new Error("team.json request failed");
        return res.json();
      })
      .then((data) => {
        const team = Array.isArray(data.team) ? data.team : [];
        renderGroup(team, "partners", lang, assetPrefix);
        renderGroup(team, "managers", lang, assetPrefix);
        // Cards were injected after the initial scroll-reveal pass in
        // main.js already ran, so re-run it to wire up .reveal/.member-card
        // animations for the newly created nodes (safe/idempotent).
        if (window.AH.scrollReveal) window.AH.scrollReveal.init();
      })
      .catch(() => {
        // No fake/placeholder data on failure — groups simply stay hidden.
      });
  }

  function renderGroup(team, slug, lang, assetPrefix) {
    const members = team.filter((m) => m && m.slug === slug);
    const section = document.getElementById("team-section-" + slug);
    const grid = document.getElementById("team-grid-" + slug);
    if (!section || !grid) return;

    if (members.length === 0) {
      // No group heading or placeholder card when there is no real data.
      section.hidden = true;
      return;
    }

    members.forEach((member) => {
      const name = member.name ? member.name[lang] : "";
      const role = member.role ? member.role[lang] : "";
      if (!name) return; // never render an incomplete/fake card

      const card = document.createElement("div");
      card.className = "member-card";

      if (member.image) {
        const avatar = document.createElement("div");
        avatar.className = "member-avatar has-photo";
        const img = document.createElement("img");
        img.src = assetPrefix + member.image;
        img.alt = name;
        img.loading = "lazy";
        avatar.appendChild(img);
        card.appendChild(avatar);
      } else {
        const avatar = document.createElement("div");
        avatar.className = "member-avatar";
        avatar.textContent = name.charAt(0);
        card.appendChild(avatar);
      }

      const h4 = document.createElement("h4");
      h4.textContent = name;
      card.appendChild(h4);

      if (role) {
        const span = document.createElement("span");
        span.textContent = role;
        card.appendChild(span);
      }

      grid.appendChild(card);
    });

    section.hidden = false;
  }

  window.AH.team = { init: init };

  // Script tag is placed at the end of body (same pattern as the rest of
  // the site's scripts), so the DOM is already parsed — run immediately.
  init();
})();

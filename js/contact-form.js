(function () {
  window.AH = window.AH || {};

  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  var STRINGS = {
    fa: {
      sending: "در حال ارسال...",
      success: "پیام شما با موفقیت ارسال شد.",
      error: "ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
    },
    en: {
      sending: "Sending...",
      success: "Your message has been sent successfully.",
      error: "Something went wrong while sending your message. Please try again.",
    },
  };

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var statusEl = document.getElementById("contact-form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    var lang =
      document.documentElement.getAttribute("lang") === "en" ? "en" : "fa";
    var t = STRINGS[lang];
    var originalButtonText = submitBtn.textContent;

    function setStatus(message) {
      if (statusEl) statusEl.textContent = message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = t.sending;
      setStatus(t.sending);

      var formData = new FormData(form);

      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data && data.success) {
            setStatus(t.success);
            form.reset();
          } else {
            setStatus((data && data.message) || t.error);
          }
        })
        .catch(function () {
          setStatus(t.error);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalButtonText;
        });
    });
  }

  window.AH.contactForm = { init: init };

  // Script tag is placed at the end of body (same pattern as the rest of
  // the site's scripts), so the DOM is already parsed — run immediately.
  init();
})();

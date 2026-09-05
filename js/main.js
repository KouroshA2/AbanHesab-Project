(function () {
  const AH = window.AH || {};

  // ---------- Initialisation: run modules in the same order the
  // previous single-file script executed them, so behavior/timing is unchanged ----------
  if (AH.header) AH.header.init(); // header scroll compact/blur
  if (AH.navigation) AH.navigation.init(); // mobile menu bindings
  if (AH.smoothScroll) AH.smoothScroll.init(); // in-page anchor smooth scroll
  if (AH.animations) AH.animations.init(); // other interactions (industries tiles)
  if (AH.counter) AH.counter.init(); // count-up stats
  if (AH.scrollReveal) AH.scrollReveal.init(); // scroll reveal (needs industries tiles already in DOM)
  if (AH.navigation && AH.navigation.initRouter) AH.navigation.initRouter(); // router (last: resets scroll)
})();

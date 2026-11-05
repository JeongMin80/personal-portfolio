(function () {
  "use strict";

  const root = document.documentElement;
  const blocks = Array.from(document.querySelectorAll(
    "#single .title, #single .featured-image, #single .page-content > *, #single .sticky-sidebar"
  ));
  if (!blocks.length || !("IntersectionObserver" in window)) {
    root.classList.remove("detail-reveal-ready");
    return;
  }

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer;
  let pendingFrame;

  function initialize() {
    if (observer) observer.disconnect();
    window.cancelAnimationFrame(pendingFrame);
    blocks.forEach(function (block) {
      block.classList.remove("detail-visible");
    });

    if (motionPreference.matches) {
      root.classList.remove("detail-reveal-ready");
      return;
    }
    root.classList.add("detail-reveal-ready");

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("detail-visible", entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });

    // Paint the hidden state once before observing blocks already on screen.
    pendingFrame = window.requestAnimationFrame(function () {
      pendingFrame = window.requestAnimationFrame(function () {
        blocks.forEach(function (block) {
          observer.observe(block);
        });
      });
    });
  }

  initialize();
  motionPreference.addEventListener("change", initialize);
  window.addEventListener("pageshow", function (event) {
    const navigation = window.performance.getEntriesByType("navigation")[0];
    if (event.persisted || (navigation && navigation.type === "back_forward")) {
      initialize();
    }
  });
})();

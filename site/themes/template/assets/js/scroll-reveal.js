(function () {
  "use strict";

  const containers = Array.from(
    document.querySelectorAll("#content > section > .container")
  );
  if (!containers.length || !("IntersectionObserver" in window)) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer;
  let pendingFrame;

  function initialize() {
    if (observer) observer.disconnect();
    window.cancelAnimationFrame(pendingFrame);

    containers.forEach(function (container) {
      container.classList.remove("scroll-reveal", "is-visible");
    });
    if (motionPreference.matches) return;

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Keep observing after entry: leaving the viewport resets the effect
          // for the next visit, whether the user scrolls up or down.
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    containers.forEach(function (container) {
      container.classList.add("scroll-reveal");
    });
    pendingFrame = window.requestAnimationFrame(function () {
      containers.forEach(function (container) {
        observer.observe(container);
      });
    });
  }

  initialize();
  motionPreference.addEventListener("change", initialize);
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) initialize();
  });
})();

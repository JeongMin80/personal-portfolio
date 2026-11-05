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

    // A late script must not hide content that the browser has already shown.
    // The Hero's CSS handles its initial entrance from the very first paint.
    const initiallyVisible = containers.map(function (container) {
      const rect = container.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    containers.forEach(function (container, index) {
      container.classList.add("scroll-reveal");
      container.classList.toggle("is-visible", initiallyVisible[index]);
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

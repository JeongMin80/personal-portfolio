(function () {
  "use strict";

  const containers = Array.from(
    document.querySelectorAll("#content > section > .container")
  ).filter(function (container) {
    return container.id !== "about-heading";
  });
  const aboutParts = Array.from(
    document.querySelectorAll("#about-heading > h3, #about-heading > .about-body")
  );
  if ((!containers.length && !aboutParts.length) || !("IntersectionObserver" in window)) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer;
  let pendingFrame;

  function initialize() {
    if (observer) observer.disconnect();
    window.cancelAnimationFrame(pendingFrame);

    containers.forEach(function (container) {
      container.classList.remove("scroll-reveal", "is-visible");
    });
    aboutParts.forEach(function (part) {
      part.classList.remove("about-visible");
    });
    if (motionPreference.matches) {
      document.documentElement.classList.remove("about-reveal-ready");
      return;
    }
    if (aboutParts.length) document.documentElement.classList.add("about-reveal-ready");

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Keep observing after entry: leaving the viewport resets the effect
          // for the next visit, whether the user scrolls up or down.
          entry.target.classList.toggle(
            aboutParts.includes(entry.target) ? "about-visible" : "is-visible",
            entry.isIntersecting
          );
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
      aboutParts.forEach(function (part) {
        observer.observe(part);
      });
    });
  }

  initialize();
  motionPreference.addEventListener("change", initialize);
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) initialize();
  });
})();

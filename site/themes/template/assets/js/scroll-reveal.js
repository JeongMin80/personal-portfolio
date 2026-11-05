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
  const navigation = window.performance.getEntriesByType("navigation")[0];
  const isHistoryNavigation = navigation && navigation.type === "back_forward";
  let observer;
  let pendingFrame;

  function initialize(restored) {
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

    if (restored) {
      aboutParts.forEach(function (part) {
        const rect = part.getBoundingClientRect();
        part.classList.toggle("about-visible", rect.bottom > 0 && rect.top < window.innerHeight);
      });
    }

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

  if (!isHistoryNavigation) initialize(false);
  motionPreference.addEventListener("change", function () {
    initialize(true);
  });
  window.addEventListener("pageshow", function (event) {
    // BFCache preserves the current page and its reveal state. Rebuilding that
    // state here would briefly hide the section at the restored scroll position.
    if (!event.persisted && isHistoryNavigation) {
      window.requestAnimationFrame(function () {
        initialize(true);
      });
    }
  });
})();

(function () {
  "use strict";

  const bar = document.getElementById("home-scroll-progress-bar");
  if (!bar) return;

  let pendingFrame = null;

  function update() {
    pendingFrame = null;
    const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollRange = pageHeight - window.innerHeight;
    const progress = scrollRange > 0
      ? Math.min(100, Math.max(0, (window.scrollY / scrollRange) * 100))
      : 0;

    bar.style.width = progress + "%";
    bar.setAttribute("aria-valuenow", String(Math.round(progress)));
  }

  function scheduleUpdate() {
    if (pendingFrame === null) {
      pendingFrame = window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  window.addEventListener("pageshow", scheduleUpdate);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    observer.observe(document.documentElement);
  }

  update();
})();

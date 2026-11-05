(function () {
  "use strict";

  const settings = document.currentScript.dataset;
  const homeURL = new URL(settings.homeUrl, window.location.href);
  const isHome = settings.isHome === "true";
  const navigation = window.performance.getEntriesByType("navigation")[0];
  const isReload = navigation && navigation.type === "reload";

  function goToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  if (isReload) {
    // Reload every page at its own top, keeping its language, path, and query.
    // Remove only the fragment so it cannot jump back to a section or heading.
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search
    );
    goToTop();
    window.addEventListener("pageshow", function () {
      goToTop();
      window.requestAnimationFrame(function () {
        goToTop();
        window.history.scrollRestoration = previousRestoration;
      });
    }, { once: true });
  }

  document.addEventListener("click", function (event) {
    if (
      !isHome || event.defaultPrevented || event.button !== 0 ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
    ) return;

    const link = event.target.closest("a.portfolio-home-link");
    if (!link) return;

    // Also handle Home when its URL already matches the current page.
    event.preventDefault();
    window.history.replaceState(window.history.state, "", homeURL.pathname);
    goToTop();

    const menu = document.getElementById("navbarContent");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    }
  });
})();

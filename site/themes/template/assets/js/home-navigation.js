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

  function closeMobileMenu() {
    const menu = document.getElementById("navbarContent");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    }
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
      event.defaultPrevented || event.button !== 0 ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
    ) return;

    const link = event.target.closest("a.portfolio-home-link");
    if (!link && isHome) {
      const sectionLink = event.target.closest("#profileHeader .navbar-nav a.nav-link[href]");
      if (!sectionLink) return;

      const sectionURL = new URL(sectionLink.href, window.location.href);
      if (
        sectionURL.origin !== window.location.origin ||
        sectionURL.pathname !== homeURL.pathname ||
        !sectionURL.hash
      ) return;

      const target = document.getElementById(decodeURIComponent(sectionURL.hash.slice(1)));
      if (!target) return;

      // Moving within the homepage must not create a browser-history entry.
      event.preventDefault();
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search + sectionURL.hash
      );
      target.scrollIntoView({ block: "start" });
      closeMobileMenu();
      return;
    }
    if (!link) return;

    if (!isHome) {
      try {
        window.sessionStorage.setItem("portfolio-return-home", "1");
      } catch {
        // Navigation still works when storage is unavailable.
      }
      return;
    }

    // Also handle Home when its URL already matches the current page.
    event.preventDefault();
    window.history.replaceState(window.history.state, "", homeURL.pathname);
    goToTop();

    closeMobileMenu();
  });
})();

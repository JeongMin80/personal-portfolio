(function () {
  "use strict";

  const settings = document.currentScript.dataset;
  const homeURL = new URL(settings.homeUrl, window.location.href);
  const isHome = settings.isHome === "true";

  // Reloading keeps the browser's default behavior: the URL (including any
  // #section fragment) stays as it is and the browser restores the position,
  // so a refreshed internal URL shows the same content.

  function goToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  // Close the collapsed (mobile) menu first and run the callback only after
  // it has finished closing. Scrolling while the open menu still takes up
  // space would land past the target once the menu height disappears.
  function afterMobileMenuClosed(callback) {
    const menu = document.getElementById("navbarContent");
    const isOpen = menu && (menu.classList.contains("show") || menu.classList.contains("collapsing"));
    if (!isOpen || !window.bootstrap) {
      callback();
      return;
    }

    let done = false;
    const finish = function () {
      if (done) return;
      done = true;
      callback();
    };
    menu.addEventListener("hidden.bs.collapse", finish, { once: true });
    // Fallback in case the transition event never fires.
    window.setTimeout(finish, 700);
    window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
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

      // Each section move gets its own history entry, so the browser Back
      // button returns to the previous position on the homepage.
      event.preventDefault();
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search + sectionURL.hash
      );
      afterMobileMenuClosed(function () {
        target.scrollIntoView({ block: "start" });
      });
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

    // Home on the homepage: go to the top and record it in history,
    // so Back returns to the section the visitor was reading.
    event.preventDefault();
    window.history.pushState(null, "", homeURL.pathname + window.location.search);
    afterMobileMenuClosed(goToTop);
  });
})();

(function () {
  "use strict";

  let hideToastTimer;

  const copyMessages = document.documentElement.lang.startsWith("ko")
    ? {
        unavailable: "이메일 주소가 아직 등록되지 않았습니다.",
        success: "이메일 주소를 복사했습니다.",
        failure: "이메일 주소를 복사하지 못했습니다.",
      }
    : {
        unavailable: "Email address is not available yet.",
        success: "Email copied to clipboard.",
        failure: "Unable to copy email address.",
      };

  function showToast(message) {
    let toast = document.getElementById("hero-copy-toast");
    if (!toast) {
      const status = document.createElement("div");
      status.id = "hero-copy-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.setAttribute("aria-atomic", "true");
      toast = document.createElement("div");
      toast.id = "hero-copy-toast";
      toast.className = "hero-copy-toast";
      status.appendChild(toast);
      document.body.appendChild(status);
    }

    window.clearTimeout(hideToastTimer);
    toast.textContent = message;
    toast.hidden = false;
    hideToastTimer = window.setTimeout(function () {
      toast.hidden = true;
      toast.textContent = "";
    }, 2000);
  }

  async function copyEmail(button) {
    if (button.disabled || button.dataset.copying === "true") return;

    let email;
    try {
      email = decodeURIComponent(
        button.dataset.copyEmail.replace(/^mailto:/i, "").split("?")[0]
      ).trim();
    } catch {
      email = "";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast(copyMessages.unavailable);
      return;
    }

    button.dataset.copying = "true";
    button.setAttribute("aria-busy", "true");
    try {
      await navigator.clipboard.writeText(email);
      showToast(copyMessages.success);
    } catch {
      showToast(copyMessages.failure);
    } finally {
      delete button.dataset.copying;
      button.removeAttribute("aria-busy");
    }
  }

  function initialize() {
    document.querySelectorAll("[data-copy-email]").forEach(function (button) {
      if (button.dataset.copyEmailReady === "true") return;
      button.dataset.copyEmailReady = "true";
      button.addEventListener("click", function () {
        return copyEmail(button);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();

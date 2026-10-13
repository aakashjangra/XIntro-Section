document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const openMenuButton = document.querySelector(".open-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const nav = document.querySelector(".nav");
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  function openMenu() {
    body.classList.add("menu-open");
    openMenuButton.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    body.classList.remove("menu-open");
    openMenuButton.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (body.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      const button = item.querySelector(".nav-link");
      const dropdown = item.querySelector(".dropdown-list");
      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("visible");
    });
  }

  openMenuButton.addEventListener("click", toggleMenu);
  closeMenuButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeAllDropdowns();
    }
  });

  dropdownItems.forEach((item) => {
    const button = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".dropdown-list");

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const wasOpen = button.classList.contains("link-open");
      closeAllDropdowns();
      if (!wasOpen) {
        button.classList.add("link-open");
        button.setAttribute("aria-expanded", "true");
        dropdown.classList.add("visible");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      closeAllDropdowns();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});
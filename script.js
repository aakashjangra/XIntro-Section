
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

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      const button = item.querySelector(".nav-link");
      const dropdown = item.querySelector(".dropdown-list");

      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("visible");
    });
  }

  openMenuButton.addEventListener("click", openMenu);

  closeMenuButton.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeAllDropdowns();
    }
  });

  // Dropdowns open and close on click, not on hover.
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

  // Clicking outside a dropdown closes it.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });

  // Selecting a navigation link closes the mobile menu.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      closeAllDropdowns();
    });
  });

  // Restore desktop navigation behavior after resizing.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});

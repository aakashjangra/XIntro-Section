
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const openMenuButton = document.querySelector(".open-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const nav = document.querySelector(".nav");

  const dropdownButtons = document.querySelectorAll(".nav-link");
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  // Open the mobile navigation menu.
  function openMenu() {
    body.classList.add("menu-open");
    openMenuButton.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
  }

  // Close the mobile navigation menu.
  function closeMenu() {
    body.classList.remove("menu-open");
    openMenuButton.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
  }

  openMenuButton.addEventListener("click", openMenu);
  closeMenuButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeAllDropdowns();
    }
  });

  // Find dropdown buttons and toggle their menus only on click.
  dropdownItems.forEach((item) => {
    const button = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".dropdown-list");

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const wasOpen = button.classList.contains("link-open");

      // Close all other dropdowns before toggling the selected one.
      closeAllDropdowns();

      if (!wasOpen) {
        button.classList.add("link-open");
        button.setAttribute("aria-expanded", "true");
        dropdown.classList.add("visible");
      }
    });
  });

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      const button = item.querySelector(".nav-link");
      const dropdown = item.querySelector(".dropdown-list");

      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("visible");
    });
  }

  // Close dropdowns when clicking elsewhere on the page.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });

  // Close mobile navigation when a regular navigation link is selected.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      closeAllDropdowns();
    });
  });

  // Reset mobile navigation when resizing to desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});

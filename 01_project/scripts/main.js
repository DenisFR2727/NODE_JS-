const backdrop = document.querySelector(".backdrop");
const mobileNav = document.querySelector(".mobile-nav");
const sideMenuToggle = document.getElementById("side-menu-toggle");

function closeMobileNav() {
  if (!mobileNav || !backdrop) return;
  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");
}

function backdropClickHandler() {
  closeMobileNav();
  backdrop.removeEventListener("click", backdropClickHandler);
}

if (sideMenuToggle && mobileNav && backdrop) {
  sideMenuToggle.addEventListener("click", () => {
    mobileNav.classList.add("open");
    backdrop.classList.add("open");
    backdrop.addEventListener("click", backdropClickHandler);
  });
}

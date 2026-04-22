const STORAGE_KEY = "shopHighlightAfterSubmit";

const shopMain = document.querySelector(".shop_bg");
if (shopMain) {
  if (localStorage.getItem(STORAGE_KEY) === "1") {
    shopMain.classList.add("toggle_bg");
    localStorage.removeItem(STORAGE_KEY);
  }
}

const productForm = document.querySelector(".product-form");
if (productForm) {
  productForm.addEventListener("submit", () => {
    localStorage.setItem(STORAGE_KEY, "1");
  });
}

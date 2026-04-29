const express = require("express");
// const path = require("path");

// const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shop", {
    products: adminData.products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;

//   console.log(adminData.products);
//   res.sendFile(path.join(rootDir, "views", "shop.html")); // Дозволяє приєднати тіло будь-якого типу.

const express = require("express");
const productsController = require("../controllers/products");
const router = express.Router();

router.get("/", productsController.getProducts);
module.exports = router;

//   console.log(adminData.products);
//   res.sendFile(path.join(rootDir, "views", "shop.html")); // Дозволяє приєднати тіло будь-якого типу.

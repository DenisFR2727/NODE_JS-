const express = require("express");
const productsController = require("../controllers/products");
const router = express.Router();

//  /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

//  /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;

// path.join(rootDir, "views", "add-product.html")
// render - це функція яка рендерить шаблон і повертає відповідь на запит.

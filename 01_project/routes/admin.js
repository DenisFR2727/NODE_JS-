const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

//  /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// Route to Admin Products
router.get("/products", adminController.getProducts);

//  /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;

// path.join(rootDir, "views", "add-product.html")
// render - це функція яка рендерить шаблон і повертає відповідь на запит.

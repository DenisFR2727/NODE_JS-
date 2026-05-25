const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();

// router.get("/", shopController.getProducts);

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/checkout", shopController.getCheckout);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteItem);

router.get("/orders", shopController.getOrders);

// router.get("/product-details/:productId", shopController.getProduct);

module.exports = router;

//   console.log(adminData.products);
//   res.sendFile(path.join(rootDir, "views", "shop.html")); // Дозволяє приєднати тіло будь-якого типу.

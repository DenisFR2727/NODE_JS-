const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "Shop",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    console.log(product);
    if (!product) {
      return res.redirect("/");
    }
    res.render("shop/product-details", {
      product: product,
      pageTitle: "Product Details",
      path: "/product-details",
      activeProductDetails: true,
      formsCSS: true,
      productCSS: true,
    });
  });
};

// Route to Checkout
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    activeCheckout: true,
    formsCSS: true,
    productCSS: true,
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      activeCheckout: true,
      formsCSS: true,
      productCSS: true,
    });
  });
};

// Route to Cart
exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    activeCart: true,
    formsCSS: true,
    productCSS: true,
  });
};

// Route to Orders
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
    activeOrders: true,
    formsCSS: true,
    productCSS: true,
  });
};

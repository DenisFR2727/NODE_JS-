const Cart = require("../models/cart");
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
      pageTitle: product.title,
      path: "/products",
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
  Cart.getCartProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find((p) => p.id === product.id);
        if (cartProductData) {
          cartProducts.push({
            id: product.id,
            productData: product,
            qty: cartProductData.qty,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        activeCart: true,
        formsCSS: true,
        productCSS: true,
        cartProducts: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
// Controller to delete item from cart
exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/cart");
    }
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
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

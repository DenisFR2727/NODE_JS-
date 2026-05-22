const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        products: rows,
        pageTitle: "Shop",
        path: "/products",
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([product]) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("shop/product-details", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
        activeProductDetails: true,
        formsCSS: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
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
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        //   products: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// Route to Cart
exports.getCart = (req, res, next) => {
  Cart.getCartProducts((cart) => {
    if (!cart) {
      return res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        activeCart: true,
        formsCSS: true,
        productCSS: true,
        cartProducts: [],
      });
    }
    Product.fetchAll()
      .then(([rows]) => {
        const cartProducts = [];
        for (let product of rows) {
          const cartProductData = cart.products.find(
            (p) => p.id == product.id, // == бо в JSON id може бути рядком
          );
          if (cartProductData) {
            cartProducts.push({
              id: product.id,
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
      })
      .catch((err) => console.log(err));
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  //   console.log(prodId);

  Product.findById(prodId)
    .then(([rows]) => {
      if (!rows || rows.length === 0) {
        return res.redirect("/");
      }
      return Cart.addProduct(prodId, rows[0].price).then(() =>
        res.redirect("/cart"),
      );
    })
    .catch((err) => console.log(err));
};
// Controller to delete item from cart
exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([rows]) => {
      if (!rows || rows.length === 0) {
        return res.redirect("/cart");
      }
      return Cart.deleteProduct(prodId, rows[0].price);
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
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

// for (let product of products) {
//    const cartProductData = cart.products.find((p) => p.id === product.id);
//    if (cartProductData) {
//      cartProducts.push({
//        id: product.id,
//        productData: product,
//        qty: cartProductData.qty,
//        title: product.title,
//        price: product.price,
//        imageUrl: product.imageUrl,
//      });
//    }
//  }

const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

//  Запит до бази даних для отримання продукту за id
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((products) => {
      if (products === null) {
        return res.redirect("/");
      }
      res.render("shop/product-details", {
        product: products,
        pageTitle: products.title,
        path: "/products",
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
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// Route to Cart
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            products: products,
            pageTitle: "Your Cart",
            path: "/cart",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = +req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
// Controller to delete item from cart
exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
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

//   console.log(req.user.cart);
//   Cart.getCartProducts((cart) => {
//     if (!cart) {
//       return res.render("shop/cart", {
//         pageTitle: "Your Cart",
//         path: "/cart",
//         activeCart: true,
//         formsCSS: true,
//         productCSS: true,
//         cartProducts: [],
//       });
//     }
//     Product.findAll()
//       .then((products) => {
//         const cartProducts = [];
//         for (let product of products) {
//           const cartProductData = cart.products.find(
//             (p) => p.id == product.id, // == бо в JSON id може бути рядком
//           );
//           if (cartProductData) {
//             cartProducts.push({
//               id: product.id,
//               qty: cartProductData.qty,
//               title: product.title,
//               price: product.price,
//               imageUrl: product.imageUrl,
//             });
//           }
//         }
//         res.render("shop/cart", {
//           products: products,
//           pageTitle: "Your Cart",
//           path: "/cart",
//           activeCart: true,
//           formsCSS: true,
//           productCSS: true,
//           cartProducts: cartProducts,
//         });
//       })
//       .catch((err) => console.log(err));
//   });

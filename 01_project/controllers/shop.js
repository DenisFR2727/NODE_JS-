const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
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

  //   if (!mongoose.Types.ObjectId.isValid(prodId)) {
  //     return res.redirect("/");
  //   }
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
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
  Product.find()
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
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        products: products,
        pageTitle: "Your Cart",
        path: "/cart",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  if (!req.user) {
    return res.redirect("/");
  }

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

// Controller to delete item from cart
exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  if (!req.user) {
    return res.redirect("/");
  }
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => ({
        productData: { ...item.productId._doc },
        quantity: item.quantity,
      }));
      const order = new Order({
        user: {
          name: user.username,
          userId: user._id,
        },
        products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// Route to Orders
exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Your Orders",
        path: "/orders",
      });
    })
    .catch((err) => console.log(err));
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

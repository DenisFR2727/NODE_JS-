const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("shop/product-details", {
        product: product,
        pageTitle: product._id,
        path: "/products/" + product._id,
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
  const cartItems =
    req.user.cart && req.user.cart.items ? req.user.cart.items : [];

  const products = cartItems.map((item) => ({
    _id: item._id,
    title: item.title,
    price: item.price,
    imageUrl: item.imageUrl,
    cartItem: { quantity: item.quantity },
  }));

  res.render("shop/cart", {
    products: products,
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

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

exports.postOrder = (req, res, next) => {
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        return order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          }),
        );
      });
    })
    .then(() => fetchedCart.setProducts([]))
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// Route to Orders
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: [Product] })
    .then((orders) => {
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Your Orders",
        path: "/orders",
        activeOrders: true,
        formsCSS: true,
        productCSS: true,
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

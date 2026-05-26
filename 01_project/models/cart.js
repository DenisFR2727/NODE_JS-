const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CART_ID = 1;

const CartModel = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  products: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [],
  },
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = class Cart {
  static addProduct(id, productPrice) {
    return CartModel.findByPk(CART_ID).then((cart) => {
      let products = [];
      let totalPrice = 0;

      if (cart) {
        products = cart.products;
        totalPrice = cart.totalPrice;
      }

      const existingProductIndex = products.findIndex(
        (product) => product.id == id,
      );
      const existingProduct = products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        products = [...products];
        products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        products = [...products, updatedProduct];
      }

      totalPrice = +totalPrice + +productPrice;

      if (cart) {
        cart.products = products;
        cart.totalPrice = totalPrice;
        return cart.save();
      }

      return CartModel.create({
        id: CART_ID,
        products,
        totalPrice,
      });
    });
  }

  static getCartProducts(cb) {
    return CartModel.findByPk(CART_ID)
      .then((cart) => {
        if (!cart) {
          cb(null);
        } else {
          cb({
            products: cart.products,
            totalPrice: cart.totalPrice,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        cb(null);
      });
  }
};

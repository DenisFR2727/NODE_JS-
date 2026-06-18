const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class Cart {
  constructor(id, products, totalPrice) {
    this.id = id;
    this.products = products;
    this.totalPrice = totalPrice;
  }

  static getCart() {
    const cartId = this.id;
    const db = getDb();
    return db
      .collection("carts")
      .findOne({ _id: new mongodb.ObjectId(cartId) });
  }

  static addProduct(prodId, productPrice) {
    const db = getDb();
    return Cart.getCart().then((cart) => {
      let products = [];
      let totalPrice = 0;

      if (cart) {
        products = cart.products;
        totalPrice = cart.totalPrice;
      }

      const existingProductIndex = products.findIndex(
        (product) => product.id == prodId,
      );
      const existingProduct = products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        products = [...products];
        products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: prodId, qty: 1 };
        products = [...products, updatedProduct];
      }

      totalPrice = +totalPrice + +productPrice;

      return db
        .collection("carts")
        .updateOne(
          { _id: new mongodb.ObjectId(CART_ID) },
          { $set: { products, totalPrice } },
          { upsert: true },
        );
    });
  }
};

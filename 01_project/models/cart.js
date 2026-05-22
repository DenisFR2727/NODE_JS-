const db = require("../util/database");

const CART_ID = 1;

module.exports = class Cart {
  static addProduct(id, productPrice) {
    return db
      .execute("SELECT * FROM carts WHERE id = ?", [CART_ID])
      .then(([rows]) => {
        let cart = { products: [], totalPrice: 0 };

        if (rows.length > 0) {
          cart = {
            products: JSON.parse(rows[0].products),
            totalPrice: rows[0].totalPrice,
          };
        }

        const existingProductIndex = cart.products.findIndex(
          (product) => product.id == id,
        );
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;

        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }

        cart.totalPrice = +cart.totalPrice + +productPrice;

        if (rows.length > 0) {
          return db.execute(
            "UPDATE carts SET products = ?, totalPrice = ? WHERE id = ?",
            [JSON.stringify(cart.products), cart.totalPrice, CART_ID],
          );
        }

        return db.execute(
          "INSERT INTO carts (id, products, totalPrice) VALUES (?, ?, ?)",
          [CART_ID, JSON.stringify(cart.products), cart.totalPrice],
        );
      });
  }

  static deleteProduct(id, productPrice) {
    return db
      .execute("SELECT * FROM carts WHERE id = ?", [CART_ID])
      .then(([rows]) => {
        if (rows.length === 0) {
          return;
        }

        const cart = {
          products: JSON.parse(rows[0].products),
          totalPrice: rows[0].totalPrice,
        };

        const productIndex = cart.products.findIndex((prod) => prod.id == id);
        if (productIndex === -1) {
          return;
        }

        const productQty = cart.products[productIndex].qty;

        cart.products = cart.products.filter((prod) => prod.id != id);
        cart.totalPrice = +cart.totalPrice - +productPrice * +productQty;

        return db.execute(
          "UPDATE carts SET products = ?, totalPrice = ? WHERE id = ?",
          [JSON.stringify(cart.products), cart.totalPrice, CART_ID],
        );
      });
  }

  static getCartProducts(cb) {
    return db
      .execute("SELECT * FROM carts WHERE id = ?", [CART_ID])
      .then(([rows]) => {
        if (rows.length === 0) {
          cb(null);
        } else {
          cb({
            products: JSON.parse(rows[0].products),
            totalPrice: rows[0].totalPrice,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        cb(null);
      });
  }
};

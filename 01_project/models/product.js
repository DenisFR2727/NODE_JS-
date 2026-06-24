// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(id, title, price, imageUrl, description, userId) {
//     this._id = id || null;
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       dbOp = db.collection("products").updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         {
//           $set: this,
//         },
//       );
//     } else {
//       dbOp = db.collection("products").insertOne({
//         title: this.title,
//         price: this.price,
//         imageUrl: this.imageUrl,
//         description: this.description,
//         userId: new mongodb.ObjectId(this.userId),
//       });
//     }

//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log("Product deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
// }

// module.exports = Product;

// // -------------Sequelize------------------------------------------------------

// // const Sequelize = require("sequelize");

// // const sequelize = require("../util/database");

// // // define() - метод для визначення моделі в Sequelize.
// // const Product = sequelize.define("product", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false,
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: Sequelize.TEXT,
// //     allowNull: false,
// //   },
// // });

// // module.exports = Product;

// // ---------SQL------------------------------------------------------

// // const Cart = require("./cart");
// // const db = require("../util/database");

// // // Експорт класу Product, який описує модель товару.
// // module.exports = class Product {
// //   constructor(id, title, imageUrl, description, price) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageUrl = imageUrl;
// //     this.description = description;
// //     this.price = price;
// //   }
// //   save() {
// //     if (this.id) {
// //       return db.execute(
// //         "UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ?",
// //         [this.title, this.price, this.imageUrl, this.description, this.id],
// //       );
// //     }
// //     return db.execute(
// //       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
// //       [this.title, this.price, this.imageUrl, this.description],
// //     );
// //   }
// //   static deleteById(id) {
// //     return db.execute("DELETE FROM products WHERE id = ?", [id]);
// //   }

// //   static async fetchAll() {
// //     return db.execute("SELECT * FROM products");
// //   }
// //   static findById(id) {
// //     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
// //   }
// // };

// // Модуль Node.js для читання/запису файлів.
// // const fs = require("fs");
// // Модуль для коректної побудови шляхів у різних ОС.
// // const path = require("path");

// // Абсолютний шлях до файлу, де зберігаються товари.
// // const p = path.join(
// //   // Шлях до кореневої папки проєкту (де запускається головний файл).
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json",
// // );

// // Допоміжна функція: читає товари з файлу і повертає їх через callback.
// // const getProductsFromFile = (cb) => {
// //    // Асинхронно читаємо файл з товарами.
// //    fs.readFile(p, (err, fileContent) => {
// //      // Якщо файл не прочитався (наприклад, ще не створений) — повертаємо порожній масив.
// //      if (err) {
// //        cb([]);
// //      } else {
// //        // Якщо читання успішне — парсимо JSON і повертаємо масив товарів.
// //        cb(JSON.parse(fileContent));
// //      }
// //    });
// //  };

// // save() {
// //    getProductsFromFile((products) => {
// //      if (this.id) {
// //        const existingProductIndex = products.findIndex(
// //          (p) => p.id === this.id,
// //        );
// //        const updatedProducts = [...products];
// //        updatedProducts[existingProductIndex] = this;
// //        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// //          console.log(err);
// //        });
// //      } else {
// //        this.id = Math.random().toString(); // Генеруємо випадковий ID для товару.
// //        products.push(this);
// //        // Перезаписуємо файл оновленим масивом.
// //        fs.writeFile(p, JSON.stringify(products), (err) => {
// //          // Логуємо помилку запису (або null, якщо все добре).
// //          console.log(err);
// //        });
// //      }
// //    });
// //    // Зайвий виклик: читає файл, але результат ніде не використовується.
// //    fs.readFile(p, (err, fileContent) => {});
// //  }

// // static deleteById(id, cb) {
// //    if (!id) {
// //      return cb(null);
// //    }
// //    getProductsFromFile((products) => {
// //      const product = products.find((p) => p.id === id);
// //      const updatedProducts = products.filter((p) => p.id !== id);
// //      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// //        if (err) {
// //          return cb(err);
// //        }
// //        Cart.deleteProduct(id, product.price);

// //        cb();
// //      });
// //    });
// //  }

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

// метод для додавання продукту до корзини
userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((p) => {
    return p.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};
module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class User {
//   constructor(id, username, email, cart) {
//     this._id = id || null;
//     this.username = username;
//     this.email = email;
//     this.cart = cart || { items: [] };
//     if (!this.cart.items) {
//       this.cart.items = [];
//     }
//   }
//   save() {
//     const db = getDb();
//     const dbOp = db
//       .collection("users")
//       .insertOne({ username: this.username, email: this.email });

//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((p) => {
//       return p._id.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         _id: new mongodb.ObjectId(product._id),
//         title: product.title,
//         description: product.description,
//         price: product.price,
//         imageUrl: product.imageUrl,
//         userId: new mongodb.ObjectId(this._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = getDb();

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } },
//       )
//       .then((result) => {
//         this.cart = updatedCart;
//         return result;
//       });
//   }
//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item._id);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               (item) => item._id.toString() === p._id.toString(),
//             ).quantity,
//           };
//         });
//       });
//   }
//   deleteProductFromCart(prodId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item._id.toString() !== prodId.toString();
//     });

//     const updatedCart = { items: updatedCartItems };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } },
//       )
//       .then((result) => {
//         this.cart = updatedCart;
//         return result;
//       });
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.username,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: this.cart } },
//           );
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray()
//       .then((orders) => {
//         return orders;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find()
//       .toArray()
//       .then((users) => {
//         console.log("Users fetched all");
//         return users;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
//   static deleteById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .deleteOne({ _id: new mongodb.ObjectId(userId) })
//       .then((result) => {
//         console.log("User deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
// }
// module.exports = User;

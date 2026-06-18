const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(id, username, email, cart) {
    this._id = id || null;
    this.username = username;
    this.email = email;
    this.cart = cart;
  }
  save() {
    const db = getDb();
    const dbOp = db
      .collection("users")
      .insertOne({ username: this.username, email: this.email });

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  addToCart(product) {
    const cartItems = this.cart && this.cart.items ? [...this.cart.items] : [];
    const prodId = product._id.toString();
    let newQuantity = 1;

    const index = cartItems.findIndex(
      (item) => item._id.toString() === prodId,
    );

    if (index >= 0) {
      newQuantity = cartItems[index].quantity + 1;
      cartItems[index].quantity = newQuantity;
    } else {
      cartItems.push({
        _id: new mongodb.ObjectId(product._id),
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        userId: new mongodb.ObjectId(this._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: cartItems };
    const db = getDb();

    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      )
      .then((result) => {
        this.cart = updatedCart;
        return result;
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        console.log("Users fetched all");
        return users;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  static deleteById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        console.log("User deleted");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
module.exports = User;

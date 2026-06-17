const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(id, username, email) {
    this._id = id || null;
    this.username = username;
    this.email = email;
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

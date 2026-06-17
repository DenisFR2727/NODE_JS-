const db = require("../util/database");

module.exports = class Order {
  constructor(id, products, totalPrice) {
    this.id = id;
    this.products = products;
    this.totalPrice = totalPrice;
  }
};

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

// module.exports = Order;

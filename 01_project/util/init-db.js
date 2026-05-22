const db = require("./database");

module.exports = function initDatabase() {
  return db
    .execute(
      `CREATE TABLE IF NOT EXISTS carts (
        id INT NOT NULL PRIMARY KEY,
        products TEXT NOT NULL,
        totalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0
      )`,
    )
    .then(() =>
      db.execute(
        "INSERT IGNORE INTO carts (id, products, totalPrice) VALUES (1, '[]', 0)",
      ),
    );
};

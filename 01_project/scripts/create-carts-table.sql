-- Таблиця carts (якщо створюєте вручну в MySQL, без Sequelize sync)
USE test_sql;

CREATE TABLE IF NOT EXISTS carts (
  id INT NOT NULL PRIMARY KEY,
  products JSON NOT NULL DEFAULT (JSON_ARRAY()),
  totalPrice DOUBLE NOT NULL DEFAULT 0
);

-- Початковий порожній кошик (опційно)
INSERT INTO carts (id, products, totalPrice)
VALUES (1, JSON_ARRAY(), 0)
ON DUPLICATE KEY UPDATE id = id;

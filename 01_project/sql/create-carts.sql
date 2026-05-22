USE test_sql;

CREATE TABLE IF NOT EXISTS carts (
  id INT NOT NULL PRIMARY KEY,
  products TEXT NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0
);

INSERT IGNORE INTO carts (id, products, totalPrice) VALUES (1, '[]', 0);

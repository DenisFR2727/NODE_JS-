-- Створення таблиці users вручну (якщо потрібно без Sequelize sync)
USE test_sql;

-- Якщо таблиця вже є без name — видаліть або додайте колонку:
-- ALTER TABLE users ADD COLUMN name VARCHAR(255) NOT NULL AFTER id;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

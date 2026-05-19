// Модуль Node.js для читання/запису файлів.
const fs = require("fs");
// Модуль для коректної побудови шляхів у різних ОС.
const path = require("path");

// Абсолютний шлях до файлу, де зберігаються товари.
const p = path.join(
  // Шлях до кореневої папки проєкту (де запускається головний файл).
  path.dirname(require.main.filename),
  "data",
  "products.json",
);

// Допоміжна функція: читає товари з файлу і повертає їх через callback.
const getProductsFromFile = (cb) => {
  // Асинхронно читаємо файл з товарами.
  fs.readFile(p, (err, fileContent) => {
    // Якщо файл не прочитався (наприклад, ще не створений) — повертаємо порожній масив.
    if (err) {
      cb([]);
    } else {
      // Якщо читання успішне — парсимо JSON і повертаємо масив товарів.
      cb(JSON.parse(fileContent));
    }
  });
};

// Експорт класу Product, який описує модель товару.
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = Math.random().toString(); // Генеруємо випадковий ID для товару.
    getProductsFromFile((products) => {
      products.push(this);
      // Перезаписуємо файл оновленим масивом.
      fs.writeFile(p, JSON.stringify(products), (err) => {
        // Логуємо помилку запису (або null, якщо все добре).
        console.log(err);
      });
    });
    // Зайвий виклик: читає файл, але результат ніде не використовується.
    fs.readFile(p, (err, fileContent) => {});
  }
  // Статичний метод: повертає всі товари через callback.
  static async fetchAll(cb) {
    // Повторно використовуємо helper-функцію читання.
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};

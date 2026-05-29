// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const usersRoutes = require("./routes/users");
const cartRoutes = require("./routes/shop");
const adminProductsRoutes = require("./routes/admin");
const checkoutRoutes = require("./routes/shop");
const productDetailsRoutes = require("./routes/shop");

const error404Controller = require("./controllers/404");

const sequelize = require("./util/database");

const Product = require("./models/product");
const Cart = require("./models/cart");
const User = require("./models/users");
const CartItem = require("./models/cart-item");

const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express(); // створюємо екземпляр express

app.set("view engine", "ejs"); // вказуємо який шаблон використовувати
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // використовуємо bodyParser для розбору даних з форми

app.use(express.static(path.join(__dirname, "public"))); // використовуємо express.static для сервісу статичних файлів
app.use(express.static(path.join(__dirname, "scripts")));

// middleware для авторизації користувача
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRoutes);

app.use(usersRoutes);

// cartRoutes for cart
app.use("/cart", cartRoutes);
app.use(cartRoutes);

// adminProductsRoutes for admin/products
app.use("/admin/products", adminProductsRoutes);
app.use(adminProductsRoutes);

// checkoutRoutes for checkout
app.use("/checkout", checkoutRoutes);
app.use(checkoutRoutes);

app.use("/products/:productId", productDetailsRoutes);
app.use(productDetailsRoutes);

// підключили маршрут для обробки помилок
app.use(error404Controller.get404);

// Product model
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// Cart model
// Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart); // User має один Cart
Cart.hasMany(CartItem); // Cart має багато CartItem
Cart.belongsTo(User); // Cart належить до User
Cart.belongsToMany(Product, { through: CartItem }); // Cart має багато Product через CartItem
Product.belongsToMany(Cart, { through: CartItem }); // Product має багато Cart через CartItem

// Order model
Order.belongsTo(User); // Order належить до User
User.hasMany(Order); // User має багато Order
Order.belongsToMany(Product, { through: OrderItem }); // Order має багато Product через OrderItem
Product.belongsToMany(Order, { through: OrderItem }); // Product має багато Order через OrderItem

// .sync({ force: true }) => видаляє всі дані з бази даних та створює нові таблиці
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then((cart) => {
    app.listen(3001);
  })
  .catch((err) => console.log(err));

// app.listen(3001);

// sendFile(path.join(__dirname, "views", "not-found.html"));
// { extended: false } - що б він міг розбирати функції які не використовуються за замовчуванням
// __dirname → абсолютний шлях до папки файлу

// use - Приймає масив обробників а також має інші випадки використання
// use - приймає функцію з трьома аргументами (req, res, next), next це ще одна функція яка повинна бути виконана .
// next - це функція яка переходить до наступної дії низче!

// const server = http.createServer(app);
// server.listen(3001);

// бібліотека Express.js використовується для створення веб-серверів та API. Вона сильно спрощує роботу з HTTP.
// use() — це метод для підключення middleware.

// Middleware — це функція, яка виконується між request і response.

// npm install --save body-parser

// res.send("<h1>The Add  Product Page</h1>"); // Дозволяє приєднати тіло будь-якого типу.

//  res.status() = код статусу який

// const expressHbs = require("express-handlebars");

// app.engine("hbs", expressHbs()); // вказуємо який шаблон використовувати
// app.engine(
//   "hbs",
//   expressHbs.engine({
//     extname: ".hbs",
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layouts",
//   }),
// );

// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
// const mongoConnect = require("./util/database").mongoConnect;

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const usersRoutes = require("./routes/users");
// const productDetailsRoutes = require("./routes/shop");

const error404Controller = require("./controllers/404");

// const User = require("./models/users");

const app = express(); // створюємо екземпляр express

app.set("view engine", "ejs"); // вказуємо який шаблон використовувати
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // використовуємо bodyParser для розбору даних з форми

app.use(express.static(path.join(__dirname, "public"))); // використовуємо express.static для сервісу статичних файлів
app.use(express.static(path.join(__dirname, "scripts")));

// middleware для авторизації користувача
// app.use((req, res, next) => {
//   User.findById("6a3284e40189ba13bfe8d57e")
//     .then((user) => {
//       req.user = new User(user._id, user.username, user.email, user.cart);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//       next();
//     });
// });

app.use("/admin", adminData);
app.use(shopRoutes);

// app.use(usersRoutes);

// app.use("/products/:productId", productDetailsRoutes);
// app.use(productDetailsRoutes);

// підключили маршрут для обробки помилок
app.use(error404Controller.get404);

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(
    "mongodb+srv://dh92fr_db_user:Specialized8110@clusters.4wo2tpe.mongodb.net/shop?appName=Clusters",
  )
  .then((result) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

// mongoConnect(() => {
//   app.listen(3001);
// });

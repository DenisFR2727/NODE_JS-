// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const error404Controller = require("./controllers/404");

const User = require("./models/users");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI =
  "mongodb+srv://dh92fr_db_user:Specialized8110@clusters.4wo2tpe.mongodb.net/shop?appName=Clusters";

const app = express(); // створюємо екземпляр express
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs"); // вказуємо який шаблон використовувати
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // використовуємо bodyParser для розбору даних з форми

app.use(express.static(path.join(__dirname, "public"))); // використовуємо express.static для сервісу статичних файлів
app.use(express.static(path.join(__dirname, "scripts")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

// підвантажуємо Mongoose-юзера лише якщо є в сесії
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.use("/admin", adminData);
app.use(shopRoutes);

app.use(usersRoutes);
app.use(authRoutes);

// підключили маршрут для обробки помилок
app.use(error404Controller.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "Max",
          email: "max@test.com",
          cart: { items: [] },
        });
        return user.save();
      }
      return user;
    });

    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

// mongoConnect(() => {
//   app.listen(3001);
// });

// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

const app = express();

app.set("view engine", "ejs"); // вказуємо який шаблон використовувати
app.set("views", "views"); // вказуємо папку в якій знаходяться шаблони

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "scripts")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "NotFound" });
});

app.listen(3001);
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

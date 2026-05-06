const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

const users = [];

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layouts",
    extname: "hbs",
  }),
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // статичні файли (css, js, images)

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
  });
});
app.post("/add-user", (req, res, next) => {
  users.push({ username: req.body.username });
  console.log(users);
  res.redirect("/users");
});
app.listen(3005);

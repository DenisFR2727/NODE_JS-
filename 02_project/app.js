const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const formDataRoutes = require("./routes/Form");
const usersRoutes = require("./routes/Users");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.redirect("/forms");
});

app.use("/forms", formDataRoutes.routes);
app.use(usersRoutes.routes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "NotFound" });
});

app.listen(3005);

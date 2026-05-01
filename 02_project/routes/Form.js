const express = require("express");
const router = express.Router();

const userData = [];

router.get("/", (req, res, next) => {
  res.render("form", {
    pageTitle: "Forms",
    path: "/forms",
    formsCSS: true,
    usersCSS: true,
  });
});

router.post("/", (req, res, next) => {
  userData.push({ name: req.body.name });
  console.log(userData);
  res.redirect("/users");
});

exports.routes = router;
exports.users = userData;

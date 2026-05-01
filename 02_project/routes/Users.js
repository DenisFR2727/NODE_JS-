const express = require("express");
const router = express.Router();

// Route to Form
const formDataRoutes = require("./Form");

router.get("/users", (req, res, next) => {
  res.render("users", {
    users: formDataRoutes.users,
    pageTitle: "Users",
    path: "/",
    hasUsers: formDataRoutes.users.length > 0,
    activeUsers: true,
    usersCSS: true,
  });
});

exports.routes = router;

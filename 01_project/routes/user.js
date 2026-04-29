const express = require("express");

const router = express.Router();

router.get("/user", (req, res, next) => {
  res.render("user", { pageTitle: "User Page", path: "/user", activeUser: true });
});

module.exports = router;

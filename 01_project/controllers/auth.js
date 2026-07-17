const User = require("../models/users");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne()
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      req.session.isLoggedIn = true;
      req.session.user = {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
      };
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

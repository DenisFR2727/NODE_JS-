const User = require("../models/users");

exports.getAddUser = (req, res, next) => {
  res.render("admin/add-user", {
    pageTitle: "Add User",
    path: "/add-user",
  });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/users");
      }
      // res.redirect("/user/user-details");
      res.render("user/user-details", {
        user: user,
        pageTitle: "User Details",
        path: "/user/user-details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

exports.postAddUser = (req, res, next) => {
  const name = req.body.name?.trim();

  if (!name) {
    return res.redirect("/add-user");
  }

  User.create({ name })
    .then((user) => {
      // console.log(user);

      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

// Route to Users
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render("user/users", {
        users: users,
        pageTitle: "User Page",
        path: "/users",
        activeUser: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error loading users");
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return;
      }
      return user.destroy();
    })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

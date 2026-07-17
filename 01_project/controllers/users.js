const User = require("../models/users");

exports.getAddUser = (req, res, next) => {
  res.render("admin/add-user", {
    pageTitle: "Add User",
    path: "/add-user",
    isAuthenticated: !!req.session.isLoggedIn,
  });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId).then((user) => {
    if (!user) {
      return res.redirect("/users");
    }
    res.render("user/user-details", {
      user: user,
      pageTitle: user.username,
      path: "/users",
      isAuthenticated: !!req.session.isLoggedIn,
    });
  });
};

exports.postAddUser = (req, res, next) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim();

  if (!username || !email) {
    return res.redirect("/add-user");
  }

  User.createUser(username, email)
    .then(() => {
      console.log("User created");
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

// Route to Users
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("user/users", {
        users: users,
        pageTitle: "User Page",
        path: "/users",
        activeUser: true,
        isAuthenticated: !!req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error loading users");
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.deleteUserById(userId)
    .then(() => {
      console.log("User deleted");
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

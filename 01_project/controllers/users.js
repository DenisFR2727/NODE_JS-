const User = require("../models/users");

// Route to Form
exports.getAddUser = (req, res, next) => {
  res.render("admin/add-user", {
    pageTitle: "Add User",
    path: "/admin/add-user",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
};
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId, (user) => {
    console.log(user);
  });

  console.log(userId);
  res.redirect("/users");
};

exports.postAddUser = (req, res, next) => {
  const user = new User(req.body.user); // створюємо новий об'єкт User
  user.save();
  res.redirect("/users");
};

// Route to Users
exports.getUsers = (req, res, next) => {
  User.fetchUsersAll((users) => {
    res.render("user/users", {
      users: users,
      hasUsers: users.length > 0,
      pageTitle: "User Page",
      path: "/users",
      activeUser: true,
    });
  });
};

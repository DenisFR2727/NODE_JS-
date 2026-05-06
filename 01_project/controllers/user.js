exports.getUsers = (req, res, next) => {
  res.render("user", {
    pageTitle: "User Page",
    path: "/user",
    activeUser: true,
  });
};

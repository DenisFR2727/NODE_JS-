exports.getLogin = (req, res, next) => {
  const cookies = req.get("Cookie");
  const isLoggedIn = cookies
    ? cookies.split(";").some((c) => c.trim() === "loggedIn=true")
    : false;
  console.log(isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true"); // set cookie to the response

  res.redirect("/");
};

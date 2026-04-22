const express = require("express");

const app = express();

// 1 middleware
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});

// 2 middleware
app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

// Route '/users
app.use("/users", (req, res) => {
  res.send("<h1>User Page</h1>");
});
// Route '/'
app.use("/", (req, res, next) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(3002);

// res.send("<h1>Hello first User!</h1>");

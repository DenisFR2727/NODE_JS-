const Product = require("../models/product");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId; // для перетворення id з string в ObjectId

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  }); // вказуємо який шаблон використовувати і передаємо дані в шаблон
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(
    null,
    title,
    price,
    imageUrl,
    description,
    req.user._id,
  );
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
// Update Product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const product = new Product(
    new ObjectId(prodId),
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDescription,
  );

  product
    .save()
    .then(() => {
      console.log("Product updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
// Delete Product
exports.deleteProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log("Destroyed Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Route to Admin Products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        activeAdminProducts: true,
        formsCSS: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

// Sequelize version
// createProduct() - метод для створення продукту в моделі Product
//   req.user
//     .createProduct({
//       title,
//       imageUrl,
//       description,
//       price: parseFloat(price),
//     })

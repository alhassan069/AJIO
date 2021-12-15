const express = require('express');

const app = express();

app.use(express.json());

const productController = require("./controllers/product.controller");

app.use("/products", productController);

const userController = require("./controllers/user.controller");

app.use("/user", userController)

const cartController = require("./controllers/cart.controller");

app.use("/cart", cartController);

module.exports = app;

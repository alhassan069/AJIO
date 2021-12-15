const express = require('express');

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const productController = require("./controllers/product.controller");

app.use("/products", productController);

const userController = require("./controllers/user.controller");

app.use("/user", userController)

const cartController = require("./controllers/cart.controller");

app.use("/cart", cartController);

const wishlistController = require("./controllers/wishlist.controller")

app.use("/wishlist",wishlistController)

module.exports = app;

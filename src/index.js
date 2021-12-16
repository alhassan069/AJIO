const express = require('express');
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser")
const app = express();

const registerController= require("./controllers/register.controller")
const loginController = require("./controllers/login.controller")
const productController = require("./controllers/product.controller");
const wishlistController = require("./controllers/wishlist.controller")
const cartController = require("./controllers/cart.controller");
const userController=require("./controllers/user.controller");


app.use(express.json());
app.use(cors());
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/products", productController);

app.use("/register", registerController);

app.use("/login", loginController);

app.use("/cart", cartController);

app.use("/wishlist",wishlistController)

app.use("/users", userController);


module.exports = app;

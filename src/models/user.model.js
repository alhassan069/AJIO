const mongoose = require("mongoose");

const Product = require("./product.model");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    address: [{ type: String }],
}, {
    versionKey: false,
    timestamps:true
})
module.exports = new mongoose.model("user", userSchema);
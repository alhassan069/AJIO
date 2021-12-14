const mongoose = require('mongoose');

module.exports= () => {
    return mongoose.connect("mongodb+srv://ajio-clone:ajio-clone@cluster0.ltyhb.mongodb.net/products");
}
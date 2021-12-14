const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    display_img: String,
    images: [{
        type:String,required:true
    }],
    name: { type: String, unique: true },
    brand: String,
    price: Number,
    MRP: Number,
    discount: Number,
    offer_price: Number,
    color: String,
    category : String,
    sub_category: String
}, {
    versionKey: false,
    timestamps:true
})
module.exports = new mongoose.model("products", productSchema);
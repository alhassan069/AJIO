const mongoose = require("mongoose");

const User = require("./user.model");

const wishlistSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    wishlists: [
        { type: String, required: true }
    ]
}
, {
    versionKey: false,
    timestamps:true
})
module.exports = new mongoose.model("wishlist", wishlistSchema);
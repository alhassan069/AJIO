const express = require("express");

const Wishlist = require("../models/wishlist.model");

const Product= require("../models/product.model")

const router = express.Router();

router.post("/",async(req,res)=>{
        try {
            const wishlist = await Wishlist.create(req.body);
            return res.status(201).json({ wishlist });
        }
        catch (e) {
            return res.status(500).json({ status: "failed", message: e.message });
        }
    }
)

router.get("/", async (req, res) => {
    try {
        const wishlist = await Wishlist.find().lean().exec();
        return res.status(201).json({wishlist})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();
        return res.status(201).json({wishlist})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).json({wishlist})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

module.exports = router;
const express = require("express");

const Product = require("../models/product.model");

const router = express.Router();

router.post("/",async(req,res)=>{
        try {
            const product = await Product.create(req.body);
            return res.status(201).json({ product });
        }
        catch (e) {
            return res.status(500).json({ status: "failed", message: e.message });
        }
    }
)
 
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().lean().exec();
        return res.status(201).json({products})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.get("/:category", async (req, res) => {
    try {
        const products = await Product.find({category:req.params.category}).lean().exec();
        return res.status(201).json({products})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();
        return res.status(201).json({products})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).json({products})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

module.exports = router;
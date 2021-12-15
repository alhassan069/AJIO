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

router.get("/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).lean().exec();
        return res.status(201).json({products})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})
router.get("/cat/:category", async (req, res) => {
    try {
        const page = +(req.query.page) || 1;
        const size = +(req.query.size) || 9;
        const offset = (page - 1) * size;

        const products = await Product.find({category:req.params.category.toUpperCase()})
        .skip(offset).limit(size)
        .lean().exec();
        const totalPages = Math.ceil(await (Product.find({category:req.params.category.toUpperCase()}).countDocuments())/size);
        return res.status(201).json({products,totalPages});
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.get("/", async (req, res) => {
    try {
        const page = +(req.query.page) || 1;
        const size = +(req.query.size) || 9;
        const offset = (page - 1) * size;

        const products = await Product.find()
        .skip(offset).limit(size)
        .lean().exec();
        const totalPages = Math.ceil(await (Product.find().countDocuments())/size);
        return res.status(201).json({products,totalPages});
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
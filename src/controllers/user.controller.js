const express = require("express");

const User = require("../models/user.model");

const router = express.Router();

router.post("/",async(req,res)=>{
        try {
            
            const user = await User.create({
                name: req.body.name,
                email:req.body.email,
                username: req.body.username,
                password: req.body.password,
                mobile:req.body.mobile
            }); 
            
            res.status(201).json({user});
        }
        catch (e) {
            return res.status(500).json({ status: "failed", message: e.message });
        }
    }
)

router.get("/", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(201).json({user})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();
        return res.status(201).json({user})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).json({user})
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

module.exports = router;
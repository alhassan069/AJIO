const express = require("express");

const router= express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
    return token = jwt.sign({ user: user }, "ajioproject");
}

router.post("/", async (req, res) => {
    try {
        let user =await User.findOne({email:req.body.email})

        if(!user) {
            return res.status(400).json({status:"Failed",message:"password or email is invalid",error:true});
        }

        const match= await user.checkPassword(req.body.password)

        if(!match) {
            return res.status(400).json({status:"Failed",message:"password or email is invalid",error:true});
        }

        const token = newToken(user);
        res.status(201).json({user, token,error:false,message:"Login Successful"})
    }  catch (err) {
        res.status(500).json({message: err.message,status: "Failed",error:true});
    }
})


module.exports = router;
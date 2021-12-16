const express = require("express");

const router= express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
    return token = jwt.sign({ user: user }, "ajioproject");
}

router.post("/", async (req, res) => {   
    try {
        let user = await User.findOne({email: req.body.email}).lean().exec();

        if(user) {
            return res.status(400).json({status:"Failed",message:"Please provide different email address",error:true})
        }

        user=await User.create(req.body);

        const token = newToken(user);

       res.status(201).json({user, token,message:"Sign in successfull",error:false})
   } catch (err) {
       res.status(500).json({message: err.message,status: "Failed",error:true});
   }
})

module.exports = router;
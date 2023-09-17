const express=require("express");
const {UserModel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {username,email,password}=req.body

    const passwordReq=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordReq.test(password)) {
        return res.status(200).json({ msg:'Invalid password format! Password format Should contain atleast one uppercase character, one number, special character and length greater then 8.'});
      }

    try{
    const existingUser = await UserModel.findOne({username});
    if (existingUser) {
        return res.status(200).json({ msg:'User Already Exists!'});
      }
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.status(400).json({error:err.messag})
        }else{
            const user=new UserModel({username,email,password:hash})
            await user.save()
        }
    })
    res.status(200).json({msg:"Registration Successful!",registeredUser:req.body})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const { username, password } = req.body;

    try{
        const user = await UserModel.findOne({ email });
        if (user) {
           bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                var token=jwt.sign({_id:user._id},"sy",{
                    expiresIn:120
                  })
                res.status(200).json({msg:"Login successful!",token:token})
            }
           })

        }else{
            res.status(200).json({msg:"User Not Found!"})
        }

    }catch(err){
          return res.status(400).json({ error: err.messag});
    }
})

userRouter.get("/logout",async(req,res)=>{
    try{
    const token=req.headers.authorization?.split(" ")[1] || null
    if(token){
        res.status(200).json({msg:"Logout Successful!"})
    }    
    }catch(err){
        res.status(400).json({error:err.messag})
    }
})


module.exports={
    userRouter
}

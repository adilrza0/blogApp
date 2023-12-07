const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("../Model/user.model");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {password}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(hash){
                req.body.password=hash
                
                const newUser=new userModel(req.body)
                await newUser.save()
                res.status(200).send({"msg":"new user added"})
            }
            else{
                res.status(200).send({"err":err})
            }
        })
        


    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.find({email})
        bcrypt.compare(password,user[0].password,(err,decoded)=>{
            if(err){
                res.status(200).send({"err":err})
            }
            else{
                const token=jwt.sign({email:user[0].email,userId:user[0]._id},"blog")
                res.status(200).send({"msg":"Logged in","token":token})
                
                
            }
        })
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})




module.exports={
    userRouter
}
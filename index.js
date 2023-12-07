require("dotenv").config()
const cors=require("cors")
const express=require("express");
const connection = require("./db");
const { contactModel } = require("./Model/contact.model");


const app=express();

app.use(cors())
app.use(express.json())



app.get("/",async(req,res)=>{

    try {
        const contacts=await contactModel.find()
        

            res.status(200).send({"msg":contacts})
    
        
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
    
})


app.post("/add",async(req,res)=>{
    try {
        const newContact=new contactModel(req.body)
        await newContact.save()
        res.status(200).send({"mse":"new Contact added"})
        
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})

app.patch("/edit/:id",async(req,res)=>{
    const {id}=req.params
    
    const a=req.body
    console.log(a,id)
    try {
        const updated=await contactModel.findOneAndUpdate({_id:id},a)
        
            res.status(200).send(updated)
    } catch (error) {
        res.status(400).send({"err":error})
    }
})
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    
    const a=req.body
    console.log(a,id)
    try {
        const deleted=await contactModel.findOneAndDelete({_id:id},a)
        
            res.status(200).send(deleted)
    } catch (error) {
        res.status(400).send({"err":error})
    }
})



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log("Server running at",process.env.port)
    } catch (error) {
        console.log(error)
        
    }
    
})
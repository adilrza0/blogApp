const express=require("express")
const { auth } = require("../Middleware/auth.middleware")
const { blogModel } = require("../Model/blog.model")

const blogRouter=express.Router()

blogRouter.use(auth)

blogRouter.get("/",async(req,res)=>{
    
    
    
    
    try {
        let query={}
        if(req.query.title){
            query.title={$regex:req.query.title,$options:"i"};

        }
        if(req.query.category){
            query.category=req.query.category
        }

        const blogs=await blogModel.find(query).sort({[req.query.sort||"date"]:req.query.order==='asc'?1:-1});
        res.status(200).send(blogs)
        
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})



blogRouter.post("/",async(req,res)=>{
    
    try {
        const newBlog=new blogModel(req.body)
        await newBlog.save()
        res.status(200).send({"msg":"blog added"})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})


blogRouter.patch("/:id",async(req,res)=>{
    try {
        const updatedBlog=await blogModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedBlog){
            return res.status(404).send({"error":"Blog not found"})
        }
        res.status(200).send({"msg":updatedBlog})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})


blogRouter.delete("/:id",async(req,res)=>{
    try {
        const updatedBlog=await blogModel.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!updatedBlog){
            return res.status(404).send({"error":"Blog not found"})
        }
        res.status(200).send({"msg":updatedBlog})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

blogRouter.patch("/:id/like",async(req,res)=>{

    try {
        
        const updatedBlog=await blogModel.findByIdAndUpdate(req.params.id,{$inc:{likes:1}},{new:true})
        if(!updatedBlog){
            return res.status(404).send({"error":"Blog not found"})
        }
        res.status(200).send({"msg":updatedBlog})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})
blogRouter.patch("/:id/comment",async(req,res)=>{

    try {
        const blog=await blogModel.findById(req.params.id)
        if(!blog){
            return res.status(404).send({"err":"blog not found"})
        }
        const newComment={
            content:req.body.content,
            username:req.body.username
        }
        blog.comments.push(newComment)
    
        const updatedBlog=await blog.save()
        
        res.status(200).send({"msg":updatedBlog})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

module.exports={
    blogRouter
}
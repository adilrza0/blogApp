const express=require("express");
const cors=require("cors")
require("dotenv").config()
const { connnection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { blogRouter } = require("./Routes/blog.route");

const app=express();
app.use(cors())

app.use(express.json())

app.use("/",userRouter)

app.use("/blog",blogRouter)


app.listen(process.env.port,async()=>{
    try {
        await connnection
    console.log("Connected to DB")
    console.log(`server running at port ${process.env.port}`)

        
    } catch (error) {
        console.log(error)
        
    }
    
})
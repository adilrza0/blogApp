const { default: mongoose } = require("mongoose");

const blogModelSchema=mongoose.Schema({
    "username": String,
    "title": String,
    "content": String,
    "category" : String,
	"date" : String,
	"likes" : Number,
	"comments" : Array

},{
    versionKey:false
})

const blogModel=mongoose.model("blog",blogModelSchema)

module.exports={
    blogModel
}
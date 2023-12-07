const { default: mongoose } = require("mongoose");
require("dotenv").config()

const connnection=mongoose.connect(process.env.MongoUrl)
module.exports={
    connnection
}
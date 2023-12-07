const { default: mongoose, mongo } = require("mongoose");

const contactSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    label:String,
    booked_slots:Array
})

const contactModel=mongoose.model("contact",contactSchema)

module.exports={
    contactModel
}
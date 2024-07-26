const mongoose = require('mongoose')
const {Schema} = mongoose 

const userSchema = new Schema({
    username : { type: String,required: true},
    googleId : { type: String},
    email :  {type : String, required: true}, 
    thumnail : String
})

const User = mongoose.model("mongo",userSchema) 

module.exports = {User} 



// Like in django, we create model with fields and stuff
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema //
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now
    }
},

)

// create model , name of model and take the Schema, model needs to know what the schema is
module.exports = User = mongoose.model('user',UserSchema)
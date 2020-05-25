// Like in django, we crate model with fields and stuff
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema //
const ItemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// create model , name of model and take the Schema, model needs to know what the schema is
module.exports = Item = mongoose.model('item',ItemSchema)
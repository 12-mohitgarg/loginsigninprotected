const mongoose = require("mongoose")

const user = new mongoose.Schema({

    firstname:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["Admin", "Student", "Visitor"]
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    },

})

module.exports = mongoose.model("User" , user);
const mongoose = require('mongoose')
require("dotenv").config()


exports.connect = () =>{
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(()=>console.log("DB connected successfully"))
        .catch((error)=>{
            console.log("error while connecting the db",error)
            process.exit(1);
        })
}


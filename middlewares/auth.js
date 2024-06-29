

const jwt = require('jsonwebtoken')
require('dotenv').config()



exports.auth = (req,res,next) => {

    try {

        
        const token =req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.json({
                success:false,
                message:"token is missing"
            })
        }
        

        try {
            const payload = jwt.verify(token,process.env.JWT_SECRATE);

            req.user=payload;


        } catch (error) {
            return res.json({
                success:false,
                message:"invalid token or secrate"
            })
        }
        next();

        
    } catch (error) {
        return res.json({
            success:false,
            message:"error while varifing the token"
        })
    }
}


exports.isStudent = (req,res,next) => {

    try {

        if(req.user.role !== "Student"){
            return res.json({
                success:false,
                message:"this is protected route for Students only"
            })
        }

        next();
        
    } catch (error) {
        return res.json({
            success:false,
            message:"somthing went wrong in student protected route"
        })
    }
    
}

exports.isAdmin = (req,res,next) => {

    try {

        if(req.user.role !== "Admin"){
            return res.json({
                success:false,
                message:"this is protected route for Admin only"
            })
        }
        next()
        
    } catch (error) {
        return res.json({
            success:false,
            message:"somthing went wrong in student protected route"
        })
    }
}
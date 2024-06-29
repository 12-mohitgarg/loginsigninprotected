const User = require('../model/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookie = require("cookies") 


exports.signup = async (req,res) =>{

try {

    const {firstname,email,password,role} = req.body

    const userexist = await User.findOne({email})

    if(userexist){
        return res.json({
            status:false,
            message:"user already exist"
        })
    }

    const hashpassword =await bcrypt.hash(password , 10)

    let entry = await User.create({firstname , email , password:hashpassword , role})

    return res.json({
        message:"successfully enter the data",
        entry,
    })

    
} catch (error) {
    return res.json({
        status:false,
        message:"error while creating user"
    })
}

};





exports.login = async (req,res) =>{


    try {
        
        const {email,password} = req.body

        if(!email || !password){
            return res.json({
                status:false,
                message:"please fill all the details"
            })
        }

        const userexist = await User.findOne({email})

    if(!userexist){
        return res.json({
            status:false,
            message:"please signup first"
        })
    }


    const payload = {

        email:userexist.email,
        id:userexist._id,
        role:userexist.role
    }
    const compare = await bcrypt.compare(password,userexist.password)
    if(compare){
        
        const token = jwt.sign(payload,process.env.JWT_SECRATE,{expiresIn:"2h"});

        
        userexist.token = token;

        // Remove password from response
        const userResponse = {
            ...userexist.toObject(),
            password: undefined,
            token: token
        };


        const option = {
            expires:new Date(Date.now() + 15000),
            httpOnly:true
        }

        res.cookie("token" , token , option).status(200).json({
            success:true,
            token,
            userexist:userResponse,
            message:"user loged in successfully"
        })
    }
    else{
        return res.json({
            status:false,
            message:"password do not match"
        })
    }




    } catch (error) {
        return res.json({
            status:false,
            message:"error while login"
        })
    }


};
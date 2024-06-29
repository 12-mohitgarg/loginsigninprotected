const express = require('express')
const router = express.Router()


const {login, signup} = require('../controler/Auth')
const {auth,isAdmin,isStudent} = require('../middlewares/auth')

router.post("/login",login);
router.post("/signup",signup)

router.get('/test',auth,(req,res)=>{
    return res.json({
        success:true,
        message:"welcome to protected route test"
    })
})

router.get('/student',auth,isStudent,(req,res)=>{
    return res.json({
        success:true,
        message:"welcome to protected route student"
    })
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    return res.json({
        success:true,
        message:"welcome to protected route admin"
    })
})


module.exports = router;
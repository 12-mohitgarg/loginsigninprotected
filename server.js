const express = require("express")
const app = express()
require("dotenv").config();

PORT = process.env.PORT || 4000
app.use(express.json())

const cookieparser = require("cookie-parser")
app.use(cookieparser())

Router = require("./router/user")
app.use("/api/v1" ,Router)

require('./config/database').connect()

app.listen(PORT ,()=> {
    console.log(`server start successfully at port ${PORT}`)
});
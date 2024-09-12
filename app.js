const express = require("express")
const app = express()

const connectToDatabase = require('./database/index.js')  //index.js handa ni vayo nahanda ni vayo

connectToDatabase()

app.get("/",(req,res)=>{
   
    res.status(200).json({
        "message":"success"
    })
})





app.listen(3000,()=>{
    console.log("running in port 3000")
})
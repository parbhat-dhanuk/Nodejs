

const mongoose= require('mongoose')

const conn = "mongodb+srv://parbhat:parbhat@cluster0.atjcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectToDatabase(){
    await mongoose.connect(conn)
    console.log("connection successfull")
 }
 
 module.exports = connectToDatabase
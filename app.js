const express = require("express")
const app = express()

const connectToDatabase = require('./database/index.js')  //index.js handa ni vayo nahanda ni vayo
const Book = require("./model/bookModel.js")

app.use(express.json())  //important line bisrinu vayena yo top mai hannu paroe

connectToDatabase()

app.get("/",(req,res)=>{
   
    res.status(200).json({
        "name":"parbhat"
    })
}),

//CREATE

app.post("/book",async (req,res)=>{
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    await Book.create({
        bookName,          
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
    })

    res.status(201).json({
        message:"Book created successfully"
    })
})


//All Read

app.get("/book",async(req,res)=>{
    const books = await Book.find()   // Array ma return garxa.
    res.status(200).json({
        message:"Books fetched successfully",
        data:books
    })
})


//Single Read

app.get("/book/:id",async (req,res)=>{
 const {id}=req.params
const book = await Book.findById(id)  // return object garxa
    // console.log(book)
res.status(200).json({
        message:"Single Book fetched Successfully",
        data:book
})
})


//DELETE

app.delete("/book/:id",async(req,res)=>{
    const {id} = req.params
    const book = await Book.findByIdAndDelete(id)
    res.status(200).json({
        message:"Book deleted successfully"
    })
})



//Update

app.patch("/book/:id",async(req,res)=>{
    const {id} = req.params  //kun book update garne id ho yo
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    await Book.findByIdAndUpdate(id,{
        bookName,          
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication

    })
    res.status(200).json({
        message:"Book Updated Successfully"
    })
})

app.listen(3000,()=>{
    console.log("running in port 3000")
})
const express = require("express")
const app = express()


const fs=require("fs") //  


const connectToDatabase = require('./database/index.js')  //index.js handa ni vayo nahanda ni vayo
const Book = require("./model/bookModel.js")


// multerconfig imports
const {multer,storage} = require("./middleware/multerConfig.js")
const upload=multer({storage:storage})


app.use(express.json())  //important line ho bisrinu vayena yo top mai hannu paroe


connectToDatabase()



//CREATE

app.post("/book", upload.single("image"), async (req,res)=>{
    let filename;
   if(!req.file){
     filename= "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
    }else{
        filename = `http://localhost:3000/${req.file.filename}`
    }

    
    
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    await Book.create({
        bookName,          
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt, 
        publication,
        imageUrl:filename
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

app.patch("/book/:id", upload.single("image"),async(req,res)=>{
    const {id} = req.params  //kun book update garne id ho yo
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body

    const oldDatas = await Book.findById(id)

   let filename;

   if(req.file){
    const oldImagePath = oldDatas.imageUrl
   
    const locaHostUrlLength = "http://localhost:3000/".length
   const newoldImagePath=  oldImagePath.slice( locaHostUrlLength)
  
   fs.unlink(`./storage/${newoldImagePath}`,(err)=>{
    if(err){
        console.log(err)
    }else{ 
        console.log("file deleted")
    }
   })
    filename=`http://localhost:3000/${req.file.filename}`
   }
    await Book.findByIdAndUpdate(id,{
        bookName,          
        bookPrice,
        isbnNumber,
        authorName,  
        publishedAt,
        publication,
        imageUrl:filename

    })
    res.status(200).json({
        message:"Book Updated Successfully"
    })
})


app.use(express.static("./storage/")) //yo vaneko root directory ko k lai access dinu ho vanne batauxa. (./) matra gareko vaye sabaii acess hunxa

app.listen(3000,()=>{
    console.log("running in port 3000")
})
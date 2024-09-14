const mongoose = require("mongoose")

// const schema = mongoose.schema // yesto garera mongoose.schema ko thau ma schema lakhda ni hunxa.

const bookSchema = new mongoose.Schema({

    bookName:{
        type:String,
        unique:true
    },
    bookPrice:{
        type:Number
    },
    isbnNumber:{
        type:Number
    },
    authorName:{
        type:String
    },
    publishedAt:{
        type:String
    },
    publication:{
        type:String
    } ,
    imageUrl:{
        type:String 
     }
   
})




const Book =  mongoose.model("book",bookSchema)

module.exports = Book
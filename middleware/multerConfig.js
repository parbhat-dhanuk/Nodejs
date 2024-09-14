

const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
              
        const allowedFileTypes = ["image/png","image/jpeg","image/jpeg"]

        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This filetypes is not supported")) // cd(error)  huda ko case ho
            return
        }
        cb(null,'./storage') // --> cb(error,success)
      

    },
   
    filename : function(req,file,cb){
        cb(null,Date.now()+ "-"+ file.originalname)
    }
})

module.exports = {
    storage,
    multer
}
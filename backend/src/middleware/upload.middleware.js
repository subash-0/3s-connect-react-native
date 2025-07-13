import multer from "multer"

const fileFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith("image/")){
    cb(null,true)
  }else{
    cb(new Error("only Image can be uploaded"))
  }
}

const storage  = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 5 *1024 *1024}
}) 

export default upload;
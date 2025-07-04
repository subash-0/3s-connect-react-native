import mongoose from "mongoose";


const notificationsSchema = new mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  to:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  types:{
    type:String,
    required:true,
    enum:["follow","like","comment"]
  },
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Post",
    default: null
  },
  comment:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Comment",
    default: null
  },
  
},
{timestamps:true})
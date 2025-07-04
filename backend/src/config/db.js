import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDb =async() =>{
  try {
    await mongoose.connect(ENV.MONGO_URI)
    console.log("db is connnected ")
  } catch (error) {
    console.log("error while connecting")
    process.exit(1)
    
  }
}
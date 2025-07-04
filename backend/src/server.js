import express from "express"
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();
connectDb();

app.get("/",(req,res)=>res.send("hello testing"))

app.listen(ENV.PORT,()=>{
  console.log(`Server is running at https://localhost:${ENV.PORT}`)
})
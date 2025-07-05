import express from "express";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"


import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import commentRoute from "./routes/comment.route.js"
import notificationRoute from "./routes/notification.route.js"



import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())
app.use(arcjetMiddleware);

app.get("/", (req, res) => res.send("hello testing"));

app.use("/api/users",userRoute)
app.use("/api/post",postRoute)
app.use("/api/comment",commentRoute)
app.use("/api/notification",notificationRoute)


// error hanlding midldeware

app.use((error,req,res,next)=>{
  console.log("Unhandled error", error)
  res.status(500).json({error:"Internal server Error"})
})

const startServer = async () => {
  try {
    await connectDb();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running at https://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.log("failed to start  the server", error.message);
    process.exit(1);
  }

};

startServer();

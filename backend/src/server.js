import express from "express";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"


import userRoute from "./routes/user.route.js"



import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get("/", (req, res) => res.send("hello testing"));

app.use("api/users",userRoute)
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

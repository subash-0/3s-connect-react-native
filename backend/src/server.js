import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();

app.get("/", (req, res) => res.send("hello testing"));

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

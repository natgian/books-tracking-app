import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Running on PORT ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT;

// EXPRESS APP
const app = express();

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// LISTENING FOR REQUESTS
app.listen(PORT, () => {
  connectDB();
  console.log(`Running on PORT ${PORT}`);
});

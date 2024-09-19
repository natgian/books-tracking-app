import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const dbURI = process.env.DB_URI;
const PORT = 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURI);
  console.log("connected to MongoDB database");
}

const app = express();

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

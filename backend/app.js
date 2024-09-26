import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import readingListsRoutes from "./routes/readinglists.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT;

// EXPRESS APP
const app = express();

// GLOBAL MIDDLEWARE
// parsing the body the get access to req.body:
app.use(express.json());
// used to track incoming requests and their methods in development:
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.use("/api/readinglists", readingListsRoutes);

// LISTENING FOR REQUESTS
app.listen(PORT, () => {
  connectDB();
  console.log(`Running on PORT ${PORT}`);
});

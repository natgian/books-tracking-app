import express from "express";
import session from "express-session";
import { sessionConfig } from "./config/sessionConfig.js";
import { passportConfig } from "./config/passportConfig.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mongoSanitize from "express-mongo-sanitize";
import userRoutes from "./routes/userRoutes.js";
import readinglistRoutes from "./routes/readinglistRoutes.js";

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const DB_URI = process.env.DB_URI;

// EXPRESS APP
const app = express();

// Enable CORS for requests coming from frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Set your frontend production domain
  })
);

// MIDDLEWARE SETUP
app.use(express.json()); // parsing the body the get access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize);

// Sessions
app.use(session(sessionConfig(DB_URI, SECRET)));

// Passport
passportConfig(app);

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/readinglist", readinglistRoutes);

// LISTENING FOR REQUESTS & CONNECTING DO DATABASE
app.listen(PORT, () => {
  connectDB(DB_URI);
  console.log(`Running on PORT ${PORT}`);
});

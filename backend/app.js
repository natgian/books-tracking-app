import express from "express";
import session from "express-session";
import { sessionConfig } from "./config/sessionConfig.js";
import { passportConfig } from "./config/passportConfig.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mongoSanitize from "express-mongo-sanitize";
import userRoutes from "./routes/userRoutes.js";
import readinglistRoutes from "./routes/readinglistRoutes.js";
import { isAuthenticated } from "./middleware/isAuthenticated.js";

// EXPRESS APP
const app = express();

// Set trust proxy so that cookies and sessions work correctly behind a proxy
app.set("trust proxy", true);

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;
const DB_URI = process.env.DB_URI;

// for production:
const FRONTEND_URL = process.env.FRONTEND_URL;
// for development:
// const FRONTEND_URL = "http://localhost:5173";

// Enable CORS for requests coming from frontend
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// MIDDLEWARE SETUP
app.use(express.json()); // parsing the body the get access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Sessions
app.use(session(sessionConfig(DB_URI, SECRET)));

// Passport
passportConfig(app);

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/readinglists", isAuthenticated, readinglistRoutes);

// LISTENING FOR REQUESTS & CONNECTING DO DATABASE
app.listen(PORT, () => {
  connectDB(DB_URI);
  console.log(`Running on PORT ${PORT}`);
});

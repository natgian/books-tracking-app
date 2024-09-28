import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", loginUser);

// REGISTER ROUTE
router.post("/register", registerUser);

// LOGOUT ROUTE
router.get("/logout", logoutUser);

export default router;

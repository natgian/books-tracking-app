import express from "express";
import { validateUser } from "../validations/validationsMiddleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
} from "../controllers/userController.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", loginUser);

// REGISTER ROUTE
router.post("/register", validateUser, registerUser);

// CHECK CURRENT USER ROUTE
router.get("/currentUser", currentUser);

// LOGOUT ROUTE
router.post("/logout", logoutUser);

export default router;

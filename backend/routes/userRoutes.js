import express from "express";
import { validateUser } from "../validations/validationsMiddleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  sendResetPasswordEmail,
  resetPassword,
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

// SENT RESET PASSWORD EMAIL TO USER
router.post("/forgotPassword", sendResetPasswordEmail);

// RESET PASSWORD
router.post("/reset/:token", resetPassword);

export default router;

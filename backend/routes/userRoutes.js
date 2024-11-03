import express from "express";
import {
  validateUser,
  validateLogin,
  validateContactForm,
} from "../validations/validationsMiddleware.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  sendResetPasswordEmail,
  resetPassword,
  changePassword,
  sendContactForm,
} from "../controllers/userController.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", validateLogin, loginUser);

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

// CHANGE PASSWORD
router.post("/changePassword", isAuthenticated, changePassword);

router.post("/contact", validateContactForm, sendContactForm);

export default router;

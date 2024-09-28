import User from "../models/userModel.js";

// LOGIN USER
const loginUser = async (req, res) => {
  res.json({ message: "login user" });
};

// REGISTER USER
const registerUser = async (req, res) => {
  res.json({ message: "register user" });
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  res.json({ message: "logout user" });
};

export { loginUser, registerUser, logoutUser };

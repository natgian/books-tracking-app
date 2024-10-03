import User from "../models/userModel.js";
import passport from "passport";

const errorMessages = {
  "Missing credentials": "Fehlende Anmeldedaten",
  "Password or username is incorrect": "Passwort oder E-Mail ist falsch",
};

// REGISTER USER
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: "Ein Benutzer mit diesem Benutzernamen existiert bereits.",
      });
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    res.json({ message: "Neuer Benutzer wurde erfolgreich registriert." });
  } catch (error) {
    console.log(error);

    // Default error message
    let errorMessage =
      "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";

    // Username already exist error message
    if (error.name === "UserExistsError") {
      errorMessage =
        "Ein Benutzer mit der angegebenen E-Mail-Adresse ist bereits registriert.";
    }

    res.status(400).json({ error: errorMessage });
  }
};

// LOGIN USER
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      const translatedMessage = errorMessages[info.message] || info.message;
      return res.status(401).json({ error: translatedMessage });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login fehlgeschlagen" });
      }

      return res.json({ message: "User erfolgreich angemeldet", user });
    });
  })(req, res, next);
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    // res.redirect("/login");
  });
  res.json({ message: "Erfolgreich abgemeldet" });
};

export { loginUser, registerUser, logoutUser };

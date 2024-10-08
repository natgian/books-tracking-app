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
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({
        error:
          "Ein Benutzer mit diesem Benutzernamen existiert bereits. Bitte einen anderen Benutzernamen verwenden.",
      });
    }
    // Check if the email already exists
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({
        error:
          "Ein Benutzer mit der angegebenen E-Mail-Adresse ist bereits registriert.",
      });
    }

    // Create new user
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    // Automatically log in the user
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err); // Handle any error that occurs during login
      }
      return res.json({
        message: "Neuer Benutzer wurde erfolgreich registriert.",
        registeredUser,
      });
    });
  } catch (error) {
    console.log(error);

    // Default error message
    let errorMessage = `Ein Fehler ist aufgetreten. Bitte erneut versuchen: ${error}`;

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

// CHECK CURRENT USER
const currentUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(200).json({ user: null });
  }
};

// LOGOUT USER
const logoutUser = async (req, res, next) => {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }

    // Destroy sessiond and clear the cookie
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }

      res.clearCookie("session");

      return res.json({ message: "Erfolgreich abgemeldet" });
    });
  });
};

export { loginUser, registerUser, logoutUser, currentUser };

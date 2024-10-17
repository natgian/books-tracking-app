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

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    // If a user exists, determine which field is already taken
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({
          message:
            "Ein Benutzer mit diesem Benutzernamen existiert bereits. Bitte einen anderen Benutzernamen verwenden.",
        });
      }
      if (existingUser.email === email) {
        return res.status(400).json({
          message:
            "Ein Benutzer mit der angegebenen E-Mail-Adresse ist bereits registriert.",
        });
      }
    }

    // Create new user
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    // Automatically log in the user
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error); // Handle any error that occurs during login
      }
      return res.json({
        message: "Neuer Benutzer wurde erfolgreich registriert.",
        registeredUser,
      });
    });
  } catch (error) {
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
const currentUser = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId)
        .populate("readingLists.read.book")
        .populate("readingLists.tbr.book")
        .populate("readingLists.reading.book");
      return res.json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
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

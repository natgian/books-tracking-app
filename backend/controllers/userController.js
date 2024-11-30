import User from "../models/userModel.js";
import passport from "passport";
import transporter from "../config/nodemailerTransporter.js";
import crypto from "crypto";

const errorMessages = {
  "Missing credentials": "Fehlende Anmeldedaten",
  "Password or username is incorrect": "Passwort oder E-Mail ist falsch",
};

// REGISTER USER
const registerUser = async (req, res) => {
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
    console.error("Registration error:", error);

    // Clear session data in case of error to ensure clean state on retry
    req.session = null;

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
      console.log("Authentication failed:", info);
      const translatedMessage = errorMessages[info.message] || info.message;
      return res
        .status(401)
        .json({ status: "error", type: "login", message: translatedMessage });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log("Login error:", err);
        return res.status(500).json({ error: "Login fehlgeschlagen." });
      }
      return res.json({ message: "User erfolgreich angemeldet", user });
    });
  })(req, res, next);
};

// CHECK CURRENT USER
const currentUser = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        console.log("NO USER FOUND");
        return res.status(401).json({ message: "User not found" });
      }

      const user = await User.findById(userId)
        .populate("readingLists.read.book")
        .populate("readingLists.tbr.book")
        .populate("readingLists.reading.book");

      if (user && user.readingLists) {
        // Sort lists manually
        user.readingLists.read = user.readingLists.read.sort(
          (a, b) =>
            new Date(b.finishedReadingAt) - new Date(a.finishedReadingAt)
        );
        user.readingLists.tbr = user.readingLists.tbr.sort(
          (a, b) => new Date(b.addedToListAt) - new Date(a.addedToListAt)
        );
        user.readingLists.reading = user.readingLists.reading.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      }

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
const logoutUser = async (req, res) => {
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

// SEND RESET PASSWORD EMAIL
const sendResetPasswordEmail = async (req, res) => {
  // for production:
  const frontendURL = process.env.FRONTEND_URL;
  // for development:
  // const frontendURL = "http://localhost:5173";

  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Kein Benutzer mit dieser E-Mail gefunden." });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    const link = `${frontendURL}/user/reset/${resetToken}`;
    const message = `Hallo ${user.username}

Du erhältst diese Nachricht, weil das Zurücksetzen des Passworts für dein Konto beantragt wurde. Bitte klicke auf den folgenden Link oder füge diesen in deinen Browser ein, um den Vorgang abzuschliessen:

${link}

Wenn du dies nicht angefordert hast, ignoriere bitte diese E-Mail und dein Passwort bleibt unverändert.

Freundliche Grüsse
LeseOase.app
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "LeseOase - Passwort zurücksetzen",
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Link zum Zurücksetzen des Passworts wurde gesendet." });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({
      message:
        "Bei der Anforderung der Passwortrücksetzung ist ein Fehler aufgetreten.",
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Checks if the value of resetPasswordExpires is greater than the current date and time
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Link ist ungültig oder abgelaufen." });
    }

    user.setPassword(password, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Ein Fehler ist aufgetreten. Bitte erneut versuchen.",
        });
      }

      // Clear the resetPasswordToken and resetPasswordExpires fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return res
        .status(200)
        .json({ message: "Passwort erfolgreich zurückgesetzt." });
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ error: "Ein Fehler ist aufgetreten. Bitte erneut versuchen." });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const userId = req.session.passport.user;
    const user = await User.findOne({ email: userId });

    if (!user) {
      return res.status(400).json({ message: "Benutzer nicht gefunden." });
    }

    // Authenticate the user with the current password
    user.authenticate(currentPassword, async (error, authenticatedUser) => {
      if (error || !authenticatedUser) {
        return res
          .status(401)
          .json({ message: "Aktuelles Passwort ist falsch." });
      }

      // Change the password to the new password
      user.setPassword(password, async (error) => {
        if (error) {
          return res.status(500).json({
            message:
              "Fehler beim Ändern des Passworts. Bitte erneut versuchen.",
          });
        }

        await user.save();
        return res
          .status(200)
          .json({ message: "Passwort erfolgreich geändert." });
      });
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res
      .status(500)
      .json({ error: "Ein Fehler ist aufgetreten. Bitte erneut versuchen." });
  }
};

// SEND CONTACT FORM
const sendContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `LESEOASE - Nachricht von ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Nachricht erfolgreich versendet.",
    });
  } catch (error) {
    console.error("Error sending contact form", error);
    res.status(500).json({
      message:
        "Beim Versenden der Nachricht ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    });
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  sendResetPasswordEmail,
  resetPassword,
  changePassword,
  sendContactForm,
};

import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/userModel.js";

export const passportConfig = (app) => {
  // Initializes Passport for authentication in the app
  app.use(passport.initialize());

  // Enables persistent login sessions with Passport
  app.use(passport.session());

  // Configures Passport to use a local strategy for authentication, using 'email' as the username field and the User model's authenticate method
  passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate())
  );

  // Serializes user data into the session to maintain login state
  passport.serializeUser(User.serializeUser());

  // Deserializes user data from the session to retrieve the user object on subsequent requests
  passport.deserializeUser(User.deserializeUser());
};

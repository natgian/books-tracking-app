export const isAuthenticated = (req, res, next) => {
  // Verify authentication
  if (req.session && req.session.passport && req.session.passport.user) {
    return next(); // user is authenticated, proceed to the next middleware or route
  } else {
    return res.status(401).json({
      message:
        "Nicht autorisiert. Bitte anmelden, um auf diese Ressource zuzugreifen.",
    });
  }
};

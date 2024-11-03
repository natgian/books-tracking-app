import MongoDBStore from "connect-mongo";

export const sessionConfig = (DB_URI, SECRET) => {
  // Create a session store using MongoDB, updating sessions only once every 24 hours, and encrypting session data with a secret:
  const store = MongoDBStore.create({
    mongoUrl: DB_URI,
    touchAfter: 24 * 60 * 60,
    crypto: {
      secret: SECRET,
    },
  });

  // Listening for errors on the session store:
  store.on("error", function (err) {
    console.log("SESSION STORE ERROR", err);
  });

  // Return session configuration object:
  return {
    store: store,
    name: "session",
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: true, // set to "true" for production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 12, // Sets maximum age for the cookie to 12 hours
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // Sets cookie expiration to 12 hours
    },
  };
};

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

  store.on("connect", () => console.log("MongoDB session store connected"));
  store.on("disconnect", () =>
    console.log("MongoDB session store disconnected")
  );

  // Return session configuration object:
  return {
    store: store,
    name: "session",
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reset session expiration on each request
    cookie: {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // set to "true" for production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 12, // Sets maximum age for the cookie to 12 hours
    },
  };
};

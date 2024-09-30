import { userSchema } from "./validationSchemas.js";

// VALIDATION MIDDLEWARE
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const msg = error.details[0].message;
    return res.status(400).json({ status: "error", message: msg });
  }

  next();
};

export { validateUser };

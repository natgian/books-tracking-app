import {
  userSchema,
  loginSchema,
  contactFormSchema,
} from "./validationSchemas.js";

// VALIDATION FUNCTION
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const msg = error.details[0].message;
      return res
        .status(400)
        .json({ status: "error", type: "validation", message: msg });
    }

    next();
  };
};

// EXPORT VALIDATION FUNCTIONS
export const validateUser = validateSchema(userSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateContactForm = validateSchema(contactFormSchema);

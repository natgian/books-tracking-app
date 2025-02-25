import BaseJoi from "joi";
import sanitizeHTML from "sanitize-html";

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: { "string.escapeHTML": "{{#label}} darf kein HTML enthalten." },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const cleanValue = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
          textFilter: (text) => {
            return text
              .replace(/&amp;/g, "&")
              .replace(/&eacute;/g, "é")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&apos;/g, "'")
              .replace(/&copy;/g, "©")
              .replace(/&reg;/g, "®")
              .replace(/&nbsp;/g, " ");
          },
        });
        if (cleanValue !== value) {
          return helpers.error("string.escapeHTML", { value });
        }
        return cleanValue;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(25)
    .escapeHTML()
    .messages({
      "string.base": "Benutzername muss eine Zeichenfolge sein.",
      "string.alphanum":
        "Benutzername darf nur Buchstaben und Zahlen enthalten.",
      "string.min": "Benutzername muss mindestens 2 Zeichen lang sein.",
      "string.max": "Benutzername darf nicht länger als 25 Zeichen sein.",
    })
    .required(),
  email: Joi.string()
    .email()
    .escapeHTML()
    .messages({
      "string.email": "E-Mail muss eine gültige E-Mail-Adresse sein.",
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .escapeHTML()
    .messages({
      "string.base": "Das Passwort muss eine Zeichenfolge sein.",
      "string.min": "Das Passwort muss mindestens 8 Zeichen lang sein.",
      "string.max": "Das Passwort darf nicht länger als 64 Zeichen sein.",
    })
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .escapeHTML()
    .messages({
      "string.email": "E-Mail muss eine gültige E-Mail-Adresse sein",
    })
    .required(),
  password: Joi.string()
    .escapeHTML()
    .messages({
      "string.base": "Das Passwort muss eine Zeichenfolge sein.",
    })
    .required(),
});

const contactFormSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50)
    .escapeHTML()
    .messages({
      "string.base": "Name muss eine Zeichenfolge sein.",
      "string.min": "Name muss mindestens 2 Zeichen lang sein.",
      "string.max": "Name darf nicht länger als 50 Zeichen lang sein.",
    })
    .required(),
  email: Joi.string()
    .email()
    .escapeHTML()
    .messages({
      "string.email": "E-Mail muss eine gültige E-Mail-Adresse sein.",
    })
    .required(),
  message: Joi.string()
    .min(10)
    .escapeHTML()
    .messages({
      "string.base": "Nachricht muss eine Zeichenfolge sein.",
      "string.min": "Nachricht muss mindestens 10 Zeichen lang sein.",
      "string.max": "Nachricht darf nicht länger als 500 Zeichen sein.",
    })
    .required(),
});

export { userSchema, loginSchema, contactFormSchema };

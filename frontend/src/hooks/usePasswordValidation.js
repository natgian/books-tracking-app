import { useState } from "react";

export const usePasswordValidation = (onSubmitPassword, options = {}) => {
  const { requireCurrentPassword = false } = options; // Default to false if not specified
  const [frontendErrorMessage, setFrontendErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const currentPassword = requireCurrentPassword
      ? formData.get("currentPassword")
      : null;

    // Reset any existing error messages
    setFrontendErrorMessage("");

    // Frontend validation
    if (!password || password.length < 8) {
      setFrontendErrorMessage(
        "Das Passwort muss mindestens 8 Zeichen lang sein."
      );
      console.log(
        "Password validation failed. The password must be at least 8 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setFrontendErrorMessage("Passwörter stimmen nicht überein.");
      console.log("Password validation failed. Passwords do not match.");
      return;
    }

    // Calls the unique function passed to handleSubmit for further handling
    await onSubmitPassword(currentPassword, password);
  };

  return { handleSubmit, frontendErrorMessage, setFrontendErrorMessage };
};

import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";

export const useSendContactForm = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const sendContactForm = async (email, name, message) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await backendAxiosConfig.post("/user/contact", {
        email,
        name,
        message,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error.response?.data);
      setErrorMessage(
        error.response?.data?.message ||
          "Ein Fehler ist aufgetreten. Bitte erneut versuchen."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { sendContactForm, isLoading, errorMessage, isSuccess };
};

import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";

export const useSendResetPasswordMail = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const sendResetPasswordMail = async (email) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await backendAxiosConfig.post("/user/forgotPassword", {
        email,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(
        error.response?.data?.message ||
          "Ein Fehler ist aufgetreten. Bitte erneut versuchen."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { sendResetPasswordMail, isLoading, errorMessage, isSuccess };
};

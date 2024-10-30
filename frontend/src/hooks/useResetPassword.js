import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";

export const useResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await backendAxiosConfig.post(`/user/reset/${token}`, {
        token,
        password,
      });

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setErrorMessage("Ein Fehler ist aufgetreten. Bitte erneut versuchen.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message || "Ein Fehler ist aufgetreten."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, errorMessage, resetPassword };
};

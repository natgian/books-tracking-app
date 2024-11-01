import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";

export const useChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const changePassword = async (currentPassword, password) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await backendAxiosConfig.post("/user/changePassword", {
        currentPassword,
        password,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setSuccessMessage(response.data.message);
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

  return { isLoading, isSuccess, errorMessage, successMessage, changePassword };
};

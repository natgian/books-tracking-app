import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";
import { useAuthContext } from "./useAuthContext.js";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await backendAxiosConfig.post(
        "/user/register",
        formData
      );

      const user = response.data; // Assuming the response contains user data

      dispatch({ type: "LOGIN", payload: user }); // Update auth context state, if applicable

      return { success: true, user }; // Return success state and user data
    } catch (error) {
      console.log(error.response.data);
      const errorMessage =
        error.response?.data?.error ||
        "Ein Fehler ist aufgetreten. Bitte erneut versuchen.";

      setError(errorMessage); // Set error state to display in UI

      setIsLoading(false);

      return { success: false, error: errorMessage }; // Return failure state and error message
    } finally {
      setIsLoading(false); // Always set loading to false at the end
    }
  };

  return { register, error, isLoading };
};

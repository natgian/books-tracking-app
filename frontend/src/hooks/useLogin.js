import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";
import { useAuthContext } from "./useAuthContext.js";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, fetchCurrentUser } = useAuthContext();

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await backendAxiosConfig.post("/user/login", formData);
      const user = response.data;

      // Update auth context state

      dispatch({ type: "LOGIN", payload: user });
      await fetchCurrentUser();

      return { success: true, user };
    } catch (error) {
      console.error(error.response.data);
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

  return { login, error, isLoading };
};

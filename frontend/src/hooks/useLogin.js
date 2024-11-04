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

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await backendAxiosConfig.post("/user/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      const user = response.data;

      // Update auth context state
      dispatch({ type: "LOGIN", payload: user });
      await fetchCurrentUser();

      return { success: true, user };
    } catch (error) {
      console.error(error.response.data);

      // Check if it's a validation error or login error based on type
      const errorType = error.response?.data?.type;
      const msg = error.response?.data?.message;
      console.log(msg);
      let errorMessage;

      if (errorType === "validation") {
        // If validation error, join all messages into a single string
        errorMessage = error.response?.data?.message;
      } else {
        // Default to login error message
        errorMessage =
          error.response?.data?.message ||
          "Ein Fehler ist aufgetreten. Bitte erneut versuchen.";
      }

      setError(errorMessage); // Set error state to display in UI

      return { success: false, error: errorMessage }; // Return failure state and error message
    } finally {
      setIsLoading(false); // Always set loading to false at the end
    }
  };

  return { login, error, isLoading };
};

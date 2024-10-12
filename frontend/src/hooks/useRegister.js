import { useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig.js";
import { useAuthContext } from "./useAuthContext.js";

export const useRegister = () => {
  const [backendError, setBackendError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, fetchCurrentUser } = useAuthContext();

  const register = async (newUser) => {
    setIsLoading(true);
    setBackendError(null);

    try {
      const response = await backendAxiosConfig.post("/user/register", newUser);

      const user = await response.data; // Assuming the response contains user data

      dispatch({ type: "LOGIN", payload: user }); // Update auth context state, if applicable
      await fetchCurrentUser();

      return { success: true, user }; // Return success state and user data
    } catch (error) {
      console.log(error.response.data);

      const backendErrorMessage =
        error.response?.data?.message ||
        "Ein Fehler ist aufgetreten. Bitte erneut versuchen.";

      setBackendError(backendErrorMessage); // Set error state to display in UI
      setIsLoading(false);

      return { success: false, error: backendErrorMessage }; // Return failure state and error message
    } finally {
      setIsLoading(false); // Always set loading to false at the end
    }
  };

  return { register, backendError, setBackendError, isLoading };
};

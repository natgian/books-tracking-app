import backendAxiosConfig from "../api/backendAxiosConfig.js";
import { useAuthContext } from "./useAuthContext.js";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await backendAxiosConfig.post("/user/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { logout };
};

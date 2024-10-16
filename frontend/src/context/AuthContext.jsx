import { createContext, useEffect, useReducer, useState } from "react";
import backendAxiosConfig from "../api/backendAxiosConfig";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchCurrentUser = async () => {
    try {
      const response = await backendAxiosConfig.get("/user/currentUser");

      if (response.data?.user) {
        dispatch({ type: "LOGIN", payload: response.data.user });
      }
    } catch (error) {
      console.log("Benutzer ist nicht authentifiziert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <AuthContext.Provider value={{ ...state, dispatch, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

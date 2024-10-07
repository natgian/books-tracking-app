import { createContext, useEffect, useReducer } from "react";
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await backendAxiosConfig.get("/user/currentUser");
        if (response.data.user) {
          dispatch({ type: "LOGIN", payload: response.data.user });
        }
      } catch (error) {
        console.log("Benutzer ist nicht authentifiziert");
      }
    };

    fetchCurrentUser();
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

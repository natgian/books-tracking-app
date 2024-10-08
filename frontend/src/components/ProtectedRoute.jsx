import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: "Bitte anmelden um fortzufahren" }}
        replace
      />
    );
  }

  return children;
};
export default ProtectedRoute;

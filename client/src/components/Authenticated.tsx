import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../store/userContext";

interface Props {
  children: React.ReactNode;
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const { isLogged } = useContext(UserContext);
  const location = useLocation();

  if (!isLogged) {
    return (
      <Navigate to={"/login"} state={{ redirect: location.pathname }} replace />
    );
  }

  return children;
};

export default Authenticated;

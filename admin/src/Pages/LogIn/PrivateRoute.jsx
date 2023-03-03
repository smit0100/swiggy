import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const PrivateRoute = ({ children, redirectTo }) => {
  const { isLogIn } = useStateContext();
  return isLogIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
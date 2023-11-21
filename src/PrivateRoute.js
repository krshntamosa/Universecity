import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

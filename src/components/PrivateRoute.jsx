// src/components/PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authData } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  if (!authData.token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return <Component {...rest} />;
};

export default PrivateRoute;

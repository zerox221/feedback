import React from "react";
import { Navigate } from "react-router-dom";

const PublicProtectedRoute = ({ children, user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicProtectedRoute;

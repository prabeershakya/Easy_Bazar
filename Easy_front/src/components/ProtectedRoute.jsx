import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    
    // Handle both array of roles and single role
    if (role) {
      const allowedRoles = Array.isArray(role) ? role : [role];
      if (!allowedRoles.includes(decoded.role)) {
        return <Navigate to="/unauthorized" />;
      }
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

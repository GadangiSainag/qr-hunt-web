import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/util";

// Interface for ProtectedRoute Props
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
// ProtectedRoute Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role , isLoading} = useAuth();
  console.log(isAuthenticated, "--", role);
  if(isLoading){
    return <div>loading...</div> //spinner animation later
  }
  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to={`/${role == "player" ? "team" : "admin"}/login`} />;
  }

  // If user role is not allowed, redirect to unauthorized page
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If authenticated and authorized, render the children (route element)
  // return children;
  return <Outlet />;
};

export default ProtectedRoute;

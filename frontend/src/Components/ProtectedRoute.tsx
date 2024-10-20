import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../context/util';
 
// Interface for ProtectedRoute Props
interface ProtectedRouteProps {
    allowedRoles?: string[];
    children: JSX.Element;
}
// ProtectedRoute Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({  allowedRoles, children }) => {

    const { isAuthenticated, role } = useAuth();
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      console.log(role)
      return <Navigate to={`/${role == 'player'? 'team' : 'admin'}/login`} />;
    }
  
    // If user role is not allowed, redirect to unauthorized page
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    // If authenticated and authorized, render the children (route element)
    return children;
    // return <Outlet />
  };
  
  export default ProtectedRoute;


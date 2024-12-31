import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component for route protection
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');  // Check if the token exists

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

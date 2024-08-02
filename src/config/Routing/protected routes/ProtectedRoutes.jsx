import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Usercontext } from '../../../context/UserContextProvider'; // Adjust the path as needed

const ProtectedRoutes = ({ children }) => {
  const { user, initializing } = useContext(Usercontext);

  // Handle the initializing state
  if (initializing) {
    return <div className="d-flex align-items-center justify-content-center vh-100">Loading...</div>;
  }

  // Redirect if the user is not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;

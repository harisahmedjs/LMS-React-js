import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Usercontext } from "../../../context/UserContextProvider";  // Adjust path as necessary

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(Usercontext);

  if (user) {
    return user
    
  } else{
    <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
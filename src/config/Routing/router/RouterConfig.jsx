import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../../screens/login/Login";
import Student from "../../../screens/student/Student";
import Admission from "../../../screens/admission/Admission";
import AdminDashboard from "../../../screens/admin/AdminDashboard";
import ProtectedRoutes from "../protected routes/ProtectedRoutes";
import { auth } from "../../firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

const RouterConfig = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        return;
        
      }
      setUser(null);
    });
    return () => unsubscribe(); // Clean up the subscription when the component unmounts  // ...
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/student"
          element={
            <ProtectedRoutes user={user}>
              <Student />
            </ProtectedRoutes>
          }
        />
        <Route path="/admission" element={<Admission />} />

        <Route
          path="admin/*"
          element={
            <ProtectedRoutes user={user}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;

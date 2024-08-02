import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../../screens/login/Login";
import Student from "../../../screens/student/Student";
import Admission from "../../../screens/admission/Admission";
import AdminDashboard from "../../../screens/admin/AdminDashboard";
import ProtectedRoutes from "../protected routes/ProtectedRoutes";
import UserContextProvider from "../../../context/UserContextProvider";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/student"
            element={
              <ProtectedRoutes>
                <Student />
              </ProtectedRoutes>
            }
          />
          <Route path="/admission" element={<Admission />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default RouterConfig;

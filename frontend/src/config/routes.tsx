import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Login/Dashboad/Dashboard"; // Revisa que la ruta esté bien

const AppRoutes: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />
        }
      />
      <Route 
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
  );
};

export default AppRoutes;

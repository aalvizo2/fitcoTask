import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login/Login";


const AppRoutes: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Routes>
      
      <Route
        path="/"
        element={
            isAuthenticated ? 
                <Navigate to="/dashboard" /> 
            : <Login onLogin={login} 
        />}
      />
      
    </Routes>
  );
};

export default AppRoutes;

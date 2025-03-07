import React from 'react';
import { useAuth } from '../context/AuthContext';
import AppRoutes from '../config/routes';
import Login from '../pages/Login/Login';




const AppContent: React.FC= () => {
    const {isAuthenticated, login, logout}= useAuth();

    if(!isAuthenticated || !localStorage.getItem("username")){
        return(
            <Login onLogin={login} />
        )
    }else{
        return(
            <div
            >

            </div>
        )
    }
};

export default AppContent;
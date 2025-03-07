import React from 'react';
import { useAuth } from '../context/AuthContext';
import AppRoutes from '../config/routes';
import Login from '../pages/Login/Login';
import Navbar from './Navbar/Navbar';




const AppContent: React.FC= () => {
    const {isAuthenticated, login, logout}= useAuth();

    if(!isAuthenticated || !localStorage.getItem("username")){
        return(
            <Login onLogin={login} />
        )
    }else{
        return(
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
              }}
            >
              <div style={{ flexShrink: 0, width: '100%'}}>
                <Navbar onLogout={logout} />
              </div>

              <div>
                <AppRoutes />
              </div>
            </div>
        )
    }
};

export default AppContent;
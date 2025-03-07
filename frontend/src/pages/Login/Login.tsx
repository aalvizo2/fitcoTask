import React from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps{
    onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps>= ({onLogin}) =>{
    return (
        <>
           Hola desde login
        
        </>
    )
};


export default Login;
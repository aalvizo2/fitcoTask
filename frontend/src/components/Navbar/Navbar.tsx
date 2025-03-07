import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface LoginProps {
    onLogout: () => void;
}

const Navbar: React.FC<LoginProps> = ({ onLogout }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getUsername = () => {
            const token = localStorage.getItem("token");
            if (token) { 
                try {
                    const decodedToken: any = jwtDecode(token);
                    console.log('token decodificado', decodedToken)
                    setUsername(decodedToken.Username || "Usuario");
                    localStorage.setItem('username', username)
                    setEmail(decodedToken.Email || "Sin email");
                } catch (error) {
                    console.error("Error al decodificar el token:", error);
                }
            }
        };

        getUsername();
    }, []);

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra suave
                padding: "15px",
                borderRadius: "8px", // Bordes redondeados para mejor estética
            }}

        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <span><b>{username}</b></span>
                <span>{email}</span>
            </div>

            <div>
                <button onClick={onLogout}>Cerrar Sesión</button>
            </div>

        </nav>
    );
};

export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthRepositoryImpl } from "../../domain/repositories/AuthRepositoryImpl";
import { AuthUseCases } from "../../core/useCases/AuthUseCases";
import { AuthInterface } from "../../domain/entities/Auth";
import './Login.css'

const authRepository= new AuthRepositoryImpl();
const authUseCases= new AuthUseCases(authRepository);


interface LoginProps {
    onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [form] = Form.useForm();
    const [error, setError]= useState('');
    const navigate= useNavigate();


    const handleSubmit= async(newData: AuthInterface) => {
        try{
            const response= await authUseCases.login(newData);
            console.log(response)
            //@ts-expect-error
            const token= response.token;
            localStorage.setItem("token", token);

            onLogin(newData.Username)

        }catch(error: any){
            console.error("Error de autenticación", error);
            setError(error.message)
        }
    }
    

    return (
        <>
             <div className="container">
            <div className="form-container">
                <h2>Iniciar Sesión</h2>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="Username"
                        rules={[{ required: true, message: "Ingresa un Usuario" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true, message: "Ingresa una contraseña" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                    </Form.Item>
                    <Button htmlType="submit">Ingresar</Button>
                </Form>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>
        </div>

        </>
    )
};


export default Login;
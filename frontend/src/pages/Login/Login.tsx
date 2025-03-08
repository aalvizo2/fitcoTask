import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { AuthRepositoryImpl } from "../../domain/repositories/AuthRepositoryImpl";
import { AuthUseCases } from "../../core/useCases/AuthUseCases";
import { AuthInterface } from "../../domain/entities/Auth";
import "./Login.css";
import { UserRepositoryImpl } from "../../domain/repositories/UserRepositoryImpl";
import { UserUseCases } from "../../core/useCases/UserUseCases";
import { newUser } from "../../domain/entities/User";

const authRepository = new AuthRepositoryImpl();
const authUseCases = new AuthUseCases(authRepository);

const userRepository = new UserRepositoryImpl();
const userUseCases = new UserUseCases(userRepository);

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("1"); 
  const navigate = useNavigate();
  const [registerForm]= Form.useForm();

  const handleSubmit = async (newData: AuthInterface) => {
    try {
      console.log("datos a enviar", newData);
      const response = await authUseCases.login(newData);
      console.log(response);
      //@ts-expect-error
      const token = response.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
      onLogin(newData.Username);
    } catch (error: any) {
      console.error("Error de autenticación", error);
      setError("Error de autenticación");
    }
  };

  const handleRegister = async (values: newUser) => {
    try {
      const response = await userUseCases.newUser(values);
      console.log(response);
      if (response) {
        message.success("Operación realizada con éxito");
        setActiveTab("1"); 
      }
    } catch (error: any) {
      console.error("Error al crear un usuario", error);
      setError("Error al crear un usuario");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Iniciar Sesión o Registrar</h2>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* Login Tab */}
          <Tabs.TabPane tab="Iniciar Sesión" key="1">
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
          </Tabs.TabPane>

          {/* Register Tab */}
          <Tabs.TabPane tab="Registrar" key="2">
            <Form form={registerForm} onFinish={handleRegister}>
              <Form.Item
                name="Name"
                rules={[{ required: true, message: "Ingresa tu nombre" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre" />
              </Form.Item>

              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: "Ingresa un correo electrónico" },
                  { type: "email", message: "Correo electrónico no válido" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" />
              </Form.Item>

              <Form.Item
                name="Password"
                rules={[{ required: true, message: "Ingresa una contraseña" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
              </Form.Item>

              <Form.Item
                name="ConfirmPassword"
                dependencies={["Password"]}
                rules={[
                  { required: true, message: "Confirma tu contraseña" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("Password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Las contraseñas no coinciden!"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Repetir Contraseña" />
              </Form.Item>

              <Button htmlType="submit">Registrar</Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;

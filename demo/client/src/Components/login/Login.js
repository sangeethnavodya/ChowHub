import { Button, Form, Input, Space, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; // import CSS file
import { useState, useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const name = localStorage.getItem('name');
        console.log(userId);
        if (userId) {
            setIsLoggedIn(true);
            navigate('/home');
        }
    }, [navigate]);

    const onFinish = (values) => {
        console.log("Success:", values);
        const data = {
            email: values.email,
            password: values.password,
        };
        axios
            .post("http://localhost:8080/login", data)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("userEmail", response.data.email);
                localStorage.setItem("name", response.data.name);
                navigate("/home", { replace: true });
            })
            .catch((error) => {
                console.log("Login Failed");
                console.error(error);
                setErrorMessage('Incorrect email or password.');
                message.error('Incorrect email or password.');
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                style={{ maxWidth: 600, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
            >
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%", padding: "24px" }}
                >
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ paddingRight: "24px" }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                    type: "email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Login
                            </Button>
                            <div style={{ marginTop: "16px", textAlign: "center" }} onClick={() => navigate('/signup', { replace: true })}>
                                Don't have an account? <a href="#">Sign up</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Login;


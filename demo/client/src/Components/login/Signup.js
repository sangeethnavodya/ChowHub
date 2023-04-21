import { Button, Form, Input, Space, Card, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        console.log('Success:', values);
        const data = {
            "name": values.name,
            "email":values.email,
            "password":values.password,
        }
        axios.post('http://localhost:8080/user/save',data)
            .then(response => {
                console.log(response.data);
                message.success('Signup Successful');
                navigate('/', { replace: true });
            })
            .then(
                () => {navigate('/', { replace: true });}
            )
            .catch(error => {
                console.log("Signup Failed");
                console.error(error);
                message.error('Signup Failed');
            })
            .finally(() => setLoading(false));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ maxWidth: 600, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ paddingRight: '24px' }}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
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
                                Sign Up
                            </Button>
                            <div style={{ marginTop: "16px", textAlign: "center" }} onClick={() => navigate('/', { replace: true })}>
                                Already member? <a href="#">Log in</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Signup;

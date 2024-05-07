import { LockOutlined, UserOutlined, SmileOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../component/api/axios";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/login', values);

      if (response.data.status === "success") {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        notification.open({
          message: 'Welcome ' + response.data.user.name + '!',
          icon: (
            <SmileOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
        });
        if(response.data.user.role === 'admin') {
          navigate("/admin/services");
        } else
          navigate("/services");
      } else {
        navigate("/login");
        notification.open({
          message: 'The Email or Password is Incorrect',
          icon: (
            <CloseOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
    <div className="w-full max-w-xl px-12 py-10 bg-white shadow-2xl rounded-xl"> 
      <Typography.Title level={4} className="text-center text-gray-800 text-3xl mb-8"> 
        Welcome to our service! 👋🏻
      </Typography.Title>
      <Form
        name="normal_login"
        onFinish={onFinish}
        className="space-y-6" // Increased space
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" size="large"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large" // Adjusted input size
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full h-12 text-lg py-3 bg-blue-500 hover:bg-blue-500"> {/* Adjusted button size */}
            LOGIN
          </Button>
        </Form.Item>
        <div className="text-center text-base"> 
          Or <a href="/register" className="text-blue-500 hover:text-blue-800">register now!</a>
        </div>
      </Form>
    </div>
  </div>
  );
};

export default Login;

import React from "react";
import { Row, Col, Avatar, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./auth.css";
import { Link } from "react-router-dom";
const Auth = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="auth">
      <Row gutter={40}>
        <Col span={8} className="auth-left">
          <Avatar src="/assets/userimg.jpg" alt="Alisher Saidov" size={112} />

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h1>Tizimga kirish</h1>
            <Form.Item name="username">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Login yoki email"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Parol"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Kirish
              </Button>
              <Link to="" className="login-form-forgot">
                Parolni tiklash
              </Link>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16} className="auth-right"></Col>
      </Row>
    </div>
  );
};

export default Auth;

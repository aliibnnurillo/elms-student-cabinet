import React from "react";
import { Row, Col, Avatar, Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./auth.css";
const Auth = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="auth">
      <Row gutter={40}>
        <Col span={8} className="auth-left">
          <Avatar
            src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
            alt="Alisher Saidov"
            size={112}
          />

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
              <a className="login-form-forgot" href="">
                Parolni tiklash
              </a>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16} className="auth-right"></Col>
      </Row>
    </div>
  );
};

export default Auth;
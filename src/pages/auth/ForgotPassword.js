import React from "react";
import { Form, Avatar, Input, Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  return (
    <div className="auth  auth-page">
      <Row gutter={40}>
        <Col span={7} className="auth-left">
          <Avatar src="/assets/userimg.jpg" alt="Alisher Saidov" size={112} />

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <h1>Parolni qayta tiklash</h1>
            <Form.Item name="username">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Login yoki email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Tiklash
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={17} className="auth-right"></Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;

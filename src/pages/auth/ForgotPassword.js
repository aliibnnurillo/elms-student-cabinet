import React from "react";
import { Form, Avatar, Input, Row, Col, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  return (
    <div className="auth">
      <Row gutter={40}>
        <Col span={7} className="auth-left">
          <Avatar
            src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
            alt="Alisher Saidov"
            size={112}
          />

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

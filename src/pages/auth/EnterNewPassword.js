import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

const EnterNewPassword = () => {
  return (
    <div className="enter-email  auth-page">
      <Row>
        <Col span={6} offset={9}>
          <div className="new-email">
            <div className="icons">
              <LockOutlined />
            </div>
            <p>Iltimos yangi parol kiriting</p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item name="username">
                <Input
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Parol kiriting"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Davom etish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EnterNewPassword;

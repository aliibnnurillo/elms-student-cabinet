import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";

const EnterNewEmails = () => {
  return (
    <div className="empty-page enter-email">
      <Row>
        <Col span={6} offset={9}>
          <div className="new-email">
            <div className="icons">
              <MailOutlined />
            </div>
            <p>
              Parolni tiklash imkoni bo’lishi uchun, iltiomos email
              manzilingizni kiriting
            </p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item name="username">
                <Input
                  type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email kiriting"
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

export default inject("authStore")(observer(EnterNewEmails));

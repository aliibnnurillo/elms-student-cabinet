import React from "react";
import { Form, Avatar, Input, Row, Col, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./auth.css";
const CreatePassword = () => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="auth  authempty-page">
        <Row gutter={40}>
          <Col
            span={24}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 9 }}
            className="auth-left"
          >
            <Avatar src="/assets/userimg.jpg" alt="Alisher Saidov" size={112} />

            <Form name="normal_login" className="login-form">
              <h1>{t("Yangi parol")}</h1>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t("Parol o’ylab toping")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  {t("Saqlash")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 15 }} className="auth-right"></Col>
        </Row>
      </div>
    </div>
  );
};

export default CreatePassword;

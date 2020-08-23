import React from "react";
import { Form, Avatar, Input, Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [t] = useTranslation();
  return (
    <div className="auth  empty-page">
      <Row gutter={40}>
        <Col span={24} sm={{ span: 12 }} lg={{ span: 7 }} className="auth-left">
          <Avatar src="/assets/userimg.jpg" alt="Alisher Saidov" size={112} />

            <Form name="normal_login" className="login-form">
              <h1>{t("Parolni qayta tiklash")}</h1>
              <Form.Item name="username">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t("Login yoki email")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                  href="reset-password"
                >
                  {t("Tiklash")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col
          span={24}
          sm={{ span: 24 }}
          lg={{ span: 17 }}
          className="auth-right"
        ></Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;

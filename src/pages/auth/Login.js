import React from "react";
import { Row, Col, Avatar, Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./auth.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const Login = ({ authStore: { login, getProfileInfo, loading }, history }) => {
  const onFinish = (values) => {
    login(values).then((res) => {
      if (res.status !== 200) return;
      if (res.first_time_login) {
        history.push("/user/new-email");
      } else {
        history.push("/");
      }
    });
  };
  const [t] = useTranslation();
  return (
    <div className="auth empty-page">
      <Spin spinning={loading}>
        <Row gutter={40}>
          <Col span={8} className="auth-left">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <h1>{t("Tizimga kirish")}</h1>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t("Username is required!") },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t("Login yoki email")}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: t("Password is required!") },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t("Parol")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                  loading={loading}
                >
                  {t("Kirish")}
                </Button>
                <Link to="/user/forgot-password" className="login-form-forgot">
                  {t("Parolni tiklash")}
                </Link>
              </Form.Item>
            </Form>
          </Col>
          <Col span={16} className="auth-right"></Col>
        </Row>
      </Spin>
    </div>
  );
};

export default inject("authStore")(observer(Login));

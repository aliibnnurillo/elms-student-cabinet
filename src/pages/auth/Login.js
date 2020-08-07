import React from "react";
import { Row, Col, Avatar, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./auth.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

const Login = ({ authStore: { login, getProfileInfo }, history }) => {
  const onFinish = (values) => {
    login(values).then((res) => {
      if (res.status !== 200) return;
      getProfileInfo();
      const {
        data: { result },
      } = res;
      if (result.first_time_login) {
        history.push("/user/new-email");
      } else {
        history.push("/");
      }
    });
  };
  return (
    <div className="auth empty-page">
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
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Login yoki email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
            >
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
              <Link to="/user/forgot-password" className="login-form-forgot">
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

export default inject("authStore")(observer(Login));

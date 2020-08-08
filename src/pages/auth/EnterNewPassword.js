import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const EnterNewPassword = ({ authStore: { saveNewPassword }, history }) => {
  const formFinish = (values) => {
    saveNewPassword(values).then((res) => {
      if (res.status !== 200) return;
      history.push("/user/new-avatar");
    });
  };
  const [t] = useTranslation();
  return (
    <div className="enter-email  empty-page">
      <Row>
        <Col span={6} offset={9}>
          <div className="new-email">
            <div className="icons">
              <LockOutlined />
            </div>
            <p>Iltimos yangi parol kiriting</p>
            <Form
              onFinish={formFinish}
              name="normal_login"
              className="login-form"
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    min: 8,
                    message: t(
                      "Password length must be more than 8 characters!"
                    ),
                  },
                ]}
              >
                <Input.Password
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

export default inject("authStore")(observer(EnterNewPassword));

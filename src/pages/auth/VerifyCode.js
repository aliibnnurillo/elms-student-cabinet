import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const VerifyCode = ({ authStore: { verifyCode }, history }) => {
  const formFinish = (values) => {
    verifyCode(values).then((res) => {
      if (res.status !== 200) return;
      history.push("/user/login");
    });
  };
  const [t] = useTranslation();
  return (
    <div className="enter-email empty-page">
      <Row>
        <Col
          span={20}
          offset={2}
          sm={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
        >
          <div className="new-email">
            <div className="icons">
              <LockOutlined />
            </div>
            <p>Iltimos emialingizga yuborilgan kodni kiriting</p>
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
                    min: 6,
                    message: t(
                      "Password length must be more than 8 characters!"
                    ),
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Kodni kiriting"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  {t("Tasdiqlash")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default inject("authStore")(observer(VerifyCode));

import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const EnterNewEmails = ({ authStore: { saveNewEmail }, history }) => {
  const [form] = Form.useForm();
  const formFinish = (values) => {
    saveNewEmail(values, form).then((res) => {
      if (res.status !== 200) return;
      history.push("/user/new-password");
    });
  };
  const [t] = useTranslation();
  return (
    <div className="empty-page enter-email">
      <Row>
        <Col
          span={20}
          offset={2}
          sm={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
        >
          <div className="new-email">
            <div className="icons">
              <MailOutlined />
            </div>
            <p>
              {t(
                "Parolni tiklash imkoni bo’lishi uchun, iltiomos email manzilingizni kiriting"
              )}
            </p>
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              onFinish={formFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t("Emailni kiritish shart!"),
                  },
                ]}
              >
                <Input
                  type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder={t("Email kiriting")}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  {t("Davom etish")}
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

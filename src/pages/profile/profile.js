import React, { useState } from "react";
import { ProfileHeader } from "../../component/header";
import { Row, Col, List, Modal, Button, Form, Input } from "antd";
import {
  EditFilled,
  MailOutlined,
  MobileOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./profile.css";
import OperationForm from "./form";
import { observer, inject } from "mobx-react";
import { object } from "prop-types";
import { isExistUser, getUser } from "../../common/utils/utils";
import { useTranslation } from "react-i18next";

const data = [
  {
    title: "Passport raqami",
    description: "AA5237421",
  },
  {
    title: "F.I.O",
    description: "Berdiyev Jamshidbek Dilshod o’g’li",
  },
  {
    title: "Tug’ilgan sanasi",
    description: "12.04.1999",
  },
  {
    title: "Jinsi",
    description: "Erkak",
  },
  {
    title: "Millati",
    description: "O’zbek",
  },
  {
    title: "Fuqarolik",
    description: "O’zbekiston Respublikasi",
  },
  {
    title: "Username",
    description: "Username",
    icon: <EditFilled />,
    for: "username",
  },

  {
    title: "Telefon raqami",
    description: "+998 99 042 51 84",
    icon: <EditFilled />,
    for: "phone",
  },
  {
    title: "Email",
    description: "berdiyev.j.1999@gmail.com",
    icon: <EditFilled />,
    for: "email",
  },
  {
    title: "Turar joyi",
    description: "Toshkent shaxar, Chilonzor tumani, 7 daha, 5 uy, 22 kv",
  },
];

function ProfilePage(props) {
  const [visiblePhone, setVisiblePhone] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visibleUsername, setVisibleUsername] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    profile: { changeEmail, changePassword, uploadAvatar, changeUsername },
  } = props;
  const currentUser = isExistUser() ? getUser() : {};
  console.log(currentUser);

  const setModalPasswordVisible = (visiblePassword) => {
    setVisiblePassword(visiblePassword);
  };

  const setModalEmailVisible = (visibleEmail) => {
    setVisibleEmail(visibleEmail);
  };

  const setModalUsernameVisible = (visibleUsername) => {
    setVisibleUsername(visibleUsername);
  };

  const setModalPhoneVisible = (visiblePhone) => {
    setVisiblePhone(visiblePhone);
  };

  const modal_password = () => {
    const [form] = Form.useForm();

    return (
      <>
        <Button
          className="for-password-modal-button"
          type="primary"
          onClick={() => setModalPasswordVisible(true)}
        >
          Parolni yangilash
        </Button>

        <Modal
          title={<p>Parolni yangilash</p>}
          centered
          visible={visiblePassword}
          onOk={() => setModalPasswordVisible(false)}
          onCancel={() => setModalPasswordVisible(false)}
          className="modal-for-edit"
        >
          <Form
            form={form}
            layout="vertical"
            name="userForm"
            onFinish={finishChangePassword}
          >
            <Form.Item name="oldPassword">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Eski parol"
                type="password"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Yangi parol"
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" htmlType="submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_email = (icons) => {
    const [form] = Form.useForm();
    return (
      <>
        <span className="for-icon" onClick={() => setModalEmailVisible(true)}>
          {icons}
        </span>
        <Modal
          title={<p>Elektron pochtani yangilash</p>}
          centered
          visible={visibleEmail}
          onCancel={() => setModalEmailVisible(false)}
          className="modal-for-edit"
        >
          <Form layout="vertical" name="userForm" onFinish={finishChangeEmail}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter new email"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="button-submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_username = (icons) => {
    const [form] = Form.useForm();
    return (
      <>
        <span
          className="for-icon"
          onClick={() => setModalUsernameVisible(true)}
        >
          {icons}
        </span>
        <Modal
          title={<p>Foydalanuvchi nomini yangilash</p>}
          centered
          visible={visibleUsername}
          onCancel={() => setModalUsernameVisible(false)}
          className="modal-for-edit"
        >
          <Form
            layout="vertical"
            name="userForm"
            onFinish={finishChangeUsername}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Enter new Username"
                defaultValue={currentUser.username}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="button-submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_phone = (icons) => {
    const [form] = Form.useForm();

    return (
      <>
        <span className="for-icon" onClick={() => setModalPhoneVisible(true)}>
          {icons}
        </span>
        <Modal
          title={<p>Telefon raqamini yangilash</p>}
          centered
          visible={visiblePhone}
          onOk={() => setModalPhoneVisible(false)}
          onCancel={() => setModalPhoneVisible(false)}
          className="modal-for-edit"
        >
          <Form form={form} layout="vertical" name="userForm">
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone number!" },
              ]}
            >
              <Input
                prefix={<MobileOutlined className="site-form-item-icon" />}
                placeholder="Enter new phone number"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" htmlType="submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const finishChangePassword = (values) => {
    changePassword(values).then(() => {});
  };

  const finishChangeUsername = (values) => {
    changeUsername(values).then(() => {});
  };

  const finishChangeEmail = (values) => {
    changeEmail(values).then(() => {});
  };

  return (
    <>
      <ProfileHeader />
      <div className="content profile_page">
        {modal_password()}
        <Row className="profil_row" gutter={[24, 40]}>
          <Col
            span={24}
            sm={{ span: 24 }}
            md={{ span: 16 }}
            className="forAvatars"
          >
            <span>
              <OperationForm onUploadFinish={uploadAvatar} />
            </span>
          </Col>
          <Col span={24} sm={{ span: 24 }} md={{ span: 16 }}>
            <div className="all-list">
              {data.map((item) => (
                <div>
                  <List itemLayout="horizontal" className="lists">
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        description={
                          <p>
                            <span>{item.description}</span>

                            {item.icon && item.for === "phone"
                              ? modal_phone(item.icon)
                              : null}
                            {item.icon && item.for === "email"
                              ? modal_email(item.icon)
                              : null}
                            {item.icon && item.for === "username"
                              ? modal_username(item.icon)
                              : null}
                          </p>
                        }
                      />
                    </List.Item>
                  </List>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  profile: object,
};

export default inject("profile")(observer(ProfilePage));

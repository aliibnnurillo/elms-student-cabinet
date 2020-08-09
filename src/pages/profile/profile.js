import React, { useState } from "react";
import { ProfileHeader } from "../../component/header";
import {
  Row,
  Col,
  List,
  Avatar,
  Modal,
  Button,
  InputNumber,
  Form,
  Input,
} from "antd";
import {
  EditFilled,
  CameraFilled,
  MailOutlined,
  MobileOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./profile.css";

const data = [
  {
    title: "Passport raqami",
    description: "AA5237421",
  },
  {
    title: "Telefon raqami",
    description: "+998 99 042 51 84",
    icon: <EditFilled />,
    for: "phone",
  },
  {
    title: "F.I.O",
    description: "Berdiyev Jamshidbek Dilshod o’g’li",
  },
  {
    title: "Email",
    description: "berdiyev.j.1999@gmail.com",
    icon: <EditFilled />,
    for: "email",
  },
  {
    title: "Tug’ilgan sanasi",
    description: "12.04.1999",
  },
  {
    title: "Turar joyi",
    description: "Toshkent shaxar, Chilonzor tumani, 7 daha, 5 uy, 22 kv",
  },
  {
    title: "Jinsi",
    description: "Erkak",
  },
  {
    title: "Fuqarolik",
    description: "O’zbekiston Respublikasi",
  },
  {
    title: "Millati",
    description: "O’zbek",
  },
];

const ProfilePage = () => {
  const [visiblePhone, setVisiblePhone] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const setModalEmailVisible = (visibleEmail) => {
    setVisibleEmail(visibleEmail);
  };
  const setModalPhoneVisible = (visiblePhone) => {
    setVisiblePhone(visiblePhone);
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
          <Form form={form} layout="vertical" name="userForm">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter new email"
                defaultValue="defelop@gmail.com"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" type="submit">
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
                defaultValue="+998 90 354 26 67"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" type="submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  const setModalPasswordVisible = (visiblePassword) => {
    setVisiblePassword(visiblePassword);
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
          <Form form={form} layout="vertical" name="userForm">
            <Form.Item
              name="old-password"
              rules={[{ required: true, message: "Please enter Password" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Eski parol"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="new-password"
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
              <Button className="button-submit" type="submit">
                Yangilash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  return (
    <>
      <ProfileHeader />
      <div className="content profile_page">
        {modal_password()}
        <Row className="profil_row" gutter={[24, 40]}>
          <Col span={16} className="forAvatars">
            <span>
              <Avatar
                className="img-avatars user-icon"
                size={100}
                src="/assets/userimg.jpg"
              />
              <span className="for-avatar-icon">
                <CameraFilled />
              </span>
            </span>
          </Col>
          <Col span={16}>
            <Row gutter={[30, 15]}>
              {data.map((item) => (
                <Col span={12}>
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
                          </p>
                        }
                      />
                    </List.Item>
                  </List>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;

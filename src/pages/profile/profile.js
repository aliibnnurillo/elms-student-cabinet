import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../../component/header";
import { Row, Col, List, Modal, Button, Form, Input, Spin } from "antd";
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
import {
  isExistUser,
  getUser,
  getLongFullName,
} from "../../common/utils/utils";
import { useTranslation } from "react-i18next";
import { DATE_FORMATS } from "../../constants";
import moment from "moment";
import profile from "./model";

function ProfilePage(props) {
  const [visiblePhone, setVisiblePhone] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visibleUsername, setVisibleUsername] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    profile: {
      changeEmail,
      changePassword,
      uploadAvatar,
      changeUsername,
      fetchProfile,
      loading,
    },
  } = props;
  const currentUser = isExistUser() ? getUser() : {};
  console.log(currentUser);

  const {
    authStore: { reloadProfileInfo },
  } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchProfile().then(() => {
      const { profile } = props.profile;
      setData([
        {
          title: t("Passport raqami"),
          description: profile.passport,
        },
        {
          title: t("F.I.O"),
          description: getLongFullName(profile),
        },
        {
          title: t("Tug’ilgan sanasi"),
          description: profile.birth_date
            ? moment(profile.birth_date).format(DATE_FORMATS.DMY_D)
            : null,
        },
        {
          title: t("Jinsi"),
          description: profile.gender,
        },
        {
          title: t("Millati"),
          description: profile.nation_name,
        },
        {
          title: t("Fuqarolik"),
          description: profile.citizenship_name,
        },
        {
          title: t("Username"),
          description: profile.username,
          icon: <EditFilled />,
          for: "username",
        },

        {
          title: t("Telefon raqami"),
          description: profile.phone ? profile.phone : null,
          icon: <EditFilled />,
          for: "phone",
        },
        {
          title: t("Email"),
          description: profile.email,
          icon: <EditFilled />,
          for: "email",
        },
        {
          title: t("Turar joyi"),
          description: `${profile.province_name} ${profile.city_name} ${profile.street}`,
        },
      ]);
    });
  }, []);

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

  const [t] = useTranslation();

  const modal_password = () => {
    return (
      <>
        <Button
          className="for-password-modal-button"
          type="primary"
          onClick={() => setModalPasswordVisible(true)}
        >
          {t("Parolni yangilash")}
        </Button>

        <Modal
          title={<p>{t("Parolni yangilash")}</p>}
          centered
          visible={visiblePassword}
          onOk={() => setModalPasswordVisible(false)}
          onCancel={() => setModalPasswordVisible(false)}
          className="modal-for-edit"
        >
          <Form
            layout="vertical"
            name="userForm"
            onFinish={finishChangePassword}
          >
            <Form.Item name="oldPassword">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("Eski parol")}
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
                placeholder={t("Yangi parol")}
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" htmlType="submit">
                {t("Yangilash")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_email = (icons) => {
    return (
      <>
        <span className="for-icon" onClick={() => setModalEmailVisible(true)}>
          {icons}
        </span>
        <Modal
          title={<p>{t("Elektron pochtani yangilash")}</p>}
          centered
          visible={visibleEmail}
          onCancel={() => setModalEmailVisible(false)}
          className="modal-for-edit"
        >
          <Form layout="vertical" name="userForm" onFinish={finishChangeEmail}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("Please input your email!") },
                { type: "email", message: t("Enter valid email!") },
              ]}
              initialValue={isExistUser() ? getUser().email : ""}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder={t("Enter new email")}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="button-submit">
                {t("Yangilash")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_username = (icons) => {
    return (
      <>
        <span
          className="for-icon"
          onClick={() => setModalUsernameVisible(true)}
        >
          {icons}
        </span>
        <Modal
          title={<p>{t("Foydalanuvchi nomini yangilash")}</p>}
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
                { required: true, message: t("Please input your username!") },
              ]}
              initialValue={isExistUser() ? getUser().username : ""}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("Enter new username")}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="button-submit">
                {t("Yangilash")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const modal_phone = (icons) => {
    return (
      <>
        <span className="for-icon" onClick={() => setModalPhoneVisible(true)}>
          {icons}
        </span>
        <Modal
          title={<p>{t("Telefon raqamini yangilash")}</p>}
          centered
          visible={visiblePhone}
          onOk={() => setModalPhoneVisible(false)}
          onCancel={() => setModalPhoneVisible(false)}
          className="modal-for-edit"
        >
          <Form layout="vertical" name="userForm">
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: t("Please input your phone number!"),
                },
              ]}
              initialValue={isExistUser() ? getUser().phone : ""}
            >
              <Input
                prefix={<MobileOutlined className="site-form-item-icon" />}
                placeholder={t("Enter new phone number")}
              />
            </Form.Item>
            <Form.Item>
              <Button className="button-submit" htmlType="submit">
                {t("Yangilash")}
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
        <Spin spinning={loading}>
          {modal_password()}
          <Row className="profil_row" gutter={[24, 40]}>
            <Col
              span={24}
              sm={{ span: 24 }}
              md={{ span: 16 }}
              className="forAvatars"
            >
              <span>
                <OperationForm
                  onUploadFinish={uploadAvatar}
                  reloadProfileInfo={reloadProfileInfo}
                />
              </span>
            </Col>
            <Col span={24} sm={{ span: 24 }} md={{ span: 16 }}>
              <div className="all-list">
                {data.map((item, idx) => (
                  <div key={idx}>
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
        </Spin>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  profile: object,
};

export default inject("profile", "authStore")(observer(ProfilePage));

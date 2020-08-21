import React from "react";
import { Avatar, Popover, List, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { getUser, isExistUser } from "../../common/utils/utils";

const LoginList = ({ authStore: { logout, user }, history }) => {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    history.push("/user/login");
  };

  const currentUser = user || isExistUser() ? getUser() : {};

  const [t] = useTranslation();
  return (
    <Popover
      placement="bottomRight"
      content={
        <List
          footer={
            <Link to="" onClick={onLogout}>
              <LogoutOutlined />
              <span>{t("Logout")}</span>
            </Link>
          }
        >
          <List.Item>
            <Link to="/profile">
              <UserOutlined />
              <span>{t("Profile")}</span>
            </Link>
          </List.Item>
          <List.Item>
            <Link to="">
              <SettingOutlined />
              <span>{t("Settings")}</span>
            </Link>
          </List.Item>
        </List>
      }
      trigger="click"
      overlayClassName="loginList-class"
    >
      {currentUser.photo ? (
        <Avatar
          size={40}
          className="img-avatars user-icon"
          src={currentUser.photo}
          alt="avatar"
        />
      ) : (
        <Avatar
          size={40}
          className="img-avatars user-icon"
          style={{
            background:
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
          }}
        />
      )}
    </Popover>
  );
};

export default inject("authStore")(observer(withRouter(LoginList)));

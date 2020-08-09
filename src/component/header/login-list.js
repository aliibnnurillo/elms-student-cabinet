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

const LoginList = ({ imgUrl, authStore: { logout }, history }) => {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    history.push("/user/login");
  };
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
      <Avatar className="img-avatars user-icon" size={40} src={imgUrl} />
    </Popover>
  );
};

export default inject("authStore")(observer(withRouter(LoginList)));

import React, { useEffect, useState } from "react";
import { Avatar, Popover, List } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  extractFirstCharacter,
  isExistUser,
  getUser,
} from "../../common/utils/utils";

const LoginList = ({ authStore: { logout, user }, history }) => {
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
        </List>
      }
      trigger="click"
      overlayClassName="loginList-class"
    >
      {isExistUser() && getUser().avatar ? (
        <Avatar
          size={40}
          className="img-avatars user-icon"
          src={getUser().avatar}
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
        >
          {isExistUser() && getUser().username
            ? extractFirstCharacter(getUser().username).toUpperCase()
            : "U"}
        </Avatar>
      )}
    </Popover>
  );
};

export default inject("authStore")(observer(withRouter(LoginList)));

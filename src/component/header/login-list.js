import React from "react";
import { Avatar, Popover, List, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";

const LoginList = ({ imgUrl, authStore: { logout }, history }) => {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    history.push("/user/login");
  };
  return (
    <Popover
      placement="bottomRight"
      content={
        <List
          footer={
            <Link to="" onClick={onLogout}>
              <LogoutOutlined />
              <span>Logout</span>
            </Link>
          }
        >
          <List.Item>
            <Link to="">
              <UserOutlined />
              <span>Profile</span>
            </Link>
          </List.Item>
          <List.Item>
            <Link to="">
              <SettingOutlined />
              <span>Settings</span>
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

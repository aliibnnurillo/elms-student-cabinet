import React from "react";
import { Avatar, Popover, List, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const LoginList = ({ imgUrl }) => {
  return (
    <Popover
      placement="bottomRight"
      content={
        <List
          footer={
            <Link to="">
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

export default LoginList;

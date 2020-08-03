import React from "react";
import { Menu, Avatar } from "antd";
import { Link, NavLink } from "react-router-dom";
import "./menu.css";

import {
  HomeOutlined,
  BankOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const LeftMenue = () => {
  return (
    <div className="menu-container">
      <Menu className="left-menu" mode="inline">
        <Avatar size={64} src="/assets/logo.png" className="avatars" />
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Bosh sahifa</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />}>
          <Link to="/curicul">O'quv rejasi</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/subjects">Fanlar</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ScheduleOutlined />}>
          <Link to="/exam">Imtixonlar jadvali</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<BookOutlined />}>
          <Link to="/ranting">Reyting daftarchsi</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ProfileOutlined />}>
          <Link to="/news">Yangiliklar va elonlar</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftMenue;

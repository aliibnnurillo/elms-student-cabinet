import React from "react";
import { Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BankOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./menu.css";

const LeftMenue = () => {
  return (
    <div className="menu-container">
      <Avatar size={64} src="/assets/logo.png" className="avatars" />
      <Menu className="left-menu" mode="inline">
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
            <span>Bosh sahifa</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="curriculum">
          <Link to="/curriculum">
            <BankOutlined />
            <span>O'quv rejasi</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="subjects">
          <Link to="/subjects">
            <ReadOutlined />
            <span>Fanlar</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="exam">
          <Link to="/exam">
            <ScheduleOutlined />
            <span>Imtixonlar jadvali</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="rating">
          <Link to="/rating">
            <BookOutlined />
            <span>Reyting daftarchsi</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="news">
          <Link to="/news">
            <ProfileOutlined />
            <span>Yangiliklar va elonlar</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftMenue;

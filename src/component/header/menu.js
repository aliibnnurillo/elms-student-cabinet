import React, { useState } from "react";
import { Menu, Avatar } from "antd";
import {
  HomeOutlined,
  BankOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ACTIVE_MENU_KEY } from "../../constants";

const LeftMenue = () => {
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem(ACTIVE_MENU_KEY)
      ? [localStorage.getItem(ACTIVE_MENU_KEY)]
      : []
  );

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem(ACTIVE_MENU_KEY, key);
  };

  const [t] = useTranslation();
  return (
    <div className="menu-container">
      <Avatar size={64} src="/assets/logo.png" className="avatars" />
      <Menu
        className="left-menu"
        selectedKeys={selectedKey}
        mode="inline"
        onSelect={handleSelect}
      >
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
            <span>{t("Bosh sahifa")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="curriculum">
          <Link to="/curriculum">
            <BankOutlined />
            <span>{t("O'quv rejasi")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="subjects">
          <Link to="/subjects">
            <ReadOutlined />
            <span>{t("Fanlar")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="exam">
          <Link to="/exam">
            <ScheduleOutlined />
            <span>{t("Imtixonlar jadvali")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="rating">
          <Link to="/rating">
            <BookOutlined />
            <span>{t("Reyting daftarchsi")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="posts">
          <Link to="/posts">
            <ProfileOutlined />
            <span>{t("Yangiliklar va e'lonlar")}</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftMenue;

import React, { useState } from "react";
import { Menu, Avatar, Button } from "antd";
import {
  HomeOutlined,
  BankOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  BookOutlined,
  ReadOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ACTIVE_MENU_KEY } from "../../constants";
import { observer, inject } from "mobx-react";

const LeftMenu = ({ authStore: { activeSemesterId } }) => {
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem(ACTIVE_MENU_KEY)
      ? [localStorage.getItem(ACTIVE_MENU_KEY)]
      : ["home"]
  );
  const [visiable, setVisiable] = useState(false);

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem(ACTIVE_MENU_KEY, key);
  };
  const handleClick = (e) => {
    setVisiable(!visiable);
  };

  const [t] = useTranslation();

  return (
    <div className="menu-container">
      <span className="menu-top">
        <Link to="/">
          <Avatar size={64} src="/assets/logo.png" className="avatars" />
        </Link>
        <Button className="btn Menu_Button" onClick={handleClick}>
          <MenuOutlined />
        </Button>
      </span>
      <Menu
        className={`left-menu ${visiable ? "" : "menu_show"}`}
        selectedKeys={selectedKey}
        mode="inline"
        onSelect={handleSelect}
      >
        <Menu.Item key="home" className="nav-item">
          <NavLink to="/" className="nav-link" onClick={handleClick}>
            <HomeOutlined />
            <span>{t("Bosh sahifa")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="nav-item" key="curriculum">
          <NavLink to="/curriculum" onClick={handleClick}>
            <BankOutlined />
            <span>{t("O'quv rejasi")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="nav-item" key="subjects">
          <NavLink to={`/${activeSemesterId}/subjects`} onClick={handleClick}>
            <ReadOutlined />
            <span>{t("Fanlar")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="nav-item" key="exam">
          <NavLink to="/exam" onClick={handleClick}>
            <ScheduleOutlined />
            <span>{t("Imtixonlar jadvali")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="nav-item" key="rating" onClick={handleClick}>
          <NavLink to="/rating">
            <BookOutlined />
            <span>{t("Reyting daftarchsi")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="nav-item" key="posts">
          <NavLink to="/posts" onClick={handleClick}>
            <ProfileOutlined />
            <span>{t("Yangiliklar va e'lonlar")}</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default inject("authStore")(observer(LeftMenu));

import React, { useState, useEffect } from "react";
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
      : []
  );
  const [visiable, setVisiable] = useState(false);

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem(ACTIVE_MENU_KEY, key);
  };
  const handleClick = (e) => {
    e.preventDefault();
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
        <Menu.Item key="home">
          <NavLink to="/">
            <HomeOutlined />
            <span>{t("Bosh sahifa")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="curriculum">
          <NavLink to="/curriculum">
            <BankOutlined />
            <span>{t("O'quv rejasi")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="subjects">
          <NavLink to={`/${activeSemesterId}/subjects`}>
            <ReadOutlined />
            <span>{t("Fanlar")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="exam">
          <NavLink to="/exam">
            <ScheduleOutlined />
            <span>{t("Imtixonlar jadvali")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rating">
          <NavLink to="/rating">
            <BookOutlined />
            <span>{t("Reyting daftarchsi")}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="posts">
          <NavLink to="/posts">
            <ProfileOutlined />
            <span>{t("Yangiliklar va e'lonlar")}</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default inject("authStore")(observer(LeftMenu));

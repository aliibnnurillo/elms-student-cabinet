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
        <Avatar
          size={64}
          src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
          className="avatars"
        />
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/home">Bosh sahifa</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />}>
          <Link to="/structure">O'quv rejasi</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/subjects">Fanlar</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ScheduleOutlined />}>
          <Link to="/examn">Imtixonlar jadvali</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<BookOutlined />}>
          <Link to="/reyting">Reyting daftarchsi</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ProfileOutlined />}>
          <Link to="/news">Yangiliklar va elonlar</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftMenue;

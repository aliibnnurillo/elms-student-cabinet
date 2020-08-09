import { PageHeader, Breadcrumb, Avatar, Badge } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import Pop from "./pop";
import { Link } from "react-router-dom";
import "./menu.css";
import LoginList from "./login-list";

const ProfileHeader = () => {
  return (
    <div className="page-header home">
      <PageHeader className="site-page-header" title="Profil">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Profil</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div className="header-right">
        <Badge count={4}>
          <Link to=" " className="head-example">
            <MessageOutlined />
          </Link>
        </Badge>

        <Badge count={5}>
          <Pop icons={<BellOutlined />} />
        </Badge>
        <LoginList imgUrl="/assets/userimg.jpg" />
      </div>
    </div>
  );
};

export default ProfileHeader;
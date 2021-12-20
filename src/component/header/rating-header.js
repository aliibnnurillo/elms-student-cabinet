import { PageHeader, Breadcrumb, Badge } from "antd";
import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import "./menu.css";
import Pop from "./pop";
import { Link } from "react-router-dom";
import LoginList from "./login-list";
import LanguageBox from "../LanguageBox";

const RantingHeader = () => {
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title="Reyting daftarchasi">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Reyting daftarchasi</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div className="header-right">
        <LanguageBox />
        <Badge count={4}>
          <Link to="/messages" className="head-example">
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

export default RantingHeader;

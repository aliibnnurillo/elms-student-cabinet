import { PageHeader, Breadcrumb, Badge } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import "./menu.css";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import Pop from "./pop";
import { Link } from "react-router-dom";
import LoginList from "./login-list";
import LanguageBox from "../LanguageBox";
import { useTranslation } from "react-i18next";

const ExamHeader = () => {
  const [t] = useTranslation();
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title="Imtixonlar jadvali">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Imtixonlar jadvali</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div className="header-right">
        <LanguageBox />
        <Badge count={0}>
          <Link to="/messages" className="head-example">
            <MessageOutlined />
          </Link>
        </Badge>

        <Badge count={0}>
          <Pop icons={<BellOutlined />} />
        </Badge>
        <LoginList imgUrl="/assets/userimg.jpg" />
      </div>
    </div>
  );
};

export default ExamHeader;

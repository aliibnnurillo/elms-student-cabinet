import { PageHeader, Breadcrumb, Avatar, Badge } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import Pop from "./pop";
import { Link } from "react-router-dom";
import "./menu.css";
import LoginList from "./login-list";
import LanguageBox from "../LanguageBox";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const HomeHeader = (props) => {
  const [t] = useTranslation();
  return (
    <div className="page-header home">
      <PageHeader className="site-page-header" title="Bosh sahifa">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>{t("Bosh sahifa")}</span>
          </Breadcrumb.Item>
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

export default HomeHeader;

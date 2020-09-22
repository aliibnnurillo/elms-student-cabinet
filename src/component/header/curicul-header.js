import { PageHeader, Breadcrumb, Badge } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import "./menu.css";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import Pop from "./pop";
import { Link } from "react-router-dom";
import LoginList from "./login-list";
import { useTranslation } from "react-i18next";
import LanguageBox from "../LanguageBox";

const CuriculHeader = () => {
  const [t] = useTranslation();
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title={t("O'quv rejasi")}>
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span>{t("O'quv rejasi")}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div className="header-right">
        <LanguageBox />
        <Badge count={4}>
          <Link to="" className="head-example">
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

export default CuriculHeader;

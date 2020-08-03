import { PageHeader, Breadcrumb, Avatar, Badge, Radio } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import "./menu.css";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import { useLocation } from "react-router-dom";
import Pop from "./pop";

const NewsHeader = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="page-header">
        <PageHeader className="site-page-header" title="Yangiliklar">
          <Breadcrumb separator={<Arrow />}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <span>Yangiliklar</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
        </PageHeader>

        {pathname === "/news" ? (
          <div className="select-for-news">
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">Yangiliklar</Radio.Button>
              <Radio.Button value="b">E’lonlar</Radio.Button>
            </Radio.Group>
          </div>
        ) : null}

        <div className="header-right">
          <Badge count={4}>
            <a href="#" className="head-example">
              <MessageOutlined />
            </a>
          </Badge>

          <Badge count={5}>
            <Pop icons={<BellOutlined />} />
          </Badge>
          <Avatar
            className="img-avatars"
            size={40}
            src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
          />
        </div>
      </div>
    </>
  );
};

export default NewsHeader;

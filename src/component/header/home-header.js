import {
  PageHeader,
  Breadcrumb,
  Select,
  Avatar,
  Badge,
  Radio,
  Button,
  Popover,
  Card,
} from "antd";

import React, { useState } from "react";
import {
  HomeOutlined,
  SwapRightOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import { List } from "antd/lib/form/Form";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import Pop from "./pop";

const HomeHeader = () => {
  return (
    <div className="page-header home">
      <PageHeader className="site-page-header" title="Bosh sahifa">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>O’quv rejasi</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Reja</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

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
          className="user-icon"
          src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
        />
      </div>
    </div>
  );
};

export default HomeHeader;

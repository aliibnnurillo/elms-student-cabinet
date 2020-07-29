import { PageHeader, Breadcrumb, Select, Avatar, Badge } from "antd";

import React from "react";
import {
  HomeOutlined,
  SwapRightOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { BellOutlined } from "@ant-design/icons";
const Header = () => {
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title="Title">
        <Breadcrumb separator={<SwapRightOutlined />}>
          <Breadcrumb.Item href="/home">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>O'quv rejasi</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Reja</Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div>
        <Select defaultValue="1" style={{ width: 150 }} onChange={handleChange}>
          <Option value="1">1-SEMESTR</Option>
          <Option value="2">2-SEMESTR</Option>
          <Option value="3">3-SEMESTR</Option>
          <Option value="4">4-SEMESTR</Option>
        </Select>
      </div>

      <div className="header-right">
        <MessageOutlined />
        <Badge count={5}>
          <a href="#" className="head-example">
            <BellOutlined />
          </a>
        </Badge>
        <Avatar
          className="img-avatars"
          size={40}
          src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
        />
      </div>
    </div>
  );
};

export default Header;

import { PageHeader, Breadcrumb, Select, Badge } from "antd";

import React from "react";
import { HomeOutlined, MessageOutlined, BellOutlined } from "@ant-design/icons";
import "./menu.css";
import Arrow from "../icons/Arrow";
import { useLocation, Link } from "react-router-dom";
import Pop from "./pop";
import LoginList from "./login-list";
const SubjectsHeader = () => {
  const { pathname } = useLocation();
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title="Fanlar">
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Fanlar</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>
      {pathname === "/subjects" ? (
        <div>
          <Select
            defaultValue="1"
            style={{ width: 150 }}
            onChange={handleChange}
          >
            <Option value="1">1-SEMESTR</Option>
            <Option value="2">2-SEMESTR</Option>
            <Option value="3">3-SEMESTR</Option>
            <Option value="4">4-SEMESTR</Option>
          </Select>
        </div>
      ) : null}

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

export default SubjectsHeader;

import React from "react";
import { PageHeader, Breadcrumb, Badge, Radio } from "antd";
import { HomeOutlined, MessageOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import Arrow from "../icons/Arrow";
import { useLocation, Link } from "react-router-dom";
import Pop from "./pop";
import "./menu.css";
import { observer, inject } from "mobx-react";
import LoginList from "./login-list";

const obj = [
  { link: "news", title: "News" },
  { link: "one-news", title: "One news" },
];

const NewsHeader = ({ posts: { setType, type } }) => {
  const { pathname } = useLocation();
  const arr = pathname.split("/");

  const bread = arr.map((item) => {
    const a = obj.find((n) => n.link === item);
    return a;
  });
  const m = bread.filter((h) => h !== undefined);
  console.log(m);
  return (
    <>
      <div className="page-header">
        <PageHeader className="site-page-header" title="Yangiliklar">
          <Breadcrumb separator={<Arrow />}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            {m.map((item) => (
              <Breadcrumb.Item>
                <span>{item.title}</span>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </PageHeader>

        {pathname === "/news" ? (
          <div className="select-for-news">
            <Radio.Group
              value={type}
              buttonStyle="solid"
              onChange={(e) => setType(e.target.value)}
            >
              <Radio.Button value="news">Yangiliklar</Radio.Button>
              <Radio.Button value="advertisement">E’lonlar</Radio.Button>
            </Radio.Group>
          </div>
        ) : null}

        <div className="header-right">
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
    </>
  );
};

export default inject("posts")(observer(NewsHeader));
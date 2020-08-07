import React, { useEffect } from "react";
import { PageHeader, Breadcrumb, Badge } from "antd";
import { HomeOutlined, MessageOutlined, BellOutlined } from "@ant-design/icons";
import "./menu.css";
import Arrow from "../icons/Arrow";
import { useLocation, Link } from "react-router-dom";
import Pop from "./pop";
import LoginList from "./login-list";
import { observer, inject } from "mobx-react";
import CSelect from "../CSelect";

const SubjectsHeader = ({
  subjects: { fetchSemesters, semesters, activeSemester },
}) => {
  const { pathname } = useLocation();

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

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
          {activeSemester.id ? (
            <CSelect options={semesters} defaultValue={activeSemester.id} />
          ) : null}
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

export default inject("subjects")(observer(SubjectsHeader));
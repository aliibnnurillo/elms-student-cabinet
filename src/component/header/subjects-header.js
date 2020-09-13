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
import { useTranslation } from "react-i18next";
import { getActiveSemester } from "../../common/utils/utils";

const SubjectsHeader = ({
  subjects: {
    fetchSemesters,
    semesters,
    activeSemester,
    breadcrumb,
    currentSubject,
  },
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters, currentSubject]);

  const [t] = useTranslation();
  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title={t("Fanlar")}>
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`/${getActiveSemester()}/subjects`}>
            <span>{t("Fanlar")}</span>
          </Breadcrumb.Item>
          {breadcrumb.length && currentSubject
            ? breadcrumb.map((item) => {
                return (
                  <Breadcrumb.Item
                    href={`/${getActiveSemester()}/subjects/${item.id}`}
                  >
                    {item.name}
                  </Breadcrumb.Item>
                );
              })
            : null}
        </Breadcrumb>
      </PageHeader>

      {pathname.endsWith("/subjects") ? (
        <div className="">
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

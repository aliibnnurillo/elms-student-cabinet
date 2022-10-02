import React, { useEffect } from "react";
import { PageHeader, Breadcrumb, Badge, Space } from "antd";
import { HomeOutlined, MessageOutlined, BellOutlined } from "@ant-design/icons";
import "./menu.css";
import Arrow from "../icons/Arrow";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import Pop from "./pop";
import LoginList from "./login-list";
import { observer, inject } from "mobx-react";
import CSelect from "../CSelect";
import { useTranslation } from "react-i18next";
import AcademicYearSelect from "./AcademicYearSelect";
import CurriculumFilterSelect from "./CurriculumFilterSelect";
import qs from "query-string";

export const availableSemSeasonList = ["autumn_semester", "spring_semester"];

const ControlsHeader = (props) => {
  const [t] = useTranslation();
  const history = useHistory();
  const location = useLocation();
  // const {semSeason} = useParams();

  const { activeAcdYearId, activeSemSeason, activeCurrId } = props.authStore;

  const {
    a_year = activeAcdYearId,
    s_type = activeSemSeason,
    curriculum_id = activeCurrId,
  } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const handleChange = (option) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    let values = { ...search, a_year: option, curriculum_id: null };
    values = Object.keys(values).reduce(
      (prev, curr) =>
        values[curr] ? { ...prev, [curr]: values[curr] } : { ...prev },
      {}
    );
    history.push({
      search: qs.stringify(values, { encode: false }),
    });
  };

  return (
    <div className="page-header">
      <PageHeader className="site-page-header" title={t("Nazoratlar")}>
        <Breadcrumb separator={<Arrow />}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>{t("Nazoratlar")}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageHeader>

      <div className="semesterSeasonWrapper">
        <Space size={"middle"}>
          <AcademicYearSelect
            onChange={(option) => handleChange(option)}
            defaultValue={Number(a_year)}
          />
          <CSelect
            dropdownClassName="semesterSeason"
            onChange={(value) => {
              const search = qs.parse(location.search, {
                ignoreQueryPrefix: true,
              });
              history.push({
                search: qs.stringify({ ...search, s_type: value }),
              });
            }}
            options={[
              { id: "autumn_semester", name: t("Kuzgi semestr") },
              { id: "spring_semester", name: t("Bahorgi semestr") },
            ]}
            defaultValue={
              availableSemSeasonList.includes(s_type)
                ? s_type
                : "autumn_semester"
            }
          />
          <CurriculumFilterSelect
            onChange={(value) => {
              const search = qs.parse(location.search, {
                ignoreQueryPrefix: true,
              });
              history.push({
                search: qs.stringify({ ...search, curriculum_id: value }),
              });
            }}
            url={"/curriculum/list"}
            placeholder="O'quv dasturini tanlang"
            value={+curriculum_id || null}
            defaultValue={Number(curriculum_id)}
            allowClear
          />
        </Space>
      </div>

      <div className="header-right">
        <Badge count={4}>
          <Link to="/messages" className="head-example">
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

export default inject("subjects", "authStore")(observer(ControlsHeader));

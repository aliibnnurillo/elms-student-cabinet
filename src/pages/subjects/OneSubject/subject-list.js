import React, { useEffect } from "react";
import { Row, Col, Tag, List, Button, Spin, Space } from "antd";
import {
  CalendarOutlined,
  PieChartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { Link, useParams } from "react-router-dom";
import { SubjectsHeader } from "../../../component/header";
import "../subject.css";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const SubjectList = ({
  subjects: { fetchOne, loading, single },
  authStore: { activeSemesterId },
}) => {
  const { semesterId, id } = useParams();
  useEffect(() => {
    fetchOne(id, activeSemesterId);
    return () => {};
  }, [id, fetchOne]);
  const [t] = useTranslation();
  console.log(single);
  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <Spin spinning={loading}>
          <div className="subject_about">
            <Row gutter={50}>
              <Col
                className="subject-list-left"
                xl={10}
                lg={10}
                md={24}
                xs={24}
              >
                <div className="videos">
                  <Player
                    playsInline
                    poster={single.file_url_photo}
                    src={single.file_url_video}
                  />
                </div>
                <Button block type="default">
                  {t("Davom etish")}
                </Button>
                <div className="title">
                  <h2>{single.subject_name ? single.subject_name : null}</h2>
                  <p>
                    <span>
                      {t("Modullar soni")}
                      <Tag className="count_teg">
                        <Link to="#">
                          {single.total_module ? single.total_module : 0}
                        </Link>
                      </Tag>
                    </span>
                    <span>
                      {t("Darslar soni")}
                      <Tag className="count_teg">
                        <Link to="#">
                          {single.total_lesson ? single.total_lesson : 0}
                        </Link>
                      </Tag>
                    </span>
                  </p>
                  {!!single.file_url_info && (
                    <div
                      style={{
                        backgroundColor: "rgb(243, 244, 255)",
                        borderRadius: 6,
                        padding: "12px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("Fan ma'lumotlari")}:
                      <Link
                        to={single.file_url_info}
                        target="_blank"
                        onClick={(event) => {
                          event.preventDefault();
                          window.open(single.file_url_info);
                        }}
                      >
                        {single.file_url_info.slice(
                          single.file_url_info.lastIndexOf("/") + 1
                        )}
                      </Link>
                    </div>
                  )}
                </div>

                <div className={"m-24 d-flex justify-between"}>
                  <Link to={`/${semesterId}/subjects/${id}/exam-schedules/2`}>
                    Oraliq nazorat
                  </Link>
                  <Link to={`/${semesterId}/subjects/${id}/exam-schedules/3`}>
                    Yakuniy nazorat
                  </Link>
                </div>

                {!!single.description && (
                  <div className="sun-editor-editable">
                    <div
                      dangerouslySetInnerHTML={{ __html: single.description }}
                    />
                  </div>
                )}

                <div>
                  <h2>{t("Talablar")}</h2>
                  <p>{single.requirements ? single.requirements : null}</p>
                </div>
              </Col>
              <Col className="subject-list-right" xl={14} lg={14} md={24}>
                {Array.isArray(single.module)
                  ? single.module.map((module, idx) => {
                      return (
                        <div className="lesson-list" key={idx}>
                          <h3>
                            {idx + 1} - {module.name ? module.name : null}
                          </h3>
                          <p>
                            {module.description ? module.description : null}
                          </p>
                          <div className="tags">
                            {module.start_date && module.end_date ? (
                              <Tag>
                                <CalendarOutlined
                                  style={{
                                    marginRight: "10px",
                                    background: "#F3F4FF",
                                  }}
                                />
                                {module.start_date} - {module.end_date}
                              </Tag>
                            ) : null}
                            <Tag>
                              <PieChartOutlined
                                style={{ marginRight: "10px" }}
                              />
                              {module.total_lesson_item
                                ? `${Math.round(
                                    (module.read_total_lesson_item /
                                      module.total_lesson_item) *
                                      100
                                  )}%`
                                : "0%"}
                            </Tag>
                          </div>
                          <List
                            className="list_lesson"
                            bordered
                            dataSource={
                              Array.isArray(module.lessons)
                                ? module.lessons
                                : []
                            }
                            renderItem={(lesson) => (
                              <List.Item>
                                <Link
                                  to={`/${semesterId}/subjects/${id}/${lesson.id}`}
                                >
                                  <span>
                                    {lesson.name ? lesson.name : null}{" "}
                                  </span>
                                  <span className="list-icons">
                                    {lesson.type === "Nazariy" ? (
                                      <Tag color="#2db7f5">
                                        {lesson.theory_mark
                                          ? lesson.theory_mark.mark
                                          : 0}{" "}
                                        ball / {lesson.mark} ball
                                      </Tag>
                                    ) : (
                                      <Tag color="#87d068">
                                        {lesson.practical_mark
                                          ? lesson.practical_mark.mark
                                          : 0}{" "}
                                        ball / {lesson.mark} ball
                                      </Tag>
                                    )}
                                    &nbsp;&nbsp;
                                    <span>
                                      <PieChartOutlined />
                                      {lesson.total_lesson_item
                                        ? `${Math.round(
                                            (lesson.read_total_lesson_item /
                                              lesson.total_lesson_item) *
                                              100
                                          )}%`
                                        : "0%"}
                                    </span>
                                    <RightOutlined />
                                  </span>
                                </Link>
                              </List.Item>
                            )}
                          />
                        </div>
                      );
                    })
                  : null}
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default inject("subjects", "authStore")(observer(SubjectList));

import React, { useEffect } from "react";
import { Row, Col, Tag, List, Button, Spin } from "antd";
import {
  CalendarOutlined,
  PieChartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Player } from "video-react";

import { Link, useParams } from "react-router-dom";
import { SubjectsHeader } from "../../../component/header";
import "../subject.css";
import { inject, observer } from "mobx-react";

const SubjectList = ({ subjects: { fetchOne, loading, single } }) => {
  const { id } = useParams();
  useEffect(() => {
    fetchOne(id);
    return () => {};
  }, [id, fetchOne]);

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
                    poster="./photo.png"
                    src={single.file_url_video}
                  />
                </div>

                <Button block type="default">
                  Davom etish
                </Button>
                <div className="title">
                  <h2>{single.subject_name ? single.subject_name : null}</h2>
                  <p>
                    <span>
                      Modullar soni
                      <Tag className="count_teg">
                        <Link to="#">10</Link>
                      </Tag>
                    </span>
                    <span>
                      Darslar soni
                      <Tag className="count_teg">
                        <Link to="#">10</Link>
                      </Tag>
                    </span>
                  </p>
                </div>
                <p>{single.description ? single.description : null}</p>
                <div>
                  <h2>Talabalar</h2>
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
                            <Tag>
                              <CalendarOutlined
                                style={{
                                  marginRight: "10px",
                                  background: "#F3F4FF",
                                }}
                              />
                              {module.start_date && module.end_date
                                ? `${module.start_date} - ${module.end_date}`
                                : null}
                            </Tag>
                            <Tag>
                              <PieChartOutlined
                                style={{ marginRight: "10px" }}
                              />
                              60%
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
                                <Link to={`/subjects/lesson/${lesson.id}`}>
                                  <span>
                                    {lesson.name ? lesson.name : null}
                                  </span>
                                  <span className="list-icons">
                                    <span>
                                      <PieChartOutlined />
                                      20%
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

export default inject("subjects")(observer(SubjectList));

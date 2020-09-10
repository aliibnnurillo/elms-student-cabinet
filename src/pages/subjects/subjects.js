import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Tag, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
import "./subject.css";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const Subjects = ({
  subjects: { fetchSemesterSubjects, loading, semesterSubjects },
}) => {
  const { semesterId } = useParams();
  useEffect(() => {
    fetchSemesterSubjects();
    return () => {};
  }, []);

  const [t] = useTranslation();
  return (
    <div>
      <SubjectsHeader />
      <div className="content">
        <div className="subject_page">
          <Spin spinning={loading}>
            <Row gutter={[24, 24]}>
              {semesterSubjects.map((semSub, idx) => (
                <Col key={idx} xs={24} md={24} lg={12} xl={8}>
                  <Link to={`/${semesterId}/subjects/${semSub.subject_id}`}>
                    <Card hoverable className="card">
                      <div className="card-header">
                        <div className="title">
                          <h2>
                            {semSub.subject_name ? semSub.subject_name : null}
                          </h2>
                          <p>
                            <span>
                              {t("Modullar soni")}
                              <Tag className="count_teg">
                                <span>
                                  {semSub.total_module
                                    ? semSub.total_module
                                    : 0}
                                </span>
                              </Tag>
                            </span>
                            <span>
                              {t("Darslar soni")}
                              <Tag className="count_teg">
                                <span>
                                  {semSub.total_lesson
                                    ? semSub.total_lesson
                                    : 0}
                                </span>
                              </Tag>
                            </span>
                          </p>
                        </div>
                        <Avatar size={55} src={semSub.file_url_photo} />
                      </div>
                      <p>{semSub.short_info ? semSub.short_info : null}</p>
                      <span className="goSubject">
                        {t("Fanni Boshlash")}&nbsp;
                        <ArrowRightOutlined />
                      </span>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default inject("subjects")(observer(Subjects));

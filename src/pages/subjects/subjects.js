import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Tag, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
import "./subject.css";
import { observer, inject } from "mobx-react";

const Subjects = ({
  subjects: { fetchSemesterSubjects, loading, semesterSubjects },
}) => {
  useEffect(() => {
    fetchSemesterSubjects();
    return () => {};
  }, []);

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="subject_page">
          <Spin spinning={loading}>
            <Row gutter={[24, 24]}>
              {semesterSubjects.map((semSub, idx) => (
                <Col key={idx} xs={24} md={24} lg={12} xl={8}>
                  <Link to={`/subjects/${semSub.subject_id}`}>
                    <Card hoverable className="card">
                      <div className="card-header">
                        <div className="title">
                          <Link to="#">
                            {semSub.subject_name ? semSub.subject_name : null}
                          </Link>
                          <p>
                            <span>
                              Modullar soni
                              <Tag className="count_teg">
                                <Link to="">{12}</Link>
                              </Tag>
                            </span>
                            <span>
                              Darslar soni
                              <Tag className="count_teg">
                                <Link to="">{43}</Link>
                              </Tag>
                            </span>
                          </p>
                        </div>
                        <Avatar size={55} src={semSub.file_url_photo} />
                      </div>
                      <p>{semSub.short_info ? semSub.short_info : null}</p>
                      <Link
                        to={`/subjects/${semSub.subject_id}`}
                        className="goSubject"
                      >
                        Fanni Boshlash{<ArrowRightOutlined />}
                      </Link>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default inject("subjects")(observer(Subjects));

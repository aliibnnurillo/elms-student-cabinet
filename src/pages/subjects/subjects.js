import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
import "./subject.css";
import { observer, inject } from "mobx-react";

const Subjects = ({ subjects: { fetchAll, loading, result } }) => {
  // useEffect(() => {
  //   fetchAll({});
  //   return () => {};
  // }, []);
  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="subject_page">
          <Row gutter={[24, 24]}>
            {Array.isArray(result.data)
              ? result.data.map((item) => (
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Card hoverable className="card">
                      <div className="card-header">
                        <div className="title">
                          <Link to="">{item.title}</Link>
                          <p>
                            <span>
                              Modullar soni
                              <Tag className="count_teg">
                                <Link to=" ">{item.modul_num}</Link>
                              </Tag>
                            </span>
                            <span>
                              Darslar soni
                              <Tag className="count_teg">
                                <Link to=" ">{item.lesson_num}</Link>
                              </Tag>
                            </span>
                          </p>
                        </div>
                        <Avatar size={55} src="/assets/userimg.jpg" />
                      </div>
                      <p>{item.description}</p>
                      <Link to="/subjects/thissubject" className="goSubject">
                        Fanni Boshlash{<ArrowRightOutlined />}
                      </Link>
                    </Card>
                  </Col>
                ))
              : null}
          </Row>
        </div>
      </div>
    </>
  );
};

export default inject("subjects")(observer(Subjects));

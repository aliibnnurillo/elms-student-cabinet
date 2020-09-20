import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Tag, Spin, Button, Alert } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
import "./subject.css";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const Subjects = ({
  subjects: {
    fetchSemesterSubjects,
    loading,
    semesterSubjects,
    setCurrentSubject,
  },
  glo: { showChoiceAlert, checkIsAvailableChoice, setSubjectModalVisible },
}) => {
  const { semesterId } = useParams();
  useEffect(() => {
    fetchSemesterSubjects();
    checkIsAvailableChoice();
    setCurrentSubject(null);
    return () => {};
  }, []);

  const [t] = useTranslation();
  return (
    <div>
      <SubjectsHeader />
      <div className="content">
        {showChoiceAlert ? (
          <Alert
            style={{ marginBottom: 24 }}
            message={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: 0 }}>
                  Sizda ushbu semesterda tanlanadigan fanlar mavjud!. O'qishni
                  boshlash uchun siz tanlandigan fanlar guruhidan o'zingizga
                  ma'qul fanni tanlashingiz kerak!
                </p>
                <Button
                  type="ghost"
                  onClick={() => setSubjectModalVisible(true)}
                >
                  Tanlash
                </Button>
              </div>
            }
            type="error"
          />
        ) : null}
        <div className="subject_page">
          <Spin spinning={loading}>
            <Row gutter={[24, 24]}>
              {semesterSubjects.map((semSub, idx) => (
                <Col key={idx} xs={24} md={24} lg={12} xl={8}>
                  <Link
                    to={
                      semSub.last_lesson_id && semSub.last_lesson_item_id
                        ? `/${semesterId}/subjects/${semSub.subject_id}/${semSub.last_lesson_id}#${semSub.last_lesson_id}`
                        : `/${semesterId}/subjects/${semSub.subject_id}`
                    }
                  >
                    <Card
                      hoverable
                      className="card"
                      style={
                        semSub.choice_of_subject
                          ? { backgroundColor: "rgba(223, 177, 177, 0.15)" }
                          : {}
                      }
                    >
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
                        {semSub.last_lesson_id && semSub.last_lesson_item_id
                          ? t("Davom etish")
                          : t("Fanni boshlash")}
                        &nbsp;
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

export default inject("subjects", "glo")(observer(Subjects));

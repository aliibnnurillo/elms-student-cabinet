import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Tag, Spin, Button, Alert, Space } from "antd";
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
  authStore: { activeSemId },
  glo: { showChoiceAlert, checkIsAvailableChoice, setSubjectModalVisible },
}) => {
  const { semId } = useParams();
  useEffect(() => {
    fetchSemesterSubjects({ activeSemId });
    checkIsAvailableChoice();
    setCurrentSubject(null);
    return () => {};
  }, [activeSemId]);

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
            <Row gutter={[24, 24]} align="stretch">
              {semesterSubjects.map((semSub, idx) => (
                <Col key={idx} xs={24} md={24} lg={12} xl={8}>
                  <Link
                    to={
                      semSub.last_lesson_id && semSub.last_lesson_item_id
                        ? `/${semId}/subjects/${semSub.subject_id}/${semSub.last_lesson_id}#${semSub.last_lesson_id}`
                        : `/${semId}/subjects/${semSub.subject_id}`
                    }
                    className="subject__link"
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
                      <div>
                      <div className="card-header">
                        <div className="title">
                          <h2>
                            {semSub.subject_name ? semSub.subject_name : null}
                          </h2>
                          <div>
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
                            <span className="ml-3">
                              {t("Darslar soni")}
                              <Tag className="count_teg">
                                <span>
                                  {semSub.total_lesson
                                    ? semSub.total_lesson
                                    : 0}
                                </span>
                              </Tag>
                            </span>
                            {semSub.lesson_mark ? (
                              <div>
                                {t("Ball")}&nbsp;
                                <Tag className="count_teg">
                                  <span>
                                    {semSub.current_practical_mark +
                                      semSub.current_theory_mark}{" "}
                                    / {semSub.lesson_mark}
                                  </span>
                                </Tag>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <Avatar size={55} src={semSub.file_url_photo} />
                      </div>
                      <p>{semSub.short_info ? semSub.short_info : null}</p>
                      </div>
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

export default inject("subjects", "glo", "authStore")(observer(Subjects));

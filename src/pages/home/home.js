import React, { useEffect } from "react";
import { HomeHeader } from "../../component/header";
import { Card, Avatar, Row, Col, Calendar, Spin, Alert, Button } from "antd";
import "./home.css";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { PercentsIcon } from "../../component/icons";
import { observer, inject } from "mobx-react";
import "moment/locale/uz-latn";
import moment from "moment";
import { getActiveSemester } from "../../common/utils/utils";
import { useTranslation } from "react-i18next";
moment.locale("uz-latn");

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const HomePage = ({
  subjects: { fetchSemesterSubjects, semesterSubjects, loading },
  glo: { checkIsAvailableChoice, isAvailableChoice },
}) => {
  useEffect(() => {
    fetchSemesterSubjects();
    checkIsAvailableChoice();
    console.log("salom");
  }, []);

  const [t] = useTranslation();

  return (
    <>
      <HomeHeader />

      <div className="content home-page">
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
              <Button type="ghost">Tanlash</Button>
            </div>
          }
          type="error"
        />
        <Spin spinning={loading}>
          <div className="for-calendar">
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                defaultValue={moment("2020-08-12")}
                onPanelChange={onPanelChange}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2020-09-02")}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2020-10-23")}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2020-11-11")}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2020-12-22")}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2021-01-08")}
              />
            </div>
            <div className="site-calendar-card">
              <Calendar
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  return (
                    <div>
                      <h3>{moment(value).format("MMMM").toUpperCase()}</h3>
                    </div>
                  );
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
                defaultValue={moment("2021-02-15")}
              />
            </div>
          </div>
          <div className="for-subjects-block">
            <h2>{t("Fanlar")}</h2>
            <Row gutter={[20, 14]}>
              {semesterSubjects.map((item) => (
                <Col
                  span={24}
                  key={item.id}
                  xxl={{ span: 6 }}
                  xl={{ span: 8 }}
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                >
                  <Link
                    to={`/${getActiveSemester()}/subjects/${item.subject_id}`}
                  >
                    <Card className="for-card-subjects">
                      <Meta
                        avatar={<Avatar size={64} src={item.file_url_photo} />}
                        title={
                          <h3>
                            {item.subject_name ? item.subject_name : null}
                          </h3>
                        }
                        description={
                          <p>
                            <span>
                              {t("Modul")} {item.total_module} /&nbsp;
                              {`${item.total_lesson} - ${t("Dars")}`}
                            </span>
                            <span>
                              <PercentsIcon /> 56%
                            </span>
                          </p>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default inject("subjects", "glo")(observer(HomePage));

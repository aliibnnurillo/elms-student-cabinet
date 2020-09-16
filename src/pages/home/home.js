import React, { useEffect } from "react";
import { HomeHeader } from "../../component/header";
import { Card, Avatar, Row, Col, Calendar, Spin, Alert, Button } from "antd";
import "./home.css";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { PercentsIcon } from "../../component/icons";
import { observer, inject } from "mobx-react";
// import uz from "moment/locale/uz-latn";
import moment from "moment";
import { getActiveSemester } from "../../common/utils/utils";
import { useTranslation } from "react-i18next";
// moment.locale("uz-latn");

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const loc = {
  lang: {
    locale: "oz_OZ",
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"],
    today: "Today",
    now: "Now",
    backToToday: "Back to today",
    ok: "Ok",
    clear: "Clear",
    month: "Oy",
    year: "Yil",
    timeSelect: "Vaqtni tanlang",
    dateSelect: "Sanani tanlang",
    monthSelect: "Choose a month",
    yearSelect: "Choose a year",
    decadeSelect: "Choose a decade",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};

const HomePage = ({
  subjects: { fetchSemesterSubjects, semesterSubjects, loading },
  glo: { checkIsAvailableChoice, showChoiceAlert, setSubjectModalVisible },
}) => {
  useEffect(() => {
    fetchSemesterSubjects();
    checkIsAvailableChoice();
  }, []);

  const [t] = useTranslation();

  return (
    <>
      <HomeHeader />

      <div className="content home-page">
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
        <Spin spinning={loading}>
          <div className="for-calendar">
            <div className="site-calendar-card">
              <Calendar
                locale={loc}
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
                locale={loc}
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
                locale={loc}
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
                locale={loc}
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
                locale={loc}
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
                locale={loc}
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
                locale={loc}
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
                    <Card
                      className="for-card-subjects"
                      style={
                        item.choice_of_subject
                          ? { backgroundColor: "rgba(223, 177, 177, 0.15)" }
                          : {}
                      }
                    >
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

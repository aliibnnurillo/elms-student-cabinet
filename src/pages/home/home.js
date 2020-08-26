import React, { useEffect } from "react";
import { HomeHeader } from "../../component/header";
import { Card, Avatar, Row, Col, Calendar, Spin } from "antd";
import "./home.css";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { PercentsIcon } from "../../component/icons";
import { observer, inject } from "mobx-react";
import "moment/locale/uz-latn";
import moment from "moment";
moment.locale("uz-latn");

const data = [
  {
    id: 1,
    title: "Oliy Matematika",
    modul: "2/4",
    imgUrl: "/assets/subjecticon.png",
    precen: "60%",
  },
  {
    id: 2,
    title: "C++ dasturlash",
    modul: "1/3",
    imgUrl: "/assets/subjecticon.png",
    precen: "33%",
  },
  {
    id: 3,
    title: "Fizika",
    modul: "2/9",
    imgUrl: "/assets/subjecticon.png",
    precen: "84%",
  },
  {
    id: 4,
    title: "Ingliz Tili",
    modul: "1/2",
    imgUrl: "/assets/subjecticon.png",
    precen: "19%",
  },
  {
    id: 5,
    title: "O’zbekiston Tarixi",
    modul: "4/7",
    imgUrl: "/assets/subjecticon.png",
    precen: "45%",
  },
];

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const HomePage = ({
  subjects: { fetchSemesterSubjects, semesterSubjects, loading },
}) => {
  useEffect(() => {
    fetchSemesterSubjects();
    console.log("salom");
  }, []);

  return (
    <>
      <HomeHeader />

      <div className="content home-page">
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
            <h2>Fanlar</h2>
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
                  <Card className="for-card-subjects">
                    <Meta
                      avatar={<Avatar size={64} src={item.file_url_photo} />}
                      title={
                        <Link to="">
                          {item.subject_name ? item.subject_name : null}
                        </Link>
                      }
                      description={
                        <p>
                          <span>Modul 4 / 9-Dars</span>
                          <span>
                            <PercentsIcon /> 56%
                          </span>
                        </p>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default inject("subjects")(observer(HomePage));

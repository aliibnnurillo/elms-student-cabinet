import React, { useEffect } from "react";
import { CuriculHeader } from "../../component/header";
import { List } from "antd";
import { ClockCircleFilled, CreditCardFilled } from "@ant-design/icons";
import "../examn/exam.css";
import "./curicul.css";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const Curiculum = (props) => {
  const {
    curriculum: { fetchAll, result },
  } = props;

  useEffect(() => {
    fetchAll();
  }, []);

  const [t] = useTranslation();
  return (
    <>
      <CuriculHeader />

      <div className="content exam-page curicul-page">
        {/* <Spin spinning={loading}> */}
        {Array.isArray(result) && result.length ? (
          <>
            <h3>{result[0].faculty_name ? result[0].faculty_name : null}</h3>
            <h1>
              {result[0].speciality_name ? result[0].speciality_name : null}
            </h1>
            <div className="all-exam">
              {result.map((sem, index) => {
                console.log('index=====>',index)
                return (
                  <div key={index}>
                    {(index % 2) === 0 ? <h4>{(sem.semester_name)}-kurs</h4> : null}

                    <div className="curicul-content">
                      <List
                        size="large"
                        className="curicul-list"
                        dataSource={sem.semestr_subject.notChoice}
                        header={
                          <p>
                            <span style={{ textTransform: "uppercase" }}>
                              {sem.semester_name}-{t("Semestr")}
                            </span>
                            <span>
                              {sem.start_date} - {sem.end_date}
                            </span>
                          </p>
                        }
                        renderItem={(item, idx) => {
                          return (
                            <List.Item key={idx}>
                              <span>
                                {item.subject_choice_name &&
                                item.subject_choice_name.name
                                  ? item.subject_choice_name.name
                                  : null}
                              </span>
                              {item.hour && item.credit_hour ? (
                                <span>
                                  <span>
                                    {item.hour}
                                    <ClockCircleFilled />
                                  </span>
                                  <span>
                                    <span style={{ fontSize: 24 }}>/</span>
                                    &nbsp; {item.credit_hour}
                                    <CreditCardFilled />
                                  </span>
                                </span>
                              ) : null}
                            </List.Item>
                          );
                        }}
                      >
                        <List.Item className="for-choice">
                          <List
                            className="choice"
                            header={<p>{t("tanlov")}</p>}
                            dataSource={sem.semestr_subject.choice}
                            renderItem={(item, idx) => {
                              return (
                                <List.Item>
                                  <span>
                                    {item.subject_choice_name &&
                                    item.subject_choice_name.name
                                      ? item.subject_choice_name.name
                                      : null}
                                  </span>
                                  {item.hour && item.credit_hour ? (
                                    <span>
                                      <span>
                                        {item.hour}
                                        <ClockCircleFilled />
                                      </span>
                                      <span>
                                        <span style={{ fontSize: 24 }}>/</span>
                                        &nbsp; {item.credit_hour}
                                        <CreditCardFilled />
                                      </span>
                                    </span>
                                  ) : null}
                                </List.Item>
                              );
                            }}
                          />
                        </List.Item>
                      </List>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
        {/* </Spin> */}
      </div>
    </>
  );
};

export default inject("curriculum")(observer(Curiculum));

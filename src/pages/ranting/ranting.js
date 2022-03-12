import React, { useEffect } from "react";
import { RantingHeader } from "../../component/header";
import { List } from "antd";
import { StarFilled, ClockCircleFilled } from "@ant-design/icons";
import "./rating.css";
import "../examn/exam.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

const ClassName = (prop) => {
  const a = Number(prop);

  if (isNaN(a)) {
    return "for-date";
  } else if (!isNaN(a) && a < 72) {
    return "for-date small";
  } else if (a >= 72 && a < 86) {
    return "for-date middle";
  } else {
    return "for-date best";
  }
};

const courseNumbers = {
  ["1"]: "1",
  ["3"]: "2",
  ["5"]: "3",
  ["7"]: "4",
};

const Ranting = ({ ratingNotes }) => {
  const [t] = useTranslation();
  const { fetchAll, result, state } = ratingNotes;

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <RantingHeader />

      <div className="content exam-page ranting-page">
        <h3>{get(result, "[0].facultyName")}</h3>
        <h1>{get(result, "[0].specialityName")}</h1>

        <div className="all-exam">
          {state === "done" &&
            (result || []).map((item) => (
              <div key={`${item.id}-${item.facultyName}`}>
                {courseNumbers[item.semestrNumber] ? (
                  <h2 className="for-course-number">
                    {courseNumbers[item.semestrNumber] + "-" + t("kurs")}
                  </h2>
                ) : (
                  <div style={{ minHeight: "32px" }} />
                )}

                <div className="for-exam-list">
                  <List
                    size="large"
                    header={
                      <div className="smest-name">
                        <h4>{item.semestrNumber + "-" + t("semestr")}</h4>
                        {(!!item.startDate || !!item.endDate) && (
                          <span>{`${item.startDate} ${
                            !!item.startDate && !!item.endDate && "-"
                          } ${item.endDate}`}</span>
                        )}
                      </div>
                    }
                    bordered
                    dataSource={item.semestrSubjects}
                    renderItem={(subjects) => (
                      <List.Item>
                        <span>
                          {!!subjects.teacherName && (
                            <h5>{subjects.teacherName}</h5>
                          )}
                          <Link className="for-subject-name">
                            {subjects.name}
                          </Link>
                        </span>
                        <span className={ClassName(subjects.ratingRegisters)}>
                          <span className="for-ranting-num">
                            {subjects.hour}
                            <ClockCircleFilled />
                          </span>
                          <span className="for-star">
                            {subjects.ratingRegisters}
                            <StarFilled />
                          </span>
                        </span>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default inject("ratingNotes")(observer(Ranting));

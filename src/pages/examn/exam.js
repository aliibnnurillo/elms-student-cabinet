import React from "react";
import { ExamHeader } from "../../component/header";
import { SubjectList } from "../subjects";
import { List, Typography, Divider } from "antd";
import { StarFilled, CalendarFilled } from "@ant-design/icons";
import "./exam.css";
import AnchorLink from "antd/lib/anchor/AnchorLink";
import { Link } from "react-router-dom";
const smest = [
  {
    id: 1,
    course: "1-kurs",
    smes: [
      {
        smesId: 1,
        title: "1-smes",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Algoritm loyihalash",
            date: "02.11.2020, 15:00",
            starNumber: "95",
            star: <StarFilled />,
          },
          {
            name: "Xorijiy til 2",
            date: "03.11.2020, 17:30",
            starNumber: "45",
            star: <StarFilled />,
          },
          {
            name: "Chiziqli algebra",
            date: "04.11.2020, 10:00",
          },
          {
            name: "Telekommunikatsiyada operatsion tizimlar",
            date: "05.11.2020, 15:00",
          },
          {
            name: "Fizika 2",
            date: "06.11.2020, 09:40",
          },
          {
            name: "Dasturlash",
            date: "07.11.2020, 12:00",
          },
        ],
      },
      {
        smesId: 2,
        title: "2-smes",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Algoritm loyihalash",
            date: "02.11.2020, 15:00",
          },
          {
            name: "Xorijiy til 2",
            date: "03.11.2020, 17:30",
          },
          {
            name: "Chiziqli algebra",
            date: "04.11.2020, 10:00",
          },
          {
            name: "Telekommunikatsiyada operatsion tizimlar",
            date: "05.11.2020, 15:00",
          },
          {
            name: "Fizika 2",
            date: "06.11.2020, 09:40",
          },
          {
            name: "Dasturlash",
            date: "07.11.2020, 12:00",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    course: "2-kurs",
    smes: [
      {
        smesId: 1,
        title: "3-smes",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Algoritm loyihalash",
            date: "02.11.2020, 15:00",
            starNumber: "95",
            star: <StarFilled />,
          },
          {
            name: "Xorijiy til 2",
            date: "03.11.2020, 17:30",
            starNumber: "45",
            star: <StarFilled />,
          },
          {
            name: "Chiziqli algebra",
            date: "04.11.2020, 10:00",
          },
          {
            name: "Telekommunikatsiyada operatsion tizimlar",
            date: "05.11.2020, 15:00",
          },
          {
            name: "Fizika 2",
            date: "06.11.2020, 09:40",
          },
          {
            name: "Dasturlash",
            date: "07.11.2020, 12:00",
          },
        ],
      },
      {
        smesId: 2,
        title: "4-smes",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Algoritm loyihalash",
            date: "02.11.2020, 15:00",
          },
          {
            name: "Xorijiy til 2",
            date: "03.11.2020, 17:30",
          },
          {
            name: "Chiziqli algebra",
            date: "04.11.2020, 10:00",
          },
          {
            name: "Telekommunikatsiyada operatsion tizimlar",
            date: "05.11.2020, 15:00",
          },
          {
            name: "Fizika 2",
            date: "06.11.2020, 09:40",
          },
          {
            name: "Dasturlash",
            date: "07.11.2020, 12:00",
          },
        ],
      },
    ],
  },
];
const Exam = () => {
  return (
    <>
      <ExamHeader />
      <div className="content exam-page">
        <h3>Kompyuter injiniringi</h3>
        <h1>Multimedia texnologiyalari</h1>
        <div className="all-exam">
          {smest.map((item) => (
            <div key={item.id}>
              <h2 className="for-course-number">{item.course}</h2>
              <div className="for-exam-list">
                {item.smes.map((card) => (
                  <List
                    key={card}
                    size="large"
                    header={
                      <div className="smest-name">
                        <h4>{card.title}</h4>
                        <span>{card.smesDate}</span>
                      </div>
                    }
                    bordered
                    dataSource={card.subjectsList}
                    renderItem={(subjects) => (
                      <List.Item>
                        <Link className="for-subject-name">
                          {subjects.name}
                        </Link>
                        <span className="for-date">
                          <span>
                            {subjects.starNumber}
                            {subjects.star}
                          </span>
                          {subjects.date}
                          <CalendarFilled />
                        </span>
                      </List.Item>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exam;

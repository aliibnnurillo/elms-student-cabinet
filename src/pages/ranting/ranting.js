import React from "react";
import { RantingHeader } from "../../component/header";
import { List } from "antd";
import {
  StarFilled,
  CalendarFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import "../examn/exam.css";
import { Link } from "react-router-dom";
const smest = [
  {
    id: 1,
    course: "kurs",
    smes: [
      {
        smesId: 1,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "240",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "360",
            rantingValue: "96",
          },
        ],
      },
      {
        smesId: 2,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "360",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "240",
            rantingValue: "96",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    course: "kurs",
    smes: [
      {
        smesId: 3,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "240",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "360",
            rantingValue: "96",
          },
        ],
      },
      {
        smesId: 4,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "360",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "240",
            rantingValue: "96",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    course: "kurs",
    smes: [
      {
        smesId: 5,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "240",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "360",
            rantingValue: "96",
          },
        ],
      },
      {
        smesId: 6,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "360",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "240",
            rantingValue: "96",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    course: "kurs",
    smes: [
      {
        smesId: 7,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "240",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "360",
            rantingValue: "96",
          },
        ],
      },
      {
        smesId: 8,
        title: "semestr",
        smesDate: "02.09.2020 - 20.02.2021",
        subjectsList: [
          {
            name: "Abdusattor Muxtorov",
            title: "Algoritm loyihalash",
            rantingNum: "180",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Xorijiy til 2",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Chiziqli algebra",
            rantingNum: "120",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Telekommunikatsiyada operatsion tizimlar",
            rantingNum: "90",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Fizika 2",
            rantingNum: "360",
            rantingValue: "96",
          },
          {
            name: "Abdusattor Muxtorov",
            title: "Dasturlash",
            rantingNum: "240",
            rantingValue: "96",
          },
        ],
      },
    ],
  },
];
const Ranting = () => {
  return (
    <>
      <RantingHeader />
      <div className="content exam-page ranting-page">
        <h3>Kompyuter injiniringi</h3>
        <h1>Multimedia texnologiyalari</h1>
        <div className="all-exam">
          {smest.map((item) => (
            <div key={item.id}>
              <h2 className="for-course-number">
                {item.id + "-" + item.course}
              </h2>
              <div className="for-exam-list">
                {item.smes.map((card) => (
                  <List
                    key={card}
                    size="large"
                    header={
                      <div className="smest-name">
                        <h4>{card.smesId + "-" + card.title}</h4>
                        <span>{card.smesDate}</span>
                      </div>
                    }
                    bordered
                    dataSource={card.subjectsList}
                    renderItem={(subjects) => (
                      <List.Item>
                        <span>
                          <h5>{subjects.name}</h5>
                          <Link className="for-subject-name">
                            {subjects.title}
                          </Link>
                        </span>
                        <span className="for-date">
                          <span className="for-ranting-num">
                            {subjects.rantingNum}
                            <ClockCircleFilled />
                          </span>
                          <span className="for-star">
                            {subjects.rantingValue}
                            <StarFilled />
                          </span>
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

export default Ranting;

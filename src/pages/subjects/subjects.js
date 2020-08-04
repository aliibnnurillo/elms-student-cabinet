import React from "react";
import { Row, Col, Card, Avatar, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
import "./subject.css";

const news = [
  {
    title: "Oliy Matematika",
    modul_num: 10,
    lesson_num: 25,
    imgUrl: "/assets/userimg.jpg",
    description:
      "Oliy matematikaning bu qismi uchun 12   soatlik auditoriya darsi o`tiladi va kurs nihoyasida  talabalar reyting nazorati tizimi bo`yicha reyting ballari bilan baholanadi.",
  },
  {
    title: "Oliy Matematika",
    modul_num: 10,
    lesson_num: 25,
    imgUrl: "/assets/userimg.jpg",
    description:
      "Oliy matematikaning bu qismi uchun 12   soatlik auditoriya darsi o`tiladi va kurs nihoyasida  talabalar reyting nazorati tizimi bo`yicha reyting ballari bilan baholanadi.",
  },
  {
    title: "Oliy Matematika",
    modul_num: 10,
    lesson_num: 25,
    imgUrl: "/assets/userimg.jpg",
    description:
      "Oliy matematikaning bu qismi uchun 12   soatlik auditoriya darsi o`tiladi va kurs nihoyasida  talabalar reyting nazorati tizimi bo`yicha reyting ballari bilan baholanadi.",
  },
  {
    title: "Oliy Matematika",
    modul_num: 10,
    lesson_num: 25,
    imgUrl: "/assets/userimg.jpg",
    description:
      "Oliy matematikaning bu qismi uchun 12   soatlik auditoriya darsi o`tiladi va kurs nihoyasida  talabalar reyting nazorati tizimi bo`yicha reyting ballari bilan baholanadi.",
  },
];

const Subjects = () => {
  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="subject_page">
          <Row gutter={[20, 20]}>
            {news.map((item) => (
              <Col
                span={24}
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
              >
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
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Subjects;

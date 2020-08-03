import React from "react";
import { Row, Col, Card, Tag, List, Typography, Button } from "antd";
import {
  CalendarOutlined,
  PieChartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Player } from "video-react";

import "./subject.css";
import { Link } from "react-router-dom";
import { SubjectsHeader } from "../../component/header";
const SubjectList = () => {
  const data = [
    { name: "Dasturlash tillarining tuzilmasi.", pro: "20%" },
    {
      name: "Algoritmlash va dasturlashning asosiy tushunchalari.",
      pro: "25%",
    },
  ];

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="subject_about">
          <Row gutter={80}>
            <Col className="subject-list-left" span={10}>
              <div className="videos">
                <Player
                  playsInline
                  poster="./photo.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
              </div>

              <Button block type="default">
                Davom etish
              </Button>
              <div className="title">
                <h2>Title</h2>
                <p>
                  <span>
                    Modullar soni
                    <Tag className="count_teg">
                      <a href="#">10</a>
                    </Tag>
                  </span>
                  <span>
                    Darslar soni
                    <Tag className="count_teg">
                      <a href="#">10</a>
                    </Tag>
                  </span>
                </p>
              </div>
              <p>
                Ushbu kursda algoritm va dasturlashning asosiy tamoillari
                orgatiladi. Jumladan masalani yechish uchun mantiqiy fikirlash,
                algoritm tuzish va turli xil kompilyatorlarda dastur tuzish
                maxoratini shakillantirish. Dasturlash tilining tarkibiy
                qismlari: Operator, funksiya, massiv, ko’rsatgich, sinf va
                shablonlar tuzish va ulardan foydalanish usullari mukammal
                o’rgatiladi. Talabalar kichik muammoli holatlarni algoritmini
                tuzishda obyektga yo’naltirilgan dasturlashning yangi
                imkoniytalaridan foydalangan holda qaror qabul qilishni, amaliy
                va zamonaviy ilovalarni yaratish texnologiyalarini o'rganadi.
              </p>
              <div>
                <h2>Talabalar</h2>
                <p> Lorem, ipsum dolor sit amet </p>
              </div>
            </Col>
            <Col className="subject-list-right" span={14}>
              <div className="lesson-list">
                <h3>1 - Algoritm va dasturlashga kirish</h3>
                <p>
                  Algoritm va dasturlashning asosiy tushunchalari ochib
                  beriladi. Jumladan: til alifbosi, identifikator, kalit
                  so’zlar, satrli o’zgaruvchilar, ma’lumotlar toifasi, arifmetik
                  ifoda va amallar, siljitish amallari, inkrement, decrement,
                  kutubxonalar va ularning funksiyalari hamda preprotsessor
                  direktivalaridan foydalanish usullari o’rganiladi.
                </p>
                <div className="tags">
                  <Tag>
                    <CalendarOutlined
                      style={{ marginRight: "10px", background: "#F3F4FF" }}
                    />
                    15 sentabr 2020 - 21 Dekabr 2020
                  </Tag>
                  <Tag>
                    <PieChartOutlined style={{ marginRight: "10px" }} />
                    60%
                  </Tag>
                </div>
                <List
                  className="list_lesson"
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <Link to="/subjects/thissubject/lesson">
                        <span> {item.name}</span>
                        <span className="list-icons">
                          <span>
                            <PieChartOutlined />
                            {item.pro}
                          </span>
                          <RightOutlined />
                        </span>
                      </Link>
                    </List.Item>
                  )}
                />
              </div>
              <div className="lesson-list">
                <h3>1 - Algoritm va dasturlashga kirish</h3>
                <p>
                  Algoritm va dasturlashning asosiy tushunchalari ochib
                  beriladi. Jumladan: til alifbosi, identifikator, kalit
                  so’zlar, satrli o’zgaruvchilar, ma’lumotlar toifasi, arifmetik
                  ifoda va amallar, siljitish amallari, inkrement, decrement,
                  kutubxonalar va ularning funksiyalari hamda preprotsessor
                  direktivalaridan foydalanish usullari o’rganiladi.
                </p>
                <div className="tags">
                  <Tag>
                    <CalendarOutlined
                      style={{ marginRight: "10px", background: "#F3F4FF" }}
                    />
                    15 sentabr 2020 - 21 Dekabr 2020
                  </Tag>
                  <Tag>
                    <PieChartOutlined style={{ marginRight: "10px" }} />
                    60%
                  </Tag>
                </div>
                <List
                  className="list_lesson"
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <Link to="/subjects/thissubject/lesson">
                        <span> {item.name}</span>
                        <span className="list-icons">
                          <span>
                            <PieChartOutlined />
                            {item.pro}
                          </span>
                          <RightOutlined />
                        </span>
                      </Link>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SubjectList;

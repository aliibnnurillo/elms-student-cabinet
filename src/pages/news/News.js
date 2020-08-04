import React from "react";
import { Row, Col, Tag, Pagination } from "antd";
import { Card } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./news.css";
import { NewsHeader } from "../../component/header";
const { Meta } = Card;

const News = () => {
  const data = [
    {
      id: "1",
      imgUrl: "./assets/news.png",
      title: "Dasturlash muhiti(IDE) tushunchasi haqida",
      date: "12.12.12",
      description: "lorem ipsum dolor sit amet",
      link: "/news/one-news",
    },
    {
      id: 2,
      imgUrl: "./assets/news.png",
      title: "UI dizaynida tipografiyadan foydalanish bo'yicha to'liq...",
      date: "12.12.12",
      description: "lorem ipsum dolor sit amet",
      link: "/news/one-news",
    },
    {
      id: "3",
      imgUrl: "./assets/news.png",
      title: "3-news",
      date: "12.12.12",
      description: "lorem ipsum dolor sit amet",
      link: "/news/one-news",
    },
    {
      id: 4,
      imgUrl: "./assets/news.png",
      title: "4-news",
      date: "12.12.12",
      description: "lorem ipsum dolor sit amet",
      link: "/news/one-news",
    },
  ];
  return (
    <>
      <NewsHeader />
      <div className="news-page-container content">
        <Row gutter={24}>
          {data.map((item, idx) => (
            <Col
              key={idx}
              span={24}
              xl={{ span: 6 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
            >
              <Card
                className="news-card"
                style={{ width: 300 }}
                cover={<img alt="example" src={`${item.imgUrl}`} />}
              >
                <Meta
                  title={
                    <Link to={item.link + "/" + item.id}>{item.title}</Link>
                  }
                  description={
                    <p>
                      <span className="time">{item.date}</span>
                      <Tag icon={<EyeFilled />}>15</Tag>
                    </p>
                  }
                />
              </Card>
            </Col>
          ))}

          <Col className="pagination" span={24}>
            <Pagination defaultCurrent={1} total={70} showSizeChanger={false} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default News;

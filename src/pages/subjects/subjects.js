import React from "react";
import { Row, Col, Card, Avatar, Button, Badge, Tag } from "antd";
import "./subject.css";
import Meta from "antd/lib/card/Meta";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Subjects = () => {
  return (
    <div className="subject_page">
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Card hoverable className="card">
            <div className="card-header">
              <div className="title">
                <Link to="">Title</Link>
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
              <Avatar
                size={55}
                src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
              />
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              quia, pariatur illum sunt quod culpa, molestiae voluptatum tempora
              neque temporibus, labore aspernatur natus omnis molestias? Quia
              deserunt debitis unde cum.
            </p>
            <Link to="/subjects/thissubject" className="goSubject">
              Fanni Boshlash{<ArrowRightOutlined />}
            </Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className="card">
            <div className="card-header">
              <div className="title">
                <Link to="">Title</Link>
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
              <Avatar
                size={50}
                src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
              />
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              quia, pariatur illum sunt quod culpa, molestiae voluptatum tempora
              neque temporibus, labore aspernatur natus omnis molestias? Quia
              deserunt debitis unde cum.
            </p>
            <Link className="goSubject" to="/subjects/thissubject">
              Link Button{<ArrowRightOutlined />}
            </Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className="card">
            <div className="card-header">
              <div className="title">
                <Link to="">Title</Link>
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
              <Avatar
                size={50}
                src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
              />
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              quia, pariatur illum sunt quod culpa, molestiae voluptatum tempora
              neque temporibus, labore aspernatur natus omnis molestias? Quia
              deserunt debitis unde cum.
            </p>
            <Link className="goSubject" to="/subjects/thissubject">
              Link Button{<ArrowRightOutlined />}
            </Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className="card">
            <div className="card-header">
              <div className="title">
                <Link to="">Title</Link>
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
              <Avatar
                size={50}
                src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
              />
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              quia, pariatur illum sunt quod culpa, molestiae voluptatum tempora
              neque temporibus, labore aspernatur natus omnis molestias? Quia
              deserunt debitis unde cum.
            </p>
            <Link className="goSubject" to="/subjects/thissubject">
              Link Button{<ArrowRightOutlined />}
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Subjects;

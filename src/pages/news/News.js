import React, { useEffect } from "react";
import { Row, Col, Tag, Pagination, Spin } from "antd";
import { Card } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./news.css";
import { NewsHeader } from "../../component/header";
import { observer, inject } from "mobx-react";
const { Meta } = Card;

const News = ({ posts: { fetchAll, result, loading } }) => {
  useEffect(() => {
    fetchAll({ params: { type: "news" } });
    return () => {};
  }, []);

  return (
    <>
      <NewsHeader />
      <div className="news-page-container content">
        <Spin spinning={loading}>
          <Row gutter={[20, 16]}>
            {Array.isArray(result.data)
              ? result.data.map((post, idx) => (
                  <Col key={idx} xs={12} md={8} lg={8} xl={6} xxl={6}>
                    <Card
                      className="news-card"
                      cover={<img alt="example" src={`/assets/news.png`} />}
                    >
                      <Meta
                        title={
                          <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        }
                        description={
                          <p>
                            <span className="time">{post.publish_at}</span>
                            <Tag icon={<EyeFilled />}>{post.view_count}</Tag>
                          </p>
                        }
                      />
                    </Card>
                  </Col>
                ))
              : null}
            {Array.isArray(result.data) && result.data.length ? (
              <Col className="pagination" span={24}>
                <Pagination
                  defaultCurrent={result.per_page ? result.per_page : 9}
                  current={result.current_page ? result.current_page : 1}
                  total={result.total ? result.total : 0}
                  showSizeChanger={false}
                />
              </Col>
            ) : null}
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default inject("posts")(observer(News));

import React, { useEffect } from "react";
import { Row, Col, Tag, Spin } from "antd";
import { EyeFilled } from "@ant-design/icons";
import "./news.css";
import { NewsHeader } from "../../component/header";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";

const OneNews = (props) => {
  const { id } = useParams();
  const {
    posts: { fetchOne, single, loading },
  } = props;

  useEffect(() => {
    fetchOne({ id });
  }, [id, fetchOne]);

  return (
    <>
      <NewsHeader />
      <div className="news-container content">
        <Spin spinning={loading}>
          <Row justify="center">
            <Col xs={24} lg={16} xl={14} xxl={12}>
              {!!single.img && (
                <div className="for-img">
                  <img src={`${single.img}`} alt={single.title} />
                </div>
              )}
              <h1>{single.title || ""}</h1>
              <p className="for-data-tag">
                <span className="time">{single.publish_at || ""}</span>
                {!!single.view_count && (
                  <Tag icon={<EyeFilled />}>{single.view_count}</Tag>
                )}
              </p>
              {!!single.description && (
                <div className="description sun-editor-editable">
                  {HtmlParser(single.description)}
                </div>
              )}
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default inject("posts")(observer(OneNews));

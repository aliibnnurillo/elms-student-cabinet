import React, { useEffect } from "react";
import { Row, Col, Tag, Spin } from "antd";
import { EyeFilled } from "@ant-design/icons";
import "./news.css";
import { NewsHeader } from "../../component/header";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";

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
              {single.img ? (
                <div className="for-img">
                  <img src={`${single.img}`} alt={single.title} />
                </div>
              ) : null}
              <h1>{single.title ? single.title : null}</h1>
              <p className="for-data-tag">
                <span className="time">
                  {single.publish_at ? single.publish_at : null}
                </span>
                {single.view_count ? (
                  <Tag icon={<EyeFilled />}>{single.view_count}</Tag>
                ) : null}
              </p>
              {single.description ? (
                <div className="description">
                  <ReactQuill
                    readOnly
                    defaultValue={single.description}
                    modules={{ toolbar: false }}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default inject("posts")(observer(OneNews));

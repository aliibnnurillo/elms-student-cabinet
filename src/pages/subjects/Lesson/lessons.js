import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import {
  Row,
  Input,
  Col,
  List,
  Button,
  Comment,
  Form,
  Avatar,
  Anchor,
  Spin,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import StepsBlock from "./steps";
import { SubjectsHeader } from "../../../component/header";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";

const { Link } = Anchor;

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item className="write-comment">
      <TextArea
        rows={1}
        cols={24}
        onChange={onChange}
        value={value}
        placeholder="Sharh qoldirish"
      />
      <Button
        type="link"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        className="comment-send"
      >
        <SendOutlined />
      </Button>
    </Form.Item>
  </>
);

const Lesson = ({
  subjects: { loading, fetchLesson, currentLesson, single, fetchOne },
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const aa = useParams();
  useEffect(() => {
    console.log(aa);
    fetchOne(aa.subjectId);
  }, []);
  const handleSubmit = () => {
    if (!value) {
      return;
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="tasks">
          <Spin spinning={loading}>
            <Row gutter={20}>
              <Col span={6}>
                <div className="task-list">
                  <Anchor className="task-menu">
                    {Array.isArray(single.module)
                      ? single.module.map((module, idx) => {
                          return (
                            <Link
                              key={idx}
                              href={`#${idx + 1}`}
                              className="lesson-name"
                              title={`${idx + 1} ${
                                module.name.length > 30
                                  ? `${module.name.substr(0, 29)}...`
                                  : module.name
                              }`}
                            >
                              {Array.isArray(module.lessons)
                                ? module.lessons.map((lesson, index) => (
                                    <Link
                                      key={lesson.id}
                                      href={`#${idx + 1}.${index + 1}`}
                                      title={`${idx + 1}.${index + 1} ${
                                        module.name.length > 32
                                          ? `${module.name.substr(0, 31)}...`
                                          : module.name
                                      }`}
                                    />
                                  ))
                                : null}
                            </Link>
                          );
                        })
                      : null}
                  </Anchor>
                </div>
              </Col>
              <Col span={18}>
                <Row>
                  <StepsBlock />

                  <Col span={18} offset={3} className="comments-list">
                    <h3>{comments.length}-ta sharh</h3>
                    <>
                      <Comment
                        avatar={
                          <Avatar
                            src="/assets/userimg.jpg"
                            alt="Alisher Saidov"
                            size={40}
                          />
                        }
                        content={
                          <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                          />
                        }
                      />
                      {comments.length > 0 && (
                        <CommentList comments={comments} />
                      )}
                    </>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default inject("subjects")(observer(Lesson));

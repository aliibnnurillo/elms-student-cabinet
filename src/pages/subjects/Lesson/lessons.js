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
import { useParams, useHistory, useLocation } from "react-router-dom";
import LessonItem from "./lessonItems";

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
  subjects: {
    loading,
    fetchLesson,
    currentLesson,
    fetchLessonItems,
    lessonItems,
    fetchLessonResources,
    single,
    fetchOne,
  },
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const { semesterId, subjectId, id } = useParams();
  const his = useHistory();
  const { hash } = useLocation();
  useEffect(() => {
    console.log(semesterId, subjectId, hash);

    fetchOne(subjectId);
  }, []);

  useEffect(() => {
    if (!hash) {
      single &&
        Array.isArray(single.module) &&
        single.module.length &&
        Array.isArray(single.module[0].lessons) &&
        single.module[0].lessons.length &&
        fetchLessonItems({
          semesterId,
          subjectId,
          lessonId: single.module[0].lessons[0].id,
        });
    } else fetchLessonItems({ semesterId, subjectId, lessonId: hash.slice(1) });
    // fetchLessonResources({ semesterId, subjectId, lessonId: hash.slice(1) });
  }, [hash, semesterId, subjectId, fetchLessonItems, fetchLessonResources]);

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
                  <Anchor
                    className="task-menu"
                    onClick={(e, link) => {
                      console.log(link);
                    }}
                  >
                    {Array.isArray(single.module)
                      ? single.module.map((module, idx, modules) => {
                          return (
                            <Link
                              key={idx}
                              onClick={(e) => {
                                e.prevendDefault();
                                alert("ass");
                              }}
                              href={`#${modules[idx].lessons[0].id}`}
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
                                      href={`#${lesson.id}`}
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
                {lessonItems.length ? (
                  <Row>
                    <Col span={18} offset={3}>
                      <LessonItem />
                    </Col>
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
                ) : !loading ? (
                  <h2>Hali bu dars uchun ma'lumot yuklanmagan.</h2>
                ) : null}
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default inject("subjects")(observer(Lesson));

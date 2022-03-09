import React, { useEffect } from "react";
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
  Spin,
} from "antd";
import {
  SendOutlined,
  PictureOutlined,
  FileZipOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  UnorderedListOutlined,
  FileUnknownOutlined,
} from "@ant-design/icons";
import { SubjectsHeader } from "../../../component/header";
import { inject, observer } from "mobx-react";
import {
  useParams,
  useHistory,
  useLocation,
  Link,
  NavLink,
} from "react-router-dom";
import LessonItem from "./lessonItems";
import {
  extractFirstCharacter,
  getUser,
  isExistUser,
} from "../../../common/utils/utils";
import { useTranslation } from "react-i18next";
import UserAvatar from "../../../component/UserAvatar";

import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => (
      <Comment
        {...props}
        avatar={
          props.avatar ? (
            <Avatar src={props.avatar} alt={props.author} size="large" />
          ) : (
            <Avatar size="large">
              {extractFirstCharacter(props.author).toUpperCase()}
            </Avatar>
          )
        }
      />
    )}
  />
);

const Editor = ({ onSubmit, submitting, lessonId }) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) {
      return;
    }
    onSubmit(lessonId, value).then(() => {
      setValue("");
    });
  };

  return (
    <>
      <Form.Item className="write-comment">
        <TextArea
          rows={1}
          autoSize
          cols={24}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Sharh qoldirish"
        />
        <Button
          type="link"
          loading={submitting}
          onClick={handleSubmit}
          className="comment-send"
        >
          <SendOutlined />
        </Button>
      </Form.Item>
    </>
  );
};

const Lesson = (props) => {
  const {
    subjects: {
      loading,
      fetchLesson,
      currentLesson,
      fetchLessonItems,
      lessonItems,
      single,
      fetchOne,
      fetchComments,
      comments,
      saveComment,
      resourceFiles,
      fetchLessonResources,
      fetchSemesterSubjects,
      allowCommentToLesson,
    },
    authStore: { activeSemesterId },
    glo: { checkIsAvailableChoice, setChoiceOfSubject },
  } = props;

  const { semesterId, subjectId, id } = useParams();
  const { hash, pathname } = useLocation();
  const styleOne = {
    display: "none",
    height: "0px",
    overflow: "hidden",
    transition: "0.5s",
  };
  const styleTwo = {
    display: "block",
    height: "auto",
    overflow: "none",
    transition: "0.5s",
  };

  useEffect(() => {
    fetchSemesterSubjects({ activeSemesterId });
    fetchOne(subjectId, activeSemesterId).then((res) => {
      fetchLessonItems({ semesterId, subjectId, lessonId: id });
      fetchLessonResources({
        semesterId,
        subjectId,
        lessonId: id,
      });

      setChoiceOfSubject(props.subjects.single.choice_of_subject);

      fetchComments(id);
    });
    checkIsAvailableChoice();
  }, [activeSemesterId]);
  const [all, setAll] = useState(false);

  const [t] = useTranslation();

  useEffect(() => {
    fetchLessonItems({ semesterId, subjectId, lessonId: id });
    fetchLessonResources({
      semesterId,
      subjectId,
      lessonId: id,
    });
  }, [id, semesterId, subjectId, fetchLessonItems, fetchLessonResources]);

  const allTheme = () => {
    setAll(!all);
  };
  const setstyle = () => {
    return window.innerWidth < 768 && !all ? styleOne : styleTwo;
  };

  const closeAllTheme = () => {
    if (window.innerWidth < 768) {
      setAll(false);
    }
  };

  const history = useHistory();
  const onNextLesson = () => {
    let currentLessonId = +id;
    const nextLessonId = currentLessonId + 1;
    history.push(`/${semesterId}/subjects/${subjectId}/${nextLessonId}`);
  };

  return (
    <>
      <SubjectsHeader />
      <div
        style={{ marginLeft: 100, padding: "0 25px" }}
        className={"m-24 d-flex justify-between w-100"}
      >
        <Link to={`/${semesterId}/subjects/${id}/exam-schedules/2`}>
          Oraliq nazorat
        </Link>
        <Link to={`/${semesterId}/subjects/${id}/exam-schedules/3`}>
          Yakuniy nazorat
        </Link>
      </div>
      <div className="content">
        <div className="tasks">
          <Spin spinning={loading}>
            <Row gutter={[48, 20]}>
              <Col xs={24} md={8} lg={5}>
                <div className="task-list">
                  <button
                    className={`all-theme-button${all ? " active" : ""}`}
                    onClick={allTheme}
                  >
                    <span>
                      <UnorderedListOutlined />
                    </span>
                  </button>
                  <ul className="task-menu " style={setstyle()}>
                    {Array.isArray(single.module)
                      ? single.module.map((module, idx, modules) => {
                          return (
                            <li key={idx} className="les-items">
                              <h3
                                className="lesson-name"
                                title={`${idx + 1} ${module.name}`}
                              >{`${idx + 1} ${module.name}`}</h3>
                              {Array.isArray(module.lessons)
                                ? module.lessons.map((lesson, index) => (
                                    <NavLink
                                      className="les-item-link"
                                      key={lesson.id}
                                      isActive={(loc, moc) => {
                                        return moc.pathname.includes(lesson.id);
                                      }}
                                      onClick={
                                        (() => {
                                          window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                          });
                                        },
                                        closeAllTheme)
                                      }
                                      to={`/${semesterId}/subjects/${subjectId}/${lesson.id}`}
                                      title={`${idx + 1}.${index + 1} ${
                                        lesson.name
                                      }`}
                                    >
                                      <span>
                                        {`${idx + 1}.${index + 1} ${
                                          lesson.name
                                        }`}
                                      </span>
                                    </NavLink>
                                  ))
                                : null}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </Col>
              <Col xs={24} md={16} lg={19}>
                {lessonItems.length ? (
                  <Row>
                    <Col xs={24} lg={{ span: 20 }} xxl={{ span: 18 }}>
                      <LessonItem lessonId={id} />
                    </Col>

                    <Col xs={24} lg={{ span: 20 }} xxl={{ span: 18 }}>
                      <div
                        style={{
                          backgroundColor: "#F3F4FF",
                          height: 3,
                          margin: "40px 0",
                        }}
                      ></div>
                      <div className="text-center">
                        <Button className="btn-success" onClick={onNextLesson}>
                          {t("Keyingi dars")}
                        </Button>
                      </div>
                      <div
                        style={{
                          backgroundColor: "#F3F4FF",
                          height: 3,
                          margin: "40px 0",
                        }}
                      ></div>
                    </Col>
                    {allowCommentToLesson ? (
                      <Col
                        xs={24}
                        lg={{ span: 20 }}
                        xxl={{ span: 18 }}
                        className="comments-list"
                      >
                        <h3>
                          {comments.length}-{t("ta sharh")}
                        </h3>
                        <>
                          <Comment
                            avatar={
                              <UserAvatar
                                user={isExistUser() ? getUser() : {}}
                              />
                            }
                            content={
                              <Editor
                                onSubmit={saveComment}
                                submitting={loading}
                                lessonId={id}
                              />
                            }
                          />
                          {comments.length > 0 && (
                            <CommentList comments={comments} />
                          )}
                        </>
                      </Col>
                    ) : null}
                  </Row>
                ) : !loading ? (
                  <h2>{t("Hali bu dars uchun ma'lumot yuklanmagan.")}</h2>
                ) : null}
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default inject("subjects", "glo", "authStore")(observer(Lesson));

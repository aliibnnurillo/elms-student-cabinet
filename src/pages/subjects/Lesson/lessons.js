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
      semesterSubjects,
    },
    glo: { checkIsAvailableChoice, fetchChoiceOfSubject, setChoiceOfSubject },
  } = props;

  const { semesterId, subjectId, id } = useParams();
  const { hash, pathname } = useLocation();

  useEffect(() => {
    console.log(semesterId, subjectId, hash);
    fetchSemesterSubjects();
    fetchOne(subjectId).then((res) => {
      if (hash) {
        fetchLessonItems({ semesterId, subjectId, lessonId: hash.slice(1) });
        fetchLessonResources({
          semesterId,
          subjectId,
          lessonId: hash.slice(1),
        });

        console.log("choice of subject => ", single);
        setChoiceOfSubject(props.subjects.single.choice_of_subject);

        fetchComments(id);
      }
    });
    checkIsAvailableChoice();
  }, []);

  const [t] = useTranslation();

  useEffect(() => {
    if (hash) {
      fetchLessonItems({ semesterId, subjectId, lessonId: hash.slice(1) });
      fetchLessonResources({
        semesterId,
        subjectId,
        lessonId: hash.slice(1),
      });
    }
  }, [hash, semesterId, subjectId, fetchLessonItems, fetchLessonResources]);

  const history = useHistory();
  const onNextLesson = () => {
    if (hash) {
      let currentLessonId = +hash.slice(1);
      const nextLessonId = currentLessonId + 1;
      history.push(`${pathname}#${nextLessonId}`);
    }
  };
  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="tasks">
          <Spin spinning={loading}>
            <Row gutter={[48, 20]}>
              <Col xs={24} md={8} lg={5}>
                <div className="task-list">
                  <ul className="task-menu ">
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
                                      isActive={(loc, moc, cok) => {
                                        return moc.hash === `#${lesson.id}`;
                                      }}
                                      to={`#${lesson.id}`}
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
                    {Array.isArray(resourceFiles) && resourceFiles.length ? (
                      <Col xs={24} lg={{ span: 20 }} xxl={{ span: 18 }}>
                        <h2>{t("Darsga doir resurslar")}</h2>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {resourceFiles.map((resource) => {
                            let IconType = "";
                            const _item = resource.media[0];
                            switch (_item.extension) {
                              case "zip":
                                IconType = FileZipOutlined;
                                break;
                              case "png":
                              case "jpg":
                              case "jpeg":
                                IconType = PictureOutlined;
                                break;
                              case "pdf":
                                IconType = FilePdfOutlined;
                                break;
                              case "doc":
                              case "docx":
                                IconType = FileWordOutlined;
                                break;
                              default:
                                IconType = FileUnknownOutlined;
                                break;
                            }
                            return (
                              <div
                                key={resource.id}
                                style={{
                                  backgroundColor: "#F3F4FF",
                                  display: "flex",
                                  borderRadius: 12,
                                  alignItems: "center",
                                  padding: 12,
                                  margin: 6,
                                }}
                              >
                                <span
                                  className="icon-wrapper bg-white"
                                  style={{ marginRight: 12 }}
                                >
                                  <IconType />
                                </span>
                                <Link
                                  to={resource.file_url_resource}
                                  target="_blank"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    window.open(resource.file_url_resource);
                                  }}
                                >
                                  {resource.fileName
                                    ? resource.fileName
                                    : "Fayl"}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    ) : null}
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
                            <UserAvatar user={isExistUser() ? getUser() : {}} />
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

export default inject("subjects", "glo")(observer(Lesson));

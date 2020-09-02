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
  Anchor,
  Spin,
} from "antd";
import {
  SendOutlined,
  PictureOutlined,
  FileZipOutlined,
  FileTextFilled,
  FileWordOutlined,
} from "@ant-design/icons";
import { SubjectsHeader } from "../../../component/header";
import { inject, observer } from "mobx-react";
import { useParams, useLocation, Link } from "react-router-dom";
import LessonItem from "./lessonItems";
import {
  extractFirstCharacter,
  getUser,
  isExistUser,
} from "../../../common/utils/utils";
import { useTranslation } from "react-i18next";
import UserAvatar from "../../../component/UserAvatar";

const AnchorLink = Anchor.Link;

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

const Lesson = ({
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
  },
}) => {
  const { semesterId, subjectId, id } = useParams();
  const { hash } = useLocation();
  useEffect(() => {
    console.log(semesterId, subjectId, hash);

    fetchOne(subjectId).then((res) => {
      if (hash) {
        fetchLessonItems({ semesterId, subjectId, lessonId: hash.slice(1) });
        fetchLessonResources({
          semesterId,
          subjectId,
          lessonId: hash.slice(1),
        });
      } else
        fetchLessonItems({
          semesterId,
          subjectId,
          lessonId: id,
        });
      fetchLessonResources({
        semesterId,
        subjectId,
        lessonId: hash.slice(1),
      });
      fetchComments(id);
    });
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

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="tasks">
          <Spin spinning={loading}>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={8} lg={7}>
                <div className="task-list">
                  <Anchor
                    className="task-menu"
                    onClick={(e, link) => {
                      console.log(link);
                    }}
                    affix={false}
                  >
                    {Array.isArray(single.module)
                      ? single.module.map((module, idx, modules) => {
                          return (
                            <AnchorLink
                              key={idx}
                              onClick={(e) => {
                                e.prevendDefault();
                                alert("ass");
                              }}
                              href={`#${modules[idx].lessons[0].id}`}
                              className="lesson-name"
                              title={`${idx + 1} ${module.name}`}
                            >
                              {Array.isArray(module.lessons)
                                ? module.lessons.map((lesson, index) => (
                                    <AnchorLink
                                      key={lesson.id}
                                      href={`#${lesson.id}`}
                                      title={`${idx + 1}.${index + 1} ${
                                        lesson.name
                                      }`}
                                    />
                                  ))
                                : null}
                            </AnchorLink>
                          );
                        })
                      : null}
                  </Anchor>
                </div>
              </Col>
              <Col xs={24} md={16} lg={17}>
                {lessonItems.length ? (
                  <Row>
                    <Col
                      xs={24}
                      lg={{ offset: 1, span: 20 }}
                      xxl={{ offset: 2, span: 16 }}
                    >
                      <LessonItem lessonId={id} />
                    </Col>
                    <Col
                      xs={24}
                      lg={{ offset: 1, span: 20 }}
                      xxl={{ offset: 2, span: 16 }}
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
                    <Col
                      xs={24}
                      lg={{ offset: 1, span: 20 }}
                      xxl={{ offset: 2, span: 16 }}
                    >
                      <h2>{t("Darsga doir resurslar")}</h2>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                              IconType = FileTextFilled;
                              break;
                            case "doc":
                            case "docx":
                              IconType = FileWordOutlined;
                              break;
                            default:
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
                                {resource.fileName ? resource.fileName : "Fayl"}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
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

export default inject("subjects")(observer(Lesson));

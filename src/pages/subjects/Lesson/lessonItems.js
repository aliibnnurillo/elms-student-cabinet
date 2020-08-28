import React, { useState, useEffect } from "react";
import {
  Tabs,
  message,
  Tag,
  Button,
  Collapse,
  Upload,
  Radio,
  Spin,
} from "antd";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { Player } from "video-react";
import "./lesson.css";
import moment from "moment";
import {
  FileTextFilled,
  VideoCameraFilled,
  FileUnknownFilled,
  CheckSquareFilled,
  FileZipOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { UploadIcon } from "../../../component/icons";
import { API_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const UploadDragger = ({
  questionFiles,
  setResource,
  setQuestionFiles,
  removeQuestionFile,
  t,
}) => {
  const uploadProps = {
    action: `${API_URL}/resources/storeFile`,
    name: "files[]",
    fileList: questionFiles,
    listType: "picture",
    onSuccess(ret, file) {
      if (Array.isArray(ret.result) && ret.result.length) {
        console.log("file onsuccess => ", ret.result[0]);
        setQuestionFiles([...questionFiles, file]);
        setResource(ret.result[0]);
      }
    },
    onRemove(file) {
      removeQuestionFile(file.uid);
      setResource(null);
    },
  };
  return (
    <Dragger {...uploadProps} className="upload_file_block">
      <div className="ant-upload-drag-icon">
        <UploadIcon style={{ color: "hotpink" }} />
        <h3>{t("Fayl yuklash")}</h3>
      </div>
      <p className="ant-upload-text">
        <Tag>pdf</Tag>
        <Tag>word</Tag>
        <Tag>jpeg</Tag>
        <Tag>png</Tag>
        <Tag>zip</Tag>
        <Tag>rar</Tag>
      </p>
      <p className="ant-upload-hint">Max: 10mb</p>
    </Dragger>
  );
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
function callback(key) {
  console.log(key);
}

const { Dragger } = Upload;
const { Panel } = Collapse;

const QuizItem = inject("subjects")(
  observer(
    ({
      subjects: {
        questionFiles,
        saveQuestionFile,
        fetchOldQuestionFiles,
        setQuestionFiles,
        removeQuestionFile,
        oldQuestionFiles,
        loading,
      },
      data,
      lessonId,
    }) => {
      useEffect(() => {
        fetchOldQuestionFiles(data.id);
      }, [lessonId, fetchOldQuestionFiles]);

      const [resource, setResource] = useState(null);
      const [t] = useTranslation();

      const handleSubmit = () => {
        if (!resource) {
          return;
        }

        saveQuestionFile(data.id, resource.id);
      };

      console.log(
        "old questjion  fjaskfjkdslfjdskfjksfjklsaj fsa- x",
        oldQuestionFiles
      );

      return (
        <div>
          <div className="upload-file">
            <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
            <div className="upload-block">
              <h3 className="upload-title">{t("Javob")}</h3>
              <UploadDragger
                questionFiles={questionFiles}
                setResource={setResource}
                t={t}
                setQuestionFiles={setQuestionFiles}
                removeQuestionFile={removeQuestionFile}
              />
              <p className="confirm">
                <Button className="confirm-button" onClick={handleSubmit}>
                  {t("Tasdiqlash")}
                </Button>
              </p>
              <h4>{t("Eski javoblar")}</h4>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={callback}
                expandIconPosition={"right"}
              >
                {oldQuestionFiles.map((item, idx) => {
                  return (
                    <Panel header={item.created_at} key={item.id}>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {item.question_attempt_resource.map((resource) => {
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
                            default:
                              break;
                          }
                          return (
                            <div
                              key={resource.id}
                              style={{
                                backgroundColor: "#F3F4FF",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                borderRadius: 12,
                                alignItems: "center",
                                padding: 6,
                                width: 140,
                                height: 140,
                                margin: 6,
                              }}
                            >
                              <span className="icon-wrapper bg-white">
                                <IconType />
                              </span>
                              {resource.file_url_resource.length > 20 ? (
                                <Link
                                  to={resource.file_url_resource}
                                  target="_blank"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    window.open(resource.file_url_resource);
                                  }}
                                >
                                  {`${resource.file_url_resource.slice(
                                    0,
                                    13
                                  )}... .${_item.extension}`}
                                </Link>
                              ) : (
                                <Link
                                  to={resource.file_url_resource}
                                  target="_blank"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    window.open(resource.file_url_resource);
                                  }}
                                >
                                  {resource.file_url_resource}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
          </div>
        </div>
      );
    }
  )
);

const TestItem = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const [valueone, setValueone] = useState("");

  const next = () => {
    setCurrent(current + 1);
  };

  console.log(data);
  const onChangeOne = (e) => {
    console.log("radio1 checked", e.target.value);
    setValueone(e.target.value);
  };
  return (
    <div>
      <div className="question-test">
        <h2>
          Test savoli <span>3/10</span>
        </h2>
        <p className="question">
          Merosxo'rlik turlari to'gri ko'rsatilgan javobni tanlang
        </p>

        <Radio.Group options={data} onChange={onChangeOne} value={valueone} />

        <p className="next">
          <Button>Keyingi savol</Button>
        </p>
      </div>
    </div>
  );
};

function LessonItem(props) {
  const {
    subjects: { lessonItems },
    lessonId,
  } = props;
  const callback = (key) => {
    console.log(key);
  };
  console.log(lessonItems);
  return (
    <div sytle={{ width: "100%" }}>
      <Tabs onChange={callback} type="card">
        {lessonItems.map((item, idx) => {
          return item.type === "text" && item.text ? (
            <TabPane
              tab={
                <span>
                  <FileTextFilled />
                </span>
              }
              key={idx}
            >
              {item.text ? (
                <p dangerouslySetInnerHTML={{ __html: item.text }}></p>
              ) : null}
            </TabPane>
          ) : item.type === "video" && item.file_url_video ? (
            <TabPane
              tab={
                <span>
                  <VideoCameraFilled />
                </span>
              }
              key={idx}
            >
              <div className="videos">
                <Player
                  playsInline
                  poster="/photo.png"
                  src={item.file_url_video}
                />
              </div>
            </TabPane>
          ) : item.type === "question-answer" ? (
            <TabPane
              tab={
                <span>
                  <FileUnknownFilled />
                </span>
              }
              key={idx}
            >
              <QuizItem lessonId={lessonId} data={item} />
            </TabPane>
          ) : item.type === "test" ? (
            <TabPane
              tab={
                <span>
                  <CheckSquareFilled />
                </span>
              }
              key={idx}
            >
              <TestItem data={item} />
            </TabPane>
          ) : null;
        })}
      </Tabs>
    </div>
  );
}

LessonItem.propTypes = {};

export default inject("subjects")(observer(LessonItem));

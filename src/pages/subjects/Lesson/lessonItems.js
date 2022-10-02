import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  message,
  Tag,
  Button,
  Collapse,
  Upload,
  Radio,
  Carousel,
  Table,
  Divider,
  Select,
  Alert,
  Space,
} from "antd";
import { observer, inject } from "mobx-react";
import { Player, ControlBar } from "video-react";
import "./lesson.css";
import {
  FileTextFilled,
  VideoCameraFilled,
  FileUnknownFilled,
  CheckSquareFilled,
  FileZipOutlined,
  PictureOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { UploadIcon, Checked, Canceled } from "component/icons";
import { API_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import LessonFiles from "./lessonFiles";
import { formatBytes } from "common/services/common";

import ModalImage, { Lightbox } from "react-modal-image";
import moment from "moment";
import { get } from "lodash";

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
      <p className="ant-upload-text text-center">
        <Tag>pdf</Tag>
        <Tag>word</Tag>
        <Tag>jpeg</Tag>
        <Tag>png</Tag>
        <Tag>zip</Tag>
        <Tag>rar</Tag>
      </p>
      <p className="ant-upload-hint text-center">Max: 10mb</p>
    </Dragger>
  );
};

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
        single,
        semesterSubjects,
        resourceFiles,
      },
      data,
      lessonId,
    }) => {
      useEffect(() => {
        fetchOldQuestionFiles(data.id);
      }, [lessonId, fetchOldQuestionFiles]);
      useEffect(() => {
                setQuestionFiles([])
      }, [data.id]);

      const [resource, setResource] = useState(null);
      const [t] = useTranslation();

      const handleSubmit = () => {
        if (!resource) {
          return;
        }

        saveQuestionFile(data.id, resource.id);
      };

      if (
        !get(data, "syllabus_module_lesson.deadline_check") &&
        !!get(data, "deadline_date")
      ) {
        return (
          <div>
            {/* <div>deadline  {get(data, 'deadline_date')} da tugagan</div> */}
            <Alert
              message={`deadline ${get(data, "deadline_date")} da tugagan!`}
            />
          </div>
        );
      }

      return single.choice_of_subject &&
        semesterSubjects.filter(
          (item) => item.choice_of_subject === single.choice_of_subject
        ).length > 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LockOutlined style={{ color: "red", fontSize: 150 }} />
          <p>
            {t(
              "Bu tanlanadigan fan. Kontentni ko'rish uchun tanlovni amalga oshirishingiz kerak!"
            )}
          </p>
        </div>
      ) : (
        <div>
          <div className="upload-file">
            <div className="sun-editor-editable">
              <div dangerouslySetInnerHTML={{ __html: data.text }} />
            </div>
            <LessonFiles resourceFiles={resourceFiles} />
            {!!get(data, "deadline_date") && (
              <div style={{ margin: "10px 0" }}>
                <Alert
                  message={`deadline tugash vaqti ${get(
                    data,
                    "deadline_date"
                  )} ga qadar`}
                />
              </div>
            )}

            <div className="upload-block">
              {!!get(data, "deadline_date") && (
                <>
                  <h3 className="upload-title">{t("Javob")}</h3>
                  <UploadDragger
                    questionFiles={questionFiles}
                    setResource={setResource}
                    t={t}
                    setQuestionFiles={setQuestionFiles}
                    removeQuestionFile={removeQuestionFile}
                  />
                  <p className="confirm">
                    <Button
                      disabled={!resource}
                      className="confirm-button"
                      onClick={handleSubmit}
                    >
                      {t("Tasdiqlash")}
                    </Button>
                  </p>
                  <h4>{t("Eski javoblar")}</h4>
                </>
              )}
              <Collapse
                defaultActiveKey={["1"]}
                onChange={callback}
                expandIconPosition={"right"}
              >
                {oldQuestionFiles.map((item, idx) => {
                  return (
                    <Panel
                      header={
                        <div className="flex-between">
                          <div className="d-flex align-items-center">
                            {item.status ? <Checked /> : <Canceled />}
                            <span style={{ marginLeft: 12 }}>
                              {item.created_at}
                            </span>
                          </div>
                          {!!item.mark && <div>{item.mark} ball</div>}
                        </div>
                      }
                      key={item.id}
                    >
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
                              IconType = FileUnknownFilled;
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
                              <span className="icon-wrapper bg-white shadowed">
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

const columnsForTestResult = [
  { title: "Urinish", align: "center", dataIndex: "count_of_attempts" },
  {
    title: "Talaba",
    dataIndex: "fio",
  },
  { title: "Jami", dataIndex: "test_total" },
  { title: "To'g'ri", dataIndex: "test_answered" },
  { title: "Noto'g'ri", dataIndex: "test_un_answered" },
  {
    title: "Ball",
    dataIndex: "mark",
    render: (cell) => (cell ? cell : null),
  },
  { title: "Sana", dataIndex: "test_date" },
];

const TestItem = ({
  data,
  sendAnswerToTestQuestion,
  single,
  semesterSubjects,
  completeTest,
  testResult,
  resourceFiles,
  isTestCompleted,
  isTestStarted,
  setIsTestCompleted,
  setIsTestStarted,
}) => {
  const [current, setCurrent] = useState(0);
  const [valueone, setValueone] = useState("");

  const [t] = useTranslation();

  const onChangeAnswer = (e) => {
    setValueone(e.target.value);
  };
  const onChange = (currentSlide) => {
    console.log("currentSlice", currentSlide);
    // if (current >= data.test_question.length - 1) {
    //   setCurrent(0);
    // } else if (current < 0) {
    //   setCurrent(0);
    // } else
    setCurrent(currentSlide);
  };
  console.log("current===", current);
  console.log("data.test_question.length", data.test_question.length);
  const carousel = useRef(null);

  console.log("caoruse ", carousel);

  const onSendAnswer = () => {
    if (!valueone) {
      message.error(t("Siz javob tanlamadingiz!"));
      return;
    }
    sendAnswerToTestQuestion(data.id, data.test_question[current].id, [
      valueone,
    ]).then((res) => {
      if (res.status === 200) {
        if (current + 1 !== data.test_question.length) {
          setValueone("");
          carousel.current.next();
        } else {
          completeTest(data.id);
          setCurrent(0);
        }
      }
    });
  };

  if (!get(data, "syllabus_module_lesson.deadline_check")) {
    return (
      <div>
        {/* <div>deadline  {get(data, 'deadline_date')} da tugagan</div> */}
        <Alert message={`deadline ${get(data, "deadline_date")} da tugagan!`} />
      </div>
    );
  }

  return single.choice_of_subject &&
    semesterSubjects.filter(
      (item) => item.choice_of_subject === single.choice_of_subject
    ).length > 1 ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <LockOutlined style={{ color: "red", fontSize: 150 }} />
      <p>
        {t(
          "Bu tanlanadigan fan. Kontentni ko'rish uchun tanlovni amalga oshirishingiz kerak!"
        )}
      </p>
    </div>
  ) : (
    <div>
      <LessonFiles resourceFiles={resourceFiles} />

      <div style={{ margin: "24px 0" }}>
        <Alert
          message={`deadline tugash vaqti ${get(
            data,
            "deadline_date"
          )} ga qadar`}
        />
      </div>

      <div className="question-test">
        {(isTestStarted || !isTestCompleted) &&
        data.count_of_attempts &&
        testResult.length < data.count_of_attempts ? (
          <>
            <h2>
              {t("Test savoli")}
              <span>
                {current + 1} / {data.test_question.length}
              </span>
            </h2>
            <Carousel ref={carousel} beforeChange={onChange}>
              {data.test_question.map((test) => {
                return (
                  <div key={test.id}>
                    <div className="sun-editor-editable question">
                      <div
                        dangerouslySetInnerHTML={{ __html: test.question }}
                      />
                    </div>
                    <Radio.Group onChange={onChangeAnswer} value={valueone}>
                      {test.test_answers.map((item, idx) => {
                        const regex = /<.+?>/g;
                        return (
                          <Radio value={item.value}>
                            {regex.test(item.label) ? (
                              <div className="sun-editor-editable">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.label,
                                  }}
                                />
                              </div>
                            ) : (
                              item.label
                            )}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </div>
                );
              })}
            </Carousel>
            <p className="next">
              <Button disabled={!valueone} onClick={onSendAnswer}>
                {current + 1 === data.test_question.length
                  ? t("Yakunlash")
                  : t("Keyingi savol")}
              </Button>
            </p>
          </>
        ) : (
          <div style={{ padding: "0 24px" }}>
            {testResult.length ? (
              <div>
                <div className="d-flex-c flex-column">
                  <h3>
                    {t('Urinishlar soni')}: {testResult.length} /&nbsp;
                    {data.count_of_attempts}
                  </h3>
                  {data.count_of_attempts > testResult.length ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => setIsTestCompleted(false)}
                      style={{ marginBottom: 24 }}
                    >
                     {t(' Qayta urinish')}
                    </Button>
                  ) : null}
                </div>
                <Table
                  title={() => "Test natijalari"}
                  columns={columnsForTestResult}
                  dataSource={testResult}
                  pagination={false}
                  rowKey={"id"}
                />
              </div>
            ) : (
              <div>
                <div className="d-flex-c flex-column">
                  {data.count_of_attempts ? (
                    <h3>{t('Urinishlar soni')}: {data.count_of_attempts}</h3>
                  ) : null}
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsTestStarted(true)}
                  >
                   { t('Testni boshlash')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const getVideoPath = (media, quality) => {
  let path = `https://api-elms.tuit.uz/storage/`;
  let current = media.find((item) => item.filename.startsWith(`${quality}-`));
  if (media.length === 1 && !current) {
    path += `${media[0].directory}/${media[0].filename}.${media[0].extension}`;
    return path;
  }
  path += `${current.directory}/${current.filename}.${current.extension}`;
  return path;
};

const getQualityName = (one) => {
  const name = one.pivot.tag.split("_");
  if (name.length < 2) {
    return null;
  }
  return name[1];
};

const VideoItem = (props) => {
  const { data } = props;
  const [path, setPath] = useState(getVideoPath(data.media, "240p"));
  const [videoQuality, setVideoQuality] = useState("240p");
  const onSelect = (quality) => {
    setVideoQuality(quality);
    setPath(getVideoPath(data.media, quality));
    if (ref && ref.current) {
      console.log("video => ", ref);
    }
  };
  const ref = useRef(null);
  return (
    <div className="videos">
      <Player src={path} ref={ref} autoPlay>
        <ControlBar>
          {Array.isArray(data.media) && data.media.length > 1 ? (
            <Select
              style={{ width: 130 }}
              value={videoQuality}
              onSelect={onSelect}
            >
              {data.media.map((item, idx) => {
                const name = getQualityName(item);
                return name ? (
                  <Select.Option key={idx} value={name}>
                    {`${name} (${formatBytes(item.size, 0)})`}
                  </Select.Option>
                ) : null;
              })}
            </Select>
          ) : null}
        </ControlBar>
      </Player>
    </div>
  );
};
const func1 = (showFunc, setUrlFunc) => {
  const wrapperTabPane = document.querySelector("#lessonItemWrapper");
  wrapperTabPane.addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG") {
      showFunc(true);
      setUrlFunc(e.target.src);
      console.log(e.target.src, e.target);
      // callback();
    }
  });
};
function LessonItem(props) {
  const {
    subjects: {
      lessonItems,
      fetchOneLessonItem,
      sendAnswerToTestQuestion,
      single,
      semesterSubjects,
      completeTest,
      testResult,
      activeItemId,
      setActiveItemId,
      isTestCompleted,
      getTestResult,
      setIsTestStarted,
      isTestStarted,
      resourceFiles,
      setIsTestCompleted,
    },
    glo: { setSubjectModalVisible, isAvailableChoice },
    lessonId,
  } = props;
  const { semId, subjectId } = useParams();
  const [t] = useTranslation();
  const { hash } = useLocation();
  const history = useHistory();
  const [currentImg, setCurrentImg] = useState("");
  const [modalImgOpen, setModalImgOpen] = useState(false);

  useEffect(() => {
    if (lessonItems.length) {
      if (hash) {
        const found = lessonItems.find((item) => +item.id === +hash.slice(1));

        found && setActiveItemId(`${found.id}=>${found.type}`);
      } else {
        setActiveItemId(`${lessonItems[0].id}=>${lessonItems[0].type}`);
      }
    }

    func1(setModalImgOpen, setCurrentImg);
  }, [lessonItems, hash]);

  useEffect(() => {
    if (!activeItemId) return;

    const [id, type] = activeItemId.split("=>");

    if (type !== "test") return;

    getTestResult(id);
  }, [activeItemId]);

  const callback = (key) => {
    const id = key.split("=>")[0];
    const type = key.split("=>")[1];
    const found = lessonItems.find((item) => +item.id === +id);
    setActiveItemId(key);
    history.push(history.location.pathname + "#" + id);
    if (type === "test" || type === "question-answer") {
      single.choice_of_subject &&
        isAvailableChoice &&
        semesterSubjects.filter(
          (item) => item.choice_of_subject === single.choice_of_subject
        ).length > 1 &&
        setSubjectModalVisible(true);
      return;
    }
    if (!found || found.read_total_lesson_item) {
      return;
    }
    fetchOneLessonItem({
      semId,
      subjectId,
      lessonId,
      id,
      type,
    });
  };

  return (
    <div sytle={{ width: "100%" }} id="lessonItemWrapper">
      {modalImgOpen && (
        <Lightbox
          hideDownload={true}
          hideZoom={true}
          small={currentImg}
          large={currentImg}
          onClose={() => setModalImgOpen(false)}
        />
      )}
      <Tabs onChange={callback} type="card" activeKey={activeItemId}>
        {lessonItems.map((item, idx) => {
          return item.type === "text" && item.text ? (
            <TabPane
              tab={
                <span
                  className={`tabIconWrapper ql-editor ${
                    item.read_total_lesson_item ? "read" : ""
                  }`}
                >
                  <FileTextFilled />
                </span>
              }
              key={`${item.id}=>text`}
            >
              {!!item.text && (
                <div className="sun-editor-editable">
                  <div dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              )}
              <LessonFiles resourceFiles={resourceFiles} />
            </TabPane>
          ) : item.type === "video" && item.file_url_video ? (
            <TabPane
              tab={
                <span
                  className={`tabIconWrapper ${
                    item.read_total_lesson_item ? "read" : ""
                  }`}
                >
                  <VideoCameraFilled />
                </span>
              }
              key={`${item.id}=>video`}
            >
              <VideoItem data={item} />
            </TabPane>
          ) : item.type === "question-answer" ? (
            <TabPane
              tab={
                <span
                  className={`tabIconWrapper ${
                    item.read_total_lesson_item ? "read" : ""
                  }`}
                >
                  <FileUnknownFilled />
                </span>
              }
              key={`${item.id}=>question-answer`}
            >
              <QuizItem lessonId={lessonId} data={item} />
            </TabPane>
          ) : item.type === "test" ? (
            !!get(item, "deadline_date") && (
              <TabPane
                tab={
                  <span
                    className={`tabIconWrapper ${
                      item.read_total_lesson_item ? "read" : ""
                    }`}
                  >
                    <CheckSquareFilled />
                  </span>
                }
                key={`${item.id}=>test`}
              >
                {Array.isArray(item.test_question) ? (
                  <TestItem
                    data={item}
                    single={single}
                    semesterSubjects={semesterSubjects}
                    sendAnswerToTestQuestion={sendAnswerToTestQuestion}
                    completeTest={completeTest}
                    testResult={testResult}
                    isTestCompleted={isTestCompleted}
                    isTestStarted={isTestStarted}
                    setIsTestStarted={setIsTestStarted}
                    setIsTestCompleted={setIsTestCompleted}
                  />
                ) : null}
              </TabPane>
            )
          ) : null;
        })}
      </Tabs>
    </div>
  );
}

LessonItem.propTypes = {};

export default inject("subjects", "glo")(observer(LessonItem));

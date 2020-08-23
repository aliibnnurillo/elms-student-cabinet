import React, { useState } from "react";
import { Tabs, message, Tag, Button, Collapse, Upload, Radio } from "antd";
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
} from "@ant-design/icons";
import { UploadIcon } from "../../../component/icons";

const { TabPane } = Tabs;

const element = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
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

const QuizItem = ({ data }) => {
  return (
    <div>
      <div className="upload-file">
        <h4>
          C++ dasturlash tilida matnni kirildan lotinga o’zgartirish algoritmini
          tuzish.
        </h4>
        <div className="upload-block">
          <h3 className="upload-title">Javob</h3>
          <Dragger {...element} className="upload_file_block">
            <p className="ant-upload-drag-icon">
              <UploadIcon style={{ color: "hotpink" }} />
              <h3>Fayl yuklash </h3>
            </p>
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
          <p className="confirm">
            <Button className="confirm-button">Tasdiqlash</Button>
          </p>
          <h4>Eski javoblar</h4>
          <Collapse
            defaultActiveKey={["1"]}
            onChange={callback}
            expandIconPosition={"right"}
          >
            <Panel header={moment().format("DD.MM.YYYY, h:mm:ss a")} key="1">
              <div>{text}</div>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <div>{text}</div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    label: "public, private va polimorfizm",
    value: 1,
  },
  {
    label: "public, private va protected",
    value: 2,
  },
  {
    label: "throw, try  va catch",
    value: 3,
  },
];

const TestItem = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const [valueone, setValueone] = useState("");

  const next = () => {
    setCurrent(current + 1);
  };

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
              <Player
                playsInline
                poster="/photo.png"
                src={item.file_url_video}
              />
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
              <QuizItem />
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
              <TestItem />
            </TabPane>
          ) : null;
        })}
      </Tabs>
    </div>
  );
}

LessonItem.propTypes = {};

export default inject("subjects")(observer(LessonItem));

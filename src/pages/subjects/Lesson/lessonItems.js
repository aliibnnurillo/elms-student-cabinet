import React from "react";
import { Tabs } from "antd";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { Player } from "video-react";
import "./lesson.css";

import {
  FileTextFilled,
  VideoCameraFilled,
  FileUnknownFilled,
  CheckSquareFilled,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const TextTabPane = ({ key, data }) => (
  <TabPane
    tab={
      <span>
        <FileTextFilled />
        salom
      </span>
    }
    key={key}
  >
    {data.text ? <p dangerouslySetInnerHTML={{ __html: data.text }}></p> : null}
  </TabPane>
);

const VideoTabPane = ({ key, data }) => (
  <TabPane
    tab={
      <span>
        <VideoCameraFilled />
      </span>
    }
    key={key}
  >
    VIDEO CONTENT
  </TabPane>
);

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
          ) : null;
        })}
      </Tabs>
    </div>
  );
}

LessonItem.propTypes = {};

export default inject("subjects")(observer(LessonItem));

import React from "react";
import moment from "moment";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { useState } from "react";
import {
  Col,
  Steps,
  Button,
  message,
  Upload,
  Tag,
  Collapse,
  Radio,
} from "antd";
import "../subject.css";

import {
  FileTextFilled,
  VideoCameraFilled,
  FileUnknownFilled,
  CheckSquareFilled,
} from "@ant-design/icons";

import { UploadIcon } from "../../../component/icons";

const steps = [
  {
    title: "First",
    content: "Algoritmlash va dasturlashning asosiy tushunchalari.",
    icons: <FileTextFilled />,
  },
  {
    title: "Second",
    content: "Second-content",
    icons: <VideoCameraFilled />,
  },
  {
    title: "Last",
    content: "Last-content",
    icons: <FileTextFilled />,
  },
  {
    title: "Last",
    content: "Last-content",
    icons: <FileUnknownFilled />,
  },
  {
    title: "Last",
    content: "Last-content",
    icons: <CheckSquareFilled />,
  },
  {
    title: "Last",
    content: "Last-content",
    icons: <FileTextFilled />,
  },
];
const element = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
function callback(key) {
}

const { Dragger } = Upload;
const { Step } = Steps;
const { Panel } = Collapse;

const StepsBlock = () => {
  const [current, setCurrent] = useState(0);
  const [valueone, setValueone] = useState("");

  const next = () => {
    setCurrent(current + 1);
  };
  //   const genExtra = () => (

  //       onClick={(event) => {
  //         // If you don't want click extra trigger collapse, you can prevent this:
  //         event.stopPropagation();
  //       }}

  //   );
  const onChangeOne = (e) => {
    setValueone(e.target.value);
  };

  return (
    <>
      <Col span={18} offset={3}>
        <Steps current={current} className="steps-list">
          {steps.map((item) => (
            <Step key={item.title} icon={item.icons} />
          ))}
        </Steps>
        <div className="steps-content">
          <h2>Algoritmlash va dasturlashning asosiy tushunchalari.</h2>
          {current === 0 && (
            <div>
              <p>
                Ternar operator. Statik operator (sizeof). Qiymat o‘zlashtirish
                operatorlari va ularning ishlash usullari. Format
                modifikatorlari: printf(), scanf() funksiyalari. Simvollarni
                o‘qish va yozish. Algoritm va dasturlashning asosiy
                tushunchalari ochib beriladi. Jumladan: til alifbosi,
                identifikator, kalit so’zlar, satrli o’zgaruvchilar, ma’lumotlar
                toifasi, arifmetik ifoda va amallar, siljitish amallari,
                inkrement, decrement, kutubxonalar va ularning funksiyalari
                hamda preprotsessor direktivalaridan foydalanish usullari
                o’rganiladi.
              </p>
            </div>
          )}
          {current === 1 && (
            <div className="videos">
              <Player
                playsInline
                poster="./photo.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </div>
          )}
          {current === 2 && (
            <div>
              <h2>2.</h2>
            </div>
          )}
          {current === 3 && (
            <div className="upload-file">
              <h4>
                C++ dasturlash tilida matnni kirildan lotinga o’zgartirish
                algoritmini tuzish.
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
                  <Panel
                    header={moment().format("DD.MM.YYYY, h:mm:ss a")}
                    key="1"
                  >
                    <div>{text}</div>
                  </Panel>
                  <Panel header="This is panel header 2" key="2">
                    <div>{text}</div>
                  </Panel>
                </Collapse>
              </div>
            </div>
          )}
          {current === 4 && (
            <div className="question-test">
              <h2>
                Test savoli <span>3/10</span>
              </h2>
              <p className="question">
                Merosxo'rlik turlari to'gri ko'rsatilgan javobni tanlang
              </p>

              <Radio.Group
                options={data}
                onChange={onChangeOne}
                value={valueone}
              />

              <p className="next">
                <Button>Keyingi savol</Button>
              </p>
            </div>
          )}
        </div>
      </Col>

      <span className="line"></span>
      <Col
        span={18}
        offset={3}
        style={{ textAlign: "center" }}
        className="for-button"
      >
        {current < steps.length && (
          <Button onClick={next} className="button_next">
            Keyingi dars
          </Button>
        )}
        {current >= steps.length && (
          <Button className="button_next">Yakunlash</Button>
        )}
      </Col>
      <span className="line"></span>
    </>
  );
};

export default StepsBlock;

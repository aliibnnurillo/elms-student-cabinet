import React from "react";

import { useState } from "react";
import {
  Row,
  Input,
  Col,
  List,
  Steps,
  Button,
  Comment,
  Form,
  Avatar,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
const { Step } = Steps;
const { TextArea } = Input;

const lists = [
  {
    name: "Salom1",
    data_list: ["list1", "list2", "list3"],
  },
  {
    name: "Salom2",
    data_list: ["c", "c", "c"],
  },
  {
    name: "Salom3",
    data_list: ["d", "d", "d"],
  },
];
const steps = [
  {
    title: "First",
    content: "Algoritmlash va dasturlashning asosiy tushunchalari.",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Lesson = () => {
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState({
    submitting: false,
    comments: [],
    value: "",
  });

  const { submitting, comments, value } = state;
  const next = () => {
    setCurrent(current + 1);
  };
  const handleSubmit = () => {
    if (!state.value) {
      return;
    }

    setState({
      submitting: true,
    });

    setTimeout(() => {
      setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...state.comments,
        ],
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setState({
      value: e.target.value,
    });
  };

  return (
    <div className="tasks">
      <Row gutter={20}>
        <Col span={6}>
          <div className="task-list">
            <List
              dataSource={lists}
              renderItem={(item) => (
                <List.Item>
                  <p>{item.name}</p>
                  <List.Item></List.Item>

                  <Link />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={18}>
          <Row>
            <Col span={18} offset={3}>
              <Steps current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">
                {current === 0 && (
                  <div>
                    <h2>
                      Algoritmlash va dasturlashning asosiy tushunchalari.
                    </h2>
                    <p>
                      Ternar operator. Statik operator (sizeof). Qiymat
                      o‘zlashtirish operatorlari va ularning ishlash usullari.
                      Format modifikatorlari: printf(), scanf() funksiyalari.
                      Simvollarni o‘qish va yozish. Algoritm va dasturlashning
                      asosiy tushunchalari ochib beriladi. Jumladan: til
                      alifbosi, identifikator, kalit so’zlar, satrli
                      o’zgaruvchilar, ma’lumotlar toifasi, arifmetik ifoda va
                      amallar, siljitish amallari, inkrement, decrement,
                      kutubxonalar va ularning funksiyalari hamda preprotsessor
                      direktivalaridan foydalanish usullari o’rganiladi.
                    </p>
                  </div>
                )}
              </div>
            </Col>
            <hr
              style={{
                display: "block",
                width: "100%",
              }}
            />
            <Col span={18} offset={3}>
              <Button type="primary" onClick={next}>
                Next
              </Button>
            </Col>
            <hr
              style={{
                display: "block",
                width: "100%",
              }}
            />
            <Col span={18} offset={3}>
              <h3>15-ta sharh</h3>
              <>
                <Comment
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
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
                {comments.length > 0 && <CommentList comments={comments} />}
              </>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Lesson;
